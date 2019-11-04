import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // prev
  //["EMPTY", "CREATE", "EMPTY", "EMPTY"]

  // after transition
  //["EMPTY", "CREATE", "EMPTY", "EMPTY", "CREATE"]

  // after transition with replace
  //["EMPTY", "CREATE", "EMPTY", "CREATE"]
  function transition(mode, replace = false) {
    setMode(mode);
    setHistory(prev => [...prev, mode])
    if (replace === true) {
      setHistory(history.splice((history.length - 2), 1, mode))
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop()
    }
    setMode(history[history.length - 1])
  }
  return { mode, transition, back }
}