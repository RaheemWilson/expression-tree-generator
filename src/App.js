import React, { useState, useRef, useEffect } from 'react'
import { infixToPostfix, prefixToPostfix } from './implementation/convert';
import { drawTree, setCoordinates, constructTree } from './implementation/canvas'
import './App.css';

function App() {
  const [expression, setExpression] = useState("(a - b) ^ (c + d)")
  const [convertedExpression, setConvertedExpression] = useState("")
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
    setConvertedExpression("")
    setSelect("infix")
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
        expr = expression.replace(/\s/g, '')
        break;
    }
    setConvertedExpression(expr)

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
    

    
    
  }
  return (
    <div className="App">
      <div className='header'>
        <h1>Expression Tree Generator</h1>
        <div>
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
              <button className='btn clear' onClick={handleReset}>Clear</button>
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
