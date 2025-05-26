import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">🧮 Simple Calculator</h1>
        
        <div className="bg-gray-900 text-white text-right p-4 rounded mb-4 text-2xl font-mono min-h-[60px] flex items-center justify-end">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clearAll} className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded font-semibold">
            🗑️ Clear
          </button>
          <button onClick={() => inputOperation('÷')} className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold">
            ÷
          </button>
          <button onClick={() => inputOperation('×')} className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold">
            ×
          </button>
          
          {['7', '8', '9'].map(num => (
            <button key={num} onClick={() => inputNumber(num)} className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded font-semibold">
              {num}
            </button>
          ))}
          <button onClick={() => inputOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold">
            -
          </button>
          
          {['4', '5', '6'].map(num => (
            <button key={num} onClick={() => inputNumber(num)} className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded font-semibold">
              {num}
            </button>
          ))}
          <button onClick={() => inputOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold">
            +
          </button>
          
          {['1', '2', '3'].map(num => (
            <button key={num} onClick={() => inputNumber(num)} className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded font-semibold">
              {num}
            </button>
          ))}
          <button onClick={performCalculation} className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded font-semibold">
            ✨ =
          </button>
          
          <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-700 hover:bg-gray-800 text-white p-4 rounded font-semibold">
            0
          </button>
          <button onClick={() => inputNumber('.')} className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded font-semibold">
            .
          </button>
        </div>
      </div>
    </div>
  )
}
