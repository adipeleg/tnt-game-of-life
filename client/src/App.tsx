// import 'semantic-ui-css/semantic.min.css'
import './App.scss'
import { Board } from './components/board/board'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { User } from './components/user/user'

function App() {
  return (
    <div className='App'>
      <div className='guess-who-img'></div>

      <Router basename={process.env.REACT_APP_NAME}>
        <Switch>
          <Route exact path='/'>
            <Board title='board'></Board>
          </Route>
          <Route path='/user'>
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
