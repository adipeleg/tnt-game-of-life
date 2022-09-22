import _ from 'lodash'
import { FunctionComponent, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { UserInfo } from '../user-info/user-info'
import './board.scss'

type BoardProps = {
  title: string
}

export const Board: FunctionComponent<BoardProps> = ({ title }) => {
  const numOfRows = 30
  const numOfColumns = 30
  const numOfFirstGerms = 10
  const [pos, setPos] = useState([] as number[])
  const [re, setRe] = useState(false)
  const [getGermsOnBoard, setGermsOnBoard] = useState(0)

  useEffect(() => {
    setPos(_.times(numOfColumns * numOfRows, _.constant(0)))
  }, [setPos])

  const setLife = (row: number, col: number) => {
    if (pos[col + row * numOfColumns] === 1) {
      setGermsOnBoard(getGermsOnBoard - 1)
      pos[col + row * numOfColumns] = 0
    } else {
      if (getGermsOnBoard < 10) {
        pos[col + row * numOfColumns] = 1
        setGermsOnBoard(getGermsOnBoard + 1)
        setPos(pos)
        setRe(!re)
      }
    }
  }

  const getGermsCount = () => {
    const c = _.countBy(pos, (it) => it === 1)
    return numOfFirstGerms - c['true'] >= 0 ? numOfFirstGerms - c['true'] : 0
  }
  const getGermsOnBoardCount = () => {
    const c = _.countBy(pos, (it) => it === 1)
    return c['true'] || 0
  }

  const getColumns = (row: number) => {
    const columns = _.range(0, numOfColumns)
    return columns.map((val, index) => {
      return (
        <div
          className={`column ${
            pos[index + row * numOfColumns] === 1 ? 'full' : 'empty'
          }`}
          key={index}
          onClick={() => setLife(row, index)}
        >
          {pos[index + row * numOfColumns]}
        </div>
      )
    })
  }

  const getboard = () => {
    const rows = _.range(0, numOfRows)
    return rows.map((val, index) => {
      return (
        <div className='row' key={index}>
          {getColumns(val)}
        </div>
      )
    })
  }

  return (
    <div className='board-wrapper'>
      <h2>{title}</h2>
      <div className='user-info-container'>
        <UserInfo
          germs={getGermsCount()}
          food={20}
          bombs={10}
          germsOnBoard={getGermsOnBoardCount()}
          name={'user1'}
        ></UserInfo>
        <UserInfo
          germs={10}
          food={20}
          bombs={10}
          germsOnBoard={0}
          name={'user2'}
        ></UserInfo>
      </div>
      <div className='board'>{getboard()}</div>
      {getGermsOnBoard === numOfFirstGerms && <div className='start-game'>start game</div>}
    </div>
  )
}
