import { useState } from "react"
import "./App.scss"
import ItemComparer from "./components/ItemComparer/ItemComparer"
import Toolbar from "./components/Toolbar/Toolbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>What do you prefer?</h1>
      <ItemComparer />
      <Toolbar />
    </div>
  )
}

export default App
