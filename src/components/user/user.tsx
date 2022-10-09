import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { pusherService } from '../../services/pusher.service'
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
    const channel = pusherService.getChannel()
    channel.bind(
      'client-options',
      function (data: { index: number; text: string }[]) {
        debugger
        setAnswers(data)
        setAnswerSent(false)
      }
    )
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
      return;
    }

    setAnswerSent(true)
    pusherService.publishAnswer(answer, userName || 'None')
  }

  const setOptions = () => {
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
          <Button type='submit' onClick={saveUserName}>
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
