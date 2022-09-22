import _ from 'lodash'
import { FunctionComponent, useEffect, useState } from 'react'
import { render } from 'react-dom'
import './board.scss'

type BoardProps = {
  title: string
}

export const Board: FunctionComponent<BoardProps> = ({ title }) => {
  const numOfRows = 30
  const numOfColumns = 30
  const [pos, setPos] = useState([] as number[])
  const [re, setRe] = useState(false)

  useEffect(() => {
    setPos(_.times(numOfColumns * numOfRows, _.constant(0)))
  }, [setPos])

  const setLife = (row: number, col: number) => {
    pos[col + row * numOfColumns] = 1
    setPos(pos);
    setRe(!re)
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
      <div className='board'>{getboard()}</div>
    </div>
  )
}
