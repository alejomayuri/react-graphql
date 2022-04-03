import Home from "./pages/Home"
import SearchCountry from "./pages/SearchCountry"
import { Route, Link } from "wouter"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Home</Link>
        <Route
          component={Home}
          path='/'
        />
        <Route
          component={SearchCountry}
          path="/country/:keyword"
        />
      </header>



    </div>
  )
}

export default App
