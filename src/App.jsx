import './App.css';
import Home from "./pages/Home"
import SearchCountry from "./pages/SearchCountry"
import { Route, Link } from "wouter"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <h1 className='headerTitle'>Countries Searcher</h1>
        </Link>
      </header>
      <Route
        component={Home}
        path='/'
      />
      <Route
        component={SearchCountry}
        path="/country/:keyword"
      />
    </div>
  )
}

export default App
