import { useState, useEffect } from 'react'

interface UseExchangeCalculationProps {
  fromToken: string
  toToken: string
  fromAmount: string
  calculateExchangeAmount: (fromSymbol: string, toSymbol: string, amount: number) => number
}

interface UseExchangeCalculationReturn {
  toAmount: string
  isCalculating: boolean
  calculationError: string
}

export const useExchangeCalculation = ({
  fromToken,
  toToken,
  fromAmount,
  calculateExchangeAmount
}: UseExchangeCalculationProps): UseExchangeCalculationReturn => {
  const [toAmount, setToAmount] = useState<string>('')
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const [calculationError, setCalculationError] = useState<string>('')

  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      setIsCalculating(true)
      const parsedFromAmount = parseFloat(fromAmount)
      
      if (!isNaN(parsedFromAmount) && parsedFromAmount > 0) {
        const calculatedToAmount = calculateExchangeAmount(fromToken, toToken, parsedFromAmount)
        setToAmount(calculatedToAmount.toFixed(6))
        setCalculationError('')
      } else {
        setToAmount('')
        if (fromAmount && (isNaN(parsedFromAmount) || parsedFromAmount <= 0)) {
          setCalculationError('Please enter a valid amount greater than 0')
        } else {
          setCalculationError('')
        }
      }
      setIsCalculating(false)
    } else {
      setToAmount('')
      setCalculationError('')
    }
  }, [fromToken, toToken, fromAmount, calculateExchangeAmount])

  return {
    toAmount,
    isCalculating,
    calculationError
  }
} 