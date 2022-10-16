/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { imageOptions } from '../../services/image.options';
import { socketService } from '../../services/socket.service';
import { UserInfo } from '../user-info/user-info';
import { UserTable } from '../user-table/user-table';
import './board.scss';

type BoardProps = {
  title: string;
};

export const Board: FunctionComponent<BoardProps> = ({ title }) => {
  const INTERVAL_IN_MS = 100;
  const numOfRows = 30;
  const numOfColumns = 50;
  const numOfFirstGerms = 100;
  const [pos, setPos] = useState([] as number[]);
  const [re, setRe] = useState(false);
  const [getGermsOnBoard, setGermsOnBoard] = useState(0);
  const [currentTime, setCurrentTime] = useState(30000);
  const [currentIdx, setIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ user: string; score: number }[]>([]);
  const [options, setOptions] = useState<{ index: number; text: string }[]>([
    { index: 0, text: 'Option A' },
    { index: 1, text: 'Option B' },
    { index: 2, text: 'Option C' },
    { index: 3, text: 'Option D' }
  ]);
  const [update, setUpdate] = useState<boolean>(false);
  const [gameInterval, setGameInterval] = useState<NodeJS.Timeout | null>(null);
  const [gameStatus, setGameStatus] = useState<number>(-1);
  const [userAnswerData, setUserAnswerData] = useState<{ userName: string; answer: string }>();

  useEffect(() => {
    if (gameStatus === 1) {
      setIndex(currentIdx + 1);
      startTheTimer();
    }
  }, [gameStatus]);

  useEffect(() => {
    const socket = socketService.getSocket();
    socket.on('events', (data: { userName: string; answer: string; type: string }) => {
      if (data.type === 'answer') {
        setUserAnswerData({ userName: data.userName, answer: data.answer });
      }
    });
  }, []);

  useEffect(() => {
    if (userAnswerData) {
      let newAnswers;
      if (answers.filter((a) => a.user === userAnswerData.userName).length > 0) {
        answers.filter((a) => a.user === userAnswerData.userName)[0].score = calcScore(userAnswerData);
      } else {
        answers.push({ user: userAnswerData.userName, score: calcScore(userAnswerData) });
        newAnswers = [...answers];
      }
      if (newAnswers) {
        setAnswers(newAnswers.sort((a, b) => a.score > b.score ? -1 : 1));
      }
    }
  }, [userAnswerData]);

  const calcScore = (data: { userName: string; answer: string }): number => {
    const ans = imageOptions[currentIdx - 1].answer;
    console.log(answers);
    const userData = _.find(answers, (it) => it.user === data.userName)?.score || 0;
    // console.log(answers, answers)
    return ans === data.answer ? userData + parseFloat((currentTime / 1000).toFixed(2)) : userData;
  };

  const publishOptions = (index?: number) => {
    const data = imageOptions[currentIdx];
    const options: { index: number; text: string }[] = _.map(data.options, (it, index) => {
      return { index, text: it };
    });
    setOptions(options);
    socketService.publishOptions(options);
    // setIndex(currentIdx + 1);
  };

  const setLife = (row: number, col: number) => {
    if (pos[col + row * numOfColumns] === 1) {
      setGermsOnBoard(getGermsOnBoard - 1);
      pos[col + row * numOfColumns] = 0;
    } else {
      if (getGermsOnBoard < numOfFirstGerms) {
        pos[col + row * numOfColumns] = 1;
        setGermsOnBoard(getGermsOnBoard + 1);
        setPos(pos);
        setRe(!re);
      }
    }
  };

  const getGermsCount = () => {
    const c = _.countBy(pos, (it) => it === 1);
    return numOfFirstGerms - (c['true'] || 0) >= 0 ? numOfFirstGerms - (c['true'] || 0) : 0;
  };
  const getGermsOnBoardCount = () => {
    const c = _.countBy(pos, (it) => it === 1);
    return c['true'] || 0;
  };

  const getColumns = (row: number) => {
    const columns = _.range(0, numOfColumns);
    return columns.map((val, index) => {
      return <div className={`column ${pos[index + row * numOfColumns] === 1 ? 'full' : 'empty'}`} key={index} onClick={() => setLife(row, index)}></div>;
    });
  };

  const getboard = () => {
    const rows = _.range(0, numOfRows);
    return rows.map((val, index) => {
      return (
        <div className='row' key={index}>
          {getColumns(val)}
        </div>
      );
    });
  };

  const startGame = () => {
    setGameStatus(1);
    prepareBoardToNextStep();
    publishOptions(0);
  };

  const prepareBoardToNextStep = () => {
    setCurrentTime(30000);
    let ps = _.times(numOfColumns * numOfRows, _.constant(0));
    ps = setRandom(ps);
    setPos(ps);
  };

  const showTheImage = () => {
    let ps = _.times(numOfColumns * numOfRows, _.constant(1));
    setPos(ps);
  };

  const abortStep = () => {
    if (gameInterval !== null) {
      setGameStatus(0);
      clearInterval(gameInterval);
      setGameInterval(null);
      showTheImage();
    }
  };

  const startNextStep = () => {
    setGameStatus(1);
    prepareBoardToNextStep();
    publishOptions();
  };

  const startTheTimer = () => {
    const tmpInterval = setInterval(() => updateStepByMs(pos), INTERVAL_IN_MS);
    setGameInterval(tmpInterval);
  };

  const updateStepByMs = (currentPos: number[]) => {
    setCurrentTime((currentTime) => currentTime - INTERVAL_IN_MS);
    let oldPos = [...currentPos];
    for (let i = 0; i < currentPos.length; i++) {
      currentPos[i] = getGremScope(i, oldPos);
    }

    setPos(currentPos);
  };

  const setRandom = (ps: number[]) => {
    _.forEach(_.range(0, 1), (it) => {
      _.forEach(_.range(0, 3), (idx) => {
        const place = _.random(numOfColumns * numOfRows);
        ps[place] = 1;
        ps[place + 1] = 1;
        ps[place + 2] = 1;
        ps[place + 3] = 1;
        ps[place + numOfColumns + 3] = 1;
      });
    });

    return ps;
  };

  const getGremScope = (gremPos: number, oldPos: number[]) => {
    /*
      p1   p2  p3
      p4   X   p5
      p6   p7  p8
    */

    const p1 = oldPos[gremPos - numOfColumns - 1] || 0;
    const p2 = oldPos[gremPos - numOfColumns] || 0;
    const p3 = oldPos[gremPos - numOfColumns + 1] || 0;
    const p4 = oldPos[gremPos - 1] || 0;
    const p5 = oldPos[gremPos + 1] || 0;
    const p6 = oldPos[gremPos + numOfColumns - 1] || 0;
    const p7 = oldPos[gremPos + numOfColumns] || 0;
    const p8 = oldPos[gremPos + numOfColumns + 1] || 0;

    const totalGremsInScope = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
    return calculatePixelByRules(oldPos[gremPos], totalGremsInScope);
  };

  const calculatePixelByRules = (currentPixel: number, totalScope: number) => {
    if (currentPixel === 1) {
      if (totalScope === 0 || totalScope === 1 || totalScope >= 4) {
        return 0;
      } else {
        // 2 or 3 neighbors -> survive
        return 1;
      }
    } else {
      if (totalScope === 3 || totalScope === 4) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const setOptionsOnBoard = () => {
    return (
      <div className='options-container'>
        <div className='row-options-container'>
          <Button color='blue' className='option-btn' key={options[0].index}>
            {' '}
            {options[0].text}{' '}
          </Button>
          <Button color='red' className='option-btn' key={options[1].index}>
            {' '}
            {options[1].text}{' '}
          </Button>
        </div>
        <div className='row-options-container'>
          <Button color='yellow' className='option-btn' key={options[2].index}>
            {' '}
            {options[2].text}{' '}
          </Button>
          <Button color='green' className='option-btn' key={options[3].index}>
            {' '}
            {options[3].text}{' '}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='board-wrapper'>
        <div className='time-container'>
          <div className='clock'></div>
          <h1>Available Points: {(currentTime / 1000).toFixed(1)}</h1>
          <h1 style={{marginLeft: '470px', marginBottom: '10px'}}>Questions : {currentIdx} / {imageOptions.length}</h1>
        </div>
        <div className='board' style={{ backgroundImage: `url(${imageOptions[currentIdx - 1]?.name || 'paris.jpeg'})` }}>
          {getboard()}
        </div>

        <div className='options'>{setOptionsOnBoard()}</div>

        {currentIdx === 0 && gameStatus !== 1 && (
          <div className='start-game' onClick={() => startGame()}>
            Start Game
          </div>
        )}
        {currentIdx > 0 && gameStatus !== 1 && (
          <div className='start-game' onClick={() => startNextStep()}>
            Next Question
          </div>
        )}

        {gameStatus === 1 && (
          <div className='start-game' onClick={() => abortStep()}>
            Stop Game
          </div>
        )}
      </div>
      {currentTime > 0 && <UserTable data={answers}></UserTable>}
    </>
  );
};
