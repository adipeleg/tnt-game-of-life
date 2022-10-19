import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { socketService } from '../../services/socket.service'
import './user.scss'

export const User = () => {
  const [userName, setUserName] = useState<string>()
  const [error, setError] = useState<boolean>()
  const [savedName, setSavedName] = useState<boolean>()
  const [answers, setAnswers] = useState<{ index: number; text: string }[]>([
    // { index: 0, text: 'ans1' },
    // { index: 1, text: 'ans2' },
    // { index: 2, text: 'ans3' },
    // { index: 3, text: 'ans4' },
  ])
  const [answerSent, setAnswerSent] = useState<boolean>()

  useEffect(() => {
    const socket = socketService.getSocket()
    socket.on('events', function (data: any) {
      if (data.type === 'options') {
        console.log('event', data)
        setAnswers(data.options)
        setAnswerSent(false)
      }
    })
    // const channel = pusherService.getChannel()
    // channel.bind(
    //   'client-options',
    //   function (data: { index: number; text: string }[]) {
    //     debugger
    //     setAnswers(data)
    //     setAnswerSent(false)
    //   }
    // )
  }, [])

  const addUserName = (data: any) => {
    setError(false)
    setUserName(data.target.value)
  }

  const saveUserName = () => {
    if (_.isEmpty(userName)) {
      setError(true)
      return
    }

    setSavedName(true)
  }

  const answerQuestion = (answer: string) => {
    if (!userName) {
      return
    }

    setAnswerSent(true)
    socketService.publishAnswer(answer, userName || 'None')
  }

  const setOptions = () => {

    console.log(answers)
    return (answers && answers.length >0 && <div className='options-container'>
    <div className='row-options-container'>
      <Button color='blue' className='option-btn' key={answers[0].index} onClick={() => answerQuestion(answers[0].text)}>
        {' '}
        {answers[0].text}{' '}
      </Button>
      <Button color='red' className='option-btn' key={answers[1].index} onClick={() => answerQuestion(answers[1].text)}>
        {' '}
        {answers[1].text}{' '}
      </Button>
    </div>
    <div className='row-options-container'>
      <Button color='yellow' className='option-btn' key={answers[2].index} onClick={() => answerQuestion(answers[2].text)}>
        {' '}
        {answers[2].text}{' '}
      </Button>
      <Button color='green' className='option-btn' key={answers[3].index} onClick={() => answerQuestion(answers[3].text)}>
        {' '}
        {answers[3].text}{' '}
      </Button>
    </div>
  </div> )




    return answers.map((val, index) => {
      return (
        <Button key={val.index} onClick={() => answerQuestion(val.text)}>
          {val.text}
        </Button>
      )
    })
  }

  return (
    <div className='wrapper'>
      {!savedName && (
        <Form className='table-filter-input' onSubmit={saveUserName}>
          <Input
            placeholder='User Name'
            onChange={addUserName}
            //   disabled={true}
          />
          <Button color='blue' type='submit' onClick={saveUserName}>
            Enter
          </Button>
          {error && <div className='error'>user name is required</div>}
        </Form>
      )}
      {savedName && (
        <div>
          <div className='hello'>Hello {userName || ''}</div>
          {!answerSent && <div>{setOptions()}</div>}
          {answerSent && <div className='message'>Sending your answer...</div>}
        </div>
      )}
    </div>
  )
}
