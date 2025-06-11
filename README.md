# Code Challenge

This repository contains solutions to various coding challenges and technical assessments, showcasing different programming concepts and modern web development practices.

## 📁 Project Structure

```
code-challenge/
├── problem1/           # Algorithm challenge: Sum to N
│   └── problem1.js     # Multiple implementations of summation function
├── problem2/           # React/TypeScript currency swap application
│   ├── src/
│   ├── package.json
│   └── README.md
├── problem3/           # Messy React with refactored/explanation
│   ├── explanation.txt
│   ├── refactored.tsx        
├── .gitignore
└── README.md
```

## 🚀 Challenges Overview

### Problem 1: Sum to N Implementations
**Location**: `problem1/problem1.js`

**Objective**: Implement 3 unique approaches to calculate the sum of integers from 1 to n.

**Features**:
- Multiple algorithmic approaches (iterative, functional, mathematical)
- BigInt implementations for handling large numbers
- Performance considerations for different input sizes

**Implementations**:
1. **Iterative Loop**: Classic for-loop approach
2. **Functional/Array**: Using Array.from() and reduce()
3. **Mathematical Formula**: Direct calculation using n(n+1)/2

### Fancy Form: Currency Swap Application
**Location**: `fancy-form/`

**Objective**: Build a modern, responsive currency swap interface with real-time pricing.

**Key Features**:
- ✨ Modern UI built with shadcn/ui and Tailwind CSS
- 🔄 Real-time cryptocurrency exchange rates
- 💱 Interactive currency swap functionality
- 📱 Fully responsive design
- 🎨 Beautiful animations and loading states
- ✅ Comprehensive form validation

**Tech Stack**:
- React 18 + TypeScript
- Vite for fast development
- shadcn/ui components
- Tailwind CSS for styling
- Radix UI primitives

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Running Problem 1
```bash
# Navigate to problem1 directory
cd problem1

# Run with Node.js
node problem1.js
```

### Running Fancy Form Application
```bash
# Navigate to fancy-form directory
cd fancy-form

# Install dependencies
yarn install

# Start development server
yarn dev

# Open browser to http://localhost:5173
```

## 🎯 Key Learning Objectives

### Problem 1 - Algorithm Design
- Understanding different algorithmic approaches
- Time and space complexity analysis
- Handling edge cases and large numbers
- JavaScript BigInt usage

### Fancy Form - Modern Web Development
- React functional components and hooks
- TypeScript for type safety
- Component composition with shadcn/ui
- API integration and data fetching
- Responsive design principles
- Form validation and user experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).