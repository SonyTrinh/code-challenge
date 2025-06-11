// import { FC, useMemo } from 'react';
// import { BoxProps } from '@mui/material';

// Define types
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | string;

interface Prices {
  [currency: string]: number;
}

interface WalletBalancesHook {
  (): WalletBalance[];
}
interface PricesHook {
  (): Prices;
}

declare const useWalletBalances: WalletBalancesHook;
declare const usePrices: PricesHook;
declare const classes: { row: string };

interface Props extends BoxProps {}

const WalletPage: FC<Props> = ({ ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0; // include positive balances
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // simplified comparison
      });
  }, [balances]); // removed prices

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formatted = balance.amount.toFixed(2); // specify precision
    return (
      <WalletRow
        key={`${balance.currency}-${index}`} // use unique identifier
        className={classes.row}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;