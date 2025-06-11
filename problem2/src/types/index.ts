export interface Token {
  currency: string
  price?: number
  date?: string
}

export interface TokenInfo {
  symbol: string
  name: string
  price: number
  logoURI?: string
  date?: string
}

export interface SwapFormData {
  fromToken: string
  toToken: string
  fromAmount: string
  toAmount: string
} 