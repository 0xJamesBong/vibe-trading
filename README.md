# Vibe Trading

An AI-powered trading strategy application that enables users to create and execute trading strategies through natural language interaction.

## Project Structure

````
vibe-trading/
├── vibe-trading-app/          # Main Next.js application
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   │   ├── layout.tsx    # Root layout
│   │   │   ├── page.tsx      # Home page
│   │   │   └── providers.tsx # Context providers
│   │   ├── components/       # React components
│   │   │   ├── chat/        # Chat interface components
│   │   │   ├── strategy/    # Strategy visualization
│   │   │   └── trading/     # Trading components
│   │   ├── lib/             # Utility functions
│   │   │   ├── ai/          # AI processing
│   │   │   ├── trading/     # Trading logic
│   │   │   └── pinescript/  # TradingView integration
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   └── tests/               # Test files
├── jupiter/                 # Jupiter protocol integration
└── kamino/                 # Kamino protocol integration

## Features

1. Natural Language Strategy Creation
2. AI-Powered Trading Logic Generation
3. TradingView Backtesting Integration
4. Jupiter & Kamino Protocol Integration
5. Real-time Trading Execution
6. Strategy Performance Analytics

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Material-UI (MUI)
- TailwindCSS
- Solana Web3.js
- Jupiter & Kamino SDKs
- OpenAI API
- TradingView Pine Script

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run the development server

## Development

```bash
npm run dev
````

## Testing

```bash
npm run test
```

## Deployment

```bash
npm run build
npm run start
```

## License

MIT
