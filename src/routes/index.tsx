import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
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
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const Button = ({ onClick, className = '', children }: { 
    onClick: () => void
    className?: string
    children: React.ReactNode 
  }) => (
    <button
      className={`h-16 rounded-lg font-semibold text-lg transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Calculator</h1>
        
        {/* Display */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="text-right text-white text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          <Button 
            onClick={handleClear} 
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
          >
            Clear
          </Button>
          <Button 
            onClick={() => handleOperation('÷')} 
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            ÷
          </Button>
          <Button 
            onClick={() => handleOperation('×')} 
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            ×
          </Button>

          <Button onClick={() => handleNumber('7')} className="bg-gray-200 hover:bg-gray-300">7</Button>
          <Button onClick={() => handleNumber('8')} className="bg-gray-200 hover:bg-gray-300">8</Button>
          <Button onClick={() => handleNumber('9')} className="bg-gray-200 hover:bg-gray-300">9</Button>
          <Button onClick={() => handleOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white">-</Button>

          <Button onClick={() => handleNumber('4')} className="bg-gray-200 hover:bg-gray-300">4</Button>
          <Button onClick={() => handleNumber('5')} className="bg-gray-200 hover:bg-gray-300">5</Button>
          <Button onClick={() => handleNumber('6')} className="bg-gray-200 hover:bg-gray-300">6</Button>
          <Button onClick={() => handleOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white">+</Button>

          <Button onClick={() => handleNumber('1')} className="bg-gray-200 hover:bg-gray-300">1</Button>
          <Button onClick={() => handleNumber('2')} className="bg-gray-200 hover:bg-gray-300">2</Button>
          <Button onClick={() => handleNumber('3')} className="bg-gray-200 hover:bg-gray-300">3</Button>
          <Button onClick={handleEquals} className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white">=</Button>

          <Button onClick={() => handleNumber('0')} className="col-span-2 bg-gray-200 hover:bg-gray-300">0</Button>
          <Button onClick={() => handleNumber('.')} className="bg-gray-200 hover:bg-gray-300">.</Button>
        </div>
      </div>
    </div>
  )
}
