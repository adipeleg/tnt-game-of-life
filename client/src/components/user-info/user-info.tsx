import { FunctionComponent } from 'react'
import './user-info.scss'

type UserInfoProps = {
  germs: number
  bombs: number
  food: number
  germsOnBoard: number
  name: string
}

export const UserInfo: FunctionComponent<UserInfoProps> = ({
  germs,
  bombs,
  food,
  germsOnBoard,
  name,
}) => {
  return (
    <div className='user-info-wrapper'>
      <div>
        <div>{name}</div>
      </div>
      <div className='section'>
        <div>germs:</div>
        <div className='val'>{germs}</div>
      </div>
      <div className='section'>
        <div>bombs:</div>
        <div className='val'>{bombs}</div>
      </div>
      <div className='section'>
        <div>Super food:</div>
        <div className='val'>{food}</div>
      </div>
      <div className='section'>
        <div>germs on board:</div>
        <div className='val'>{germsOnBoard}</div>
      </div>
    </div>
  )
}
