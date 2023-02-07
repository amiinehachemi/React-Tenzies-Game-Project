import './App.css';
import Die from './comps/Die';
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {

  const [dicenum,setDicenum] = React.useState(allNewDice()) 
  const [tenzies,setTenzies] = React.useState(false)


  React.useEffect( () => {
     const allheld = dicenum.every( die => die.isHeld === true)
     const refrence = dicenum[0].value
     const sameValues = dicenum.every(die => die.value ===refrence)
     if(allheld && sameValues){
      setTenzies(true)
     }
  }, [dicenum] )


  function generateDice(){
    return { 
      value : Math.ceil(Math.random() * 6 ), 
      isHeld : false,
      id:nanoid()}
  }

  function allNewDice(){
    const DiceNum = []
    for(let i = 0; i < 10; i++){
    DiceNum.push(generateDice()
      )}
    return DiceNum

  }


  const DiceElem = dicenum.map(die => 
  <Die 
  key={die.id} 
  value = {die.value} 
  isHeld={die.isHeld} 
  holdDice={() => holdDice(die.id)}
  />)


  function Roll(){  
    setDicenum( prevstate => prevstate.map ( die => {
      return die.isHeld ? 
             die : generateDice()
    }) ) 
    if(tenzies === true){
      setDicenum(allNewDice)
      setTenzies(false)
    }
}


  function holdDice(id){
    setDicenum(prevstate => prevstate.map( die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    } ) )
  }

  return (
    
  <main>
    { tenzies && <Confetti/> }
     <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
       <div className="dice-container">
       {DiceElem}
       </div>
       <button className='roll-dice' onClick = {Roll} type="button">{tenzies ? "New Game" : "Roll"} </button>

  </main>
  );
}
export default App;
