# Bank Smart Contract Application

This repository contains a simple Ethereum smart contract named `Bank` along with a frontend to interact with it.

## Introduction

The `Bank` smart contract allows users to deposit and withdraw Ether. The frontend application provides a simple interface to interact with the smart contract using MetaMask.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) extension for your browser
- [Hardhat](https://hardhat.org/)
- [Web3.js](https://github.com/ChainSafe/web3.js/)

## Installation

### Backend (Smart Contract)

1. **Clone the repository:**

    ```sh
    git clone [(https://github.com/Khushi-K05/Metacrafter_Project/tree/main)]
    cd Metacrafter_Project
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Compile the smart contract:**

    ```sh
    npx hardhat compile
    ```

4. **Deploy the smart contract:**

    Update the deployment script with your preferred network configurations and run:

    ```sh
     npx hardhat run scripts/deploy.js --network localhost
    ```

5. **Save the ABI:**

    Ensure the ABI is saved to a JSON file named `BankABI.json`.

### Frontend

1. **Update the frontend with your contract details:**

    Open the `App.js` file and replace:

    - `'YOUR_CONTRACT_ADDRESS'` with the deployed contract address.
    - `/* YOUR_ABI_JSON */` with the ABI JSON content from `BankABI.json`.

## Smart Contract

The `Bank` smart contract provides three main functions:

- `deposit()`: Allows users to deposit Ether into the contract.
- `withdraw(uint256 _amount)`: Allows users to withdraw a specified amount of Ether from the contract.
- `getBalance()`: Returns the balance of the user.
