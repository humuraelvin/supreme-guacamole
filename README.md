# Decentralized Voting System

A secure and transparent voting platform built with Next.js, Solidity, and Ethereum. This DApp allows for time-bound voting with real-time updates and a beautiful user interface.

## Features

- ⚡ Time-bound voting system
- 🔒 Secure voting mechanism
- 👥 Candidate management
- 📊 Real-time vote tracking
- 🎨 Beautiful, responsive UI
- 🦊 MetaMask integration
- 👑 Admin controls
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, TypeScript
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **Wallet Integration**: WalletConnect, ConnectKit
- **UI Components**: Headless UI, Hero Icons
- **Form Handling**: React Hook Form
- **Date Handling**: Moment.js

## Prerequisites

- Node.js 16+ and npm
- MetaMask or any Web3 wallet
- Ganache (for local development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd voting-dapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"
   SEPOLIA_URL="your_sepolia_url"
   PRIVATE_KEY="your_private_key"
   ETHERSCAN_API_KEY="your_etherscan_api_key"
   ```

4. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

5. Deploy the contract:
   ```bash
   # For local deployment
   npx hardhat run scripts/deploy.ts --network localhost
   
   # For Sepolia deployment
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Smart Contract

The voting system smart contract includes the following features:

- Time-bound voting period
- Secure vote casting
- Candidate management
- Vote tracking
- Admin controls

## Development

### Directory Structure

```
voting-dapp/
├── contracts/           # Smart contracts
├── scripts/            # Deployment scripts
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   └── styles/        # CSS styles
├── test/              # Contract tests
└── hardhat.config.ts  # Hardhat configuration
```

### Testing

Run the test suite:

```bash
npx hardhat test
```

### Deployment

1. Update the contract address in your frontend after deployment
2. Verify the contract on Etherscan (if deployed to testnet/mainnet):
   ```bash
   npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
