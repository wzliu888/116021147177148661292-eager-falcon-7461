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
      const result = calculate(currentValue, inputValue, operation)

      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display)
      const result = calculate(previousValue, inputValue, operation)
      setDisplay(String(result))
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

  const clearEntry = () => {
    setDisplay('0')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Calculator</h1>
        
        <div className="mb-4">
          <div className="bg-gray-50 border rounded p-4 text-right">
            <div className="text-2xl font-mono text-gray-800 break-all">{display}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={clearAll}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            Clear
          </button>
          <button
            onClick={clearEntry}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            CE
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            ÷
          </button>

          {['7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(num)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('×')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            ×
          </button>

          {['4', '5', '6'].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(num)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            -
          </button>

          {['1', '2', '3'].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(num)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('+')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            +
          </button>

          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded transition-colors"
          >
            0
          </button>
          <button
            onClick={() => inputNumber('.')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded transition-colors"
          >
            .
          </button>
          <button
            onClick={performCalculation}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}
