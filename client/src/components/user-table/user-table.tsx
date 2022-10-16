import _ from "lodash";
import './user-table.scss'

export interface UserTableProps {
  data: { user: string; score: number }[]
}

export const UserTable = (props: UserTableProps) => {
    const getTableBody = () => {
        return _.map(props.data, it => {
            return (
              <tr>
                <td>{it.user}</td>
                <td>{it.score}</td>
              </tr>
            )
        })
    }

  return (
    <div className="users-table">
      <table>
        <tr>
          <th>Player Name</th>
          <th>Score</th>
        </tr>
        <tbody>{getTableBody()}</tbody>
      </table>
    </div>
  )
}
