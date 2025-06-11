import { useState, useEffect } from 'react'
import { Token, TokenInfo } from '@/types'

const PRICES_URL = 'https://interview.switcheo.com/prices.json'
const TOKEN_ICONS_BASE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens'

// Map of token symbols to their display names
const TOKEN_NAMES: Record<string, string> = {
  BLUR: 'Blur',
  bNEO: 'Binance-Peg NEO',
  BUSD: 'Binance USD',
  USD: 'US Dollar',
  ETH: 'Ethereum',
  GMX: 'GMX',
  STEVMOS: 'Stride Evmos',
  LUNA: 'Terra Luna',
  RATOM: 'Reward Atom',
  STRD: 'Stride',
  EVMOS: 'Evmos',
  IBCX: 'IBC Index',
  IRIS: 'IRISnet',
  ampLUNA: 'Ampleforth Luna',
  KUJI: 'Kujira',
  STOSMO: 'Stride Osmosis',
  USDC: 'USD Coin',
  axlUSDC: 'Axelar USDC',
  ATOM: 'Cosmos',
  STATOM: 'Stride Atom',
  OSMO: 'Osmosis',
  rSWTH: 'Reward Switcheo',
  STLUNA: 'Stride Luna',
  LSI: 'Liquid Staking Index',
  OKB: 'OKB',
  OKT: 'OKExChain Token',
  SWTH: 'Switcheo',
  USC: 'USC',
  WBTC: 'Wrapped Bitcoin',
  wstETH: 'Wrapped Staked Ether',
  YieldUSD: 'Yield USD',
  ZIL: 'Zilliqa'
}

export const usePrices = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      console.log("🚀 ~ fetchPrices ~ fetchPrices:")
      try {
        setLoading(true)
        const response = await fetch(PRICES_URL)
        
        if (!response.ok) {
          throw new Error('Failed to fetch prices')
        }
        
        const data: Token[] = await response.json()
        
        // Get unique tokens with their latest prices
        const tokenMap = new Map<string, TokenInfo>()
        
        data.forEach(token => {
          if (token.price !== undefined) {
            const existing = tokenMap.get(token.currency)
            if (!existing || new Date(token.date || '') > new Date(existing.date || '')) {
              tokenMap.set(token.currency, {
                symbol: token.currency,
                name: TOKEN_NAMES[token.currency] || token.currency,
                price: token.price,
                logoURI: `${TOKEN_ICONS_BASE_URL}/${token.currency}.svg`,
                date: token.date
              })
            }
          }
        })
        
        const uniqueTokens = Array.from(tokenMap.values()).sort((a, b) => 
          a.name.localeCompare(b.name)
        )
        
        setTokens(uniqueTokens)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch prices')
        console.error('Error fetching prices:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  const getTokenPrice = (symbol: string): number => {
    const token = tokens.find(t => t.symbol === symbol)
    return token?.price || 0
  }

  const calculateExchangeAmount = (
    fromSymbol: string,
    toSymbol: string,
    amount: number
  ): number => {
    const fromPrice = getTokenPrice(fromSymbol)
    const toPrice = getTokenPrice(toSymbol)
    
    if (fromPrice === 0 || toPrice === 0) return 0
    
    return (amount * fromPrice) / toPrice
  }

  return {
    tokens,
    loading,
    error,
    getTokenPrice,
    calculateExchangeAmount
  }
} 