import React from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { ethers } from 'ethers';
import Bank from './Bank';


const networkURL = 'https://mainnet.infura.io/v3/10b3691e68814327b7287d2e14eac824';

const networkConnector = new NetworkConnector({
  urls: {
    1: networkURL // Chain ID 1 corresponds to Ethereum mainnet
  }
});
// Injected connector setup (MetaMask, etc.)
const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 1337] // Ethereum Mainnet (chain ID 1) and Local Development (chain ID 1337)
  });
  
function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Wrapper />
    </Web3ReactProvider>
  );
}

function Web3Wrapper() {
  const { activate } = useWeb3React();

  const connectMetaMask = () => {
    activate(injectedConnector);
  };

  const connectLocalNode = () => {
    activate(networkConnector);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bank App</h1>
        <button onClick={connectMetaMask}>Connect with MetaMask</button>
        <button onClick={connectLocalNode}>Connect to Local Node</button>
        <Bank />
      </header>
    </div>
  );
}

export default App;
