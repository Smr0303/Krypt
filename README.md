# Krypt

Krypt is a web application that allows users to make ETH transactions through a user-friendly interface. All transactions performed are securely stored on the Ethereum blockchain, ensuring transparency and security.

## Features

- **ETH Transactions**: Easily send and receive ETH using a simple interface.
- **Blockchain Security**: Transactions are securely stored on the Ethereum blockchain.
- **User-Friendly Interface**: Built with modern web technologies to provide a seamless user experience.

  ![ALT](https://github.com/Smr0303/Transaction-App/blob/3b4c4b9e244af59a05a1853474fc0c7626578ae4/32shots_so.png)

## Hosted Link
[chic-peony-f0115b.netlify.app](https://chic-peony-f0115b.netlify.app/)
  

## Tech Stack

### Frontend

- **Vite**: A fast build tool and development server for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **Ethers.js**: A library for interacting with the Ethereum blockchain and its ecosystem.

### Backend

- **Hardhat**: A development environment to compile, deploy, test, and debug Ethereum software.
- **Ethers.js**: Used on the backend as well for blockchain interactions.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask or any other web3 wallet installed

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Smr0303/Transaction-App.git
   cd Transaction-App
   
2. Installing Packages

   First get into client folder
   ```bash
     cd client
     npm install
   ```
   Now install the blockchain dependencies
   ```bash
      cd ../blockchain
      npm install
   ```
 3. Deploying the Contracts
     In new terminal do
        ```bash
          npx hardhat node
        ```
    In the previous terminal  dp 
     ```bash
      npx hardhat run scripts/deploy.js --network localhost
     ```    
 4.  Running the Application
          ```bash
               cd ../client
               npm run dev       
          ``` 
## ThankYou
