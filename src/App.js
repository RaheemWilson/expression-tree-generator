import React, { useState, useRef, useEffect } from 'react'
import { infixToPostfix, prefixToPostfix, isValid } from './implementation/convert';
import { drawTree, setCoordinates, constructTree } from './implementation/canvas'
import errorImg from './assets/error.svg'
import './App.css';

const Modal = props => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={errorImg} alt="Error detected"/>
          <h2>The expression you have entered seems invalid.</h2>
        <div className="modal-details">
          <p>Carefully review your expression to ensure:</p>
          <ul>
            <li>Only valid operators are used - <br />['^', '*', '/', '+', '-'].</li>
            <li>Only alphanumeric characters are used as operands - only single digits should be included in the mix.</li>
            <li>The type of expression matches the option in the list provided.</li>
            <li>Only use '(' , ')' as brackets.</li>
          </ul>
        </div>
          <button onClick={props.closeModal} className='btn close'>Ok</button>
      </div>
    </div>
  )
}

function App() {
  const [expression, setExpression] = useState("(a - b) ^ (c + d)")
  const [showModal, setShowModal] = useState(false)
  const [select, setSelect] = useState("infix")
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    handleSubmit()
  }, [])

  const handleChange = (event) => {
    setExpression(event.target.value)
  }

  const handleSelect = (event) => {
    setSelect(event.target.value)
  }

  const handleReset = (event) =>{
    event.preventDefault();

    var canvas = canvasRef.current
    var c = canvasRef.current.getContext('2d')
    function clearCanvas() { c.clearRect(0, 0, canvas.width, canvas.height) }

    clearCanvas()
    setExpression("")
    setSelect("infix")
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSubmit = (event) =>{
    if(event){
      event.preventDefault();
    }
    let expr = ''
    switch (select) {
      case 'infix':
        expr = infixToPostfix(expression.replace(/\s/g, ''))
        break;
      case 'prefix':
        expr = prefixToPostfix(expression.replace(/\s/g, ''))
        break;
      default:
        expr = !isValid(expression) ? "Not Valid": expression.replace(/\s/g, '')
        break;
    }

    var canvas = canvasRef.current
    var c = canvasRef.current.getContext('2d')
    function clearCanvas() { c.clearRect(0, 0, canvas.width, canvas.height) }

    if(expr !== "Not Valid"){
      var root = constructTree(expr)
      setCoordinates(root)
      clearCanvas()
      canvas.height = '600'
      canvas.width = containerRef.current.offsetWidth
      drawTree(root, c)
    }
    else {
      setShowModal(true)
    }
    
  }
  return (
    <div className="App">
      <div className='header'>
        <h1>Expression Tree Generator</h1>
        <div>
          { showModal ? <Modal closeModal={closeModal} /> : <></> }
          <form onSubmit={handleSubmit}>
            <div className='fields'>
              <input 
                type="text"
                name='expression'
                id='expression' 
                value={expression} 
                onChange={handleChange}
                required
                autoComplete='off'
                placeholder='e.g. (a - c) ^ (c + d) / z + d'
              />
              <select name="type" id="type" value={select} onChange={handleSelect}>
                <option value="infix">Infix</option>
                <option value="prefix">Prefix</option>
                <option value="postfix">Postfix</option>
              </select>
            </div>
            <div className='buttons'>
              <button className='btn clear' onClick={handleReset} type='button'>Clear</button>
              <button className='btn' type="submit">Generate</button>
            </div>
          </form>
        </div>
      </div>
      <div className="canvas" ref={containerRef}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default App;
