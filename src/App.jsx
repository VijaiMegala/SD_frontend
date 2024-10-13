import { useState } from 'react'
import ReactFlow, { addEdge, Handle } from 'react-flow-renderer';
import './App.css'
import mainStyles from "../styles/main.module.scss"
import { Header } from '../components/Header';
import { MainContainer } from '../components/MainContainer';


function App() {
  const [count, setCount] = useState(0)

  return (
   <div className={mainStyles.mainCon}>
        <Header/>
        <MainContainer/>
   </div>
  )
}

export default App
