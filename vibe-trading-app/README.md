# Vibe Trading App

An AI-powered trading strategy application that enables users to create and execute trading strategies through natural language interaction.

## Features

- Natural language strategy creation
- AI-powered trading logic generation
- TradingView backtesting integration
- Jupiter & Kamino protocol integration
- Real-time trading execution
- Strategy performance analytics

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Solana wallet (e.g., Phantom)
- OpenAI API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd vibe-trading-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your configuration:

```
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
NEXT_PUBLIC_NETWORK=devnet
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Connect your Solana wallet using the "Connect Wallet" button.
2. Enter your trading strategy in natural language in the chat interface.
3. The AI will process your input and generate a trading strategy.
4. Review and customize the generated strategy in the Strategy Panel.
5. Use the TradingView chart for technical analysis and backtesting.
6. Execute the strategy when ready.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── chat/        # Chat interface components
│   ├── strategy/    # Strategy visualization
│   └── trading/     # Trading components
├── lib/             # Utility functions
└── types/           # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
