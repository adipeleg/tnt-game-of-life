import _ from "lodash";

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
    <div>
      <table>
        <tr>
          <th>user</th>
          <th>score</th>
        </tr>
        <tbody>{getTableBody()}</tbody>
      </table>
    </div>
  )
}
