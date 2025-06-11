# Currency Swap Form

A modern, responsive currency swap form built with React, TypeScript, Vite, and shadcn/ui components. This application allows users to swap between different cryptocurrencies with real-time pricing.

![Currency Swap Form](https://via.placeholder.com/400x600/6366f1/white?text=Currency+Swap+Form)

## Features

✨ **Modern UI/UX**: Built with shadcn/ui components for a sleek, professional appearance
🔄 **Real-time Exchange Rates**: Calculates exchange amounts using live price data
🔍 **Token Search**: Easy-to-use dropdown with token logos and names
💱 **Instant Conversion**: Real-time calculation of exchange amounts
🔄 **Swap Direction**: One-click button to reverse swap direction
✅ **Form Validation**: Comprehensive input validation with error messages
📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
🎨 **Beautiful Animations**: Smooth transitions and loading states
🖼️ **Token Icons**: Integration with Switcheo token icons repository

## Technologies Used

- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **shadcn/ui** - High-quality UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible, unstyled UI primitives

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fancy-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Usage

1. **Select Source Token**: Choose the cryptocurrency you want to swap from
2. **Enter Amount**: Input the amount you wish to swap
3. **Select Destination Token**: Choose the cryptocurrency you want to receive
4. **Review Exchange Rate**: The app automatically calculates and displays the exchange rate
5. **Swap Tokens**: Click the swap button to execute the transaction (currently shows a confirmation dialog)

### Features in Detail

- **Token Selection**: Dropdown menus show token icons, symbols, names, and current prices
- **Amount Input**: Numeric input with validation for positive numbers
- **Real-time Calculation**: Exchange amounts update automatically as you type
- **Swap Direction**: Click the swap icon to instantly reverse the transaction direction
- **Error Handling**: Clear error messages for invalid inputs or missing data
- **Loading States**: Beautiful loading animations while fetching data

## API Integration

The application integrates with:

- **Price Data**: `https://interview.switcheo.com/prices.json` for real-time cryptocurrency prices
- **Token Icons**: `https://github.com/Switcheo/token-icons` for cryptocurrency logos

## Project Structure

```
fancy-form/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── CurrencySwapForm.tsx
│   ├── hooks/
│   │   └── usePrices.ts     # Custom hook for price data
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Design Decisions

1. **shadcn/ui**: Chosen for its high-quality, accessible components that look professional out of the box
2. **TypeScript**: Ensures type safety and better developer experience
3. **Custom Hooks**: Separation of concerns with `usePrices` hook for data management
4. **Real-time Updates**: Exchange amounts update instantly for better UX
5. **Error Handling**: Comprehensive validation to guide users toward correct input
6. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Switcheo](https://github.com/Switcheo/token-icons) for the token icons
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework 