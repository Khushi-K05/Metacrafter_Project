import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './WalletCard.css';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [contractBalance, setContractBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
  const contractABI = [
    "function deposit() payable",
    "function withdraw(uint256 _amount)",
    "function getBalance() view returns (uint256)"
  ];

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
          fetchContractBalance();
        })
        .catch(error => {
          setErrorMessage(error.message);
        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const fetchContractBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const balance = await contract.getBalance();
      setContractBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const depositHandler = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.deposit({ value: ethers.utils.parseEther(depositAmount) });
      await tx.wait();
      fetchContractBalance();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const withdrawHandler = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.withdraw(ethers.utils.parseEther(withdrawAmount));
      await tx.wait();
      fetchContractBalance();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountChangedHandler);
      window.ethereum.on('chainChanged', chainChangedHandler);

      return () => {
        window.ethereum.removeListener('accountsChanged', accountChangedHandler);
        window.ethereum.removeListener('chainChanged', chainChangedHandler);
      };
    }
  }, []);

  return (
    <div className='walletCard'>
      <h4>{"Connect Metamask"}</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Wallet Balance: {userBalance}</h3>
      </div>
      <div className='contractBalanceDisplay'>
        <h3>Contract Balance: {contractBalance}</h3>
      </div>
      <div className='deposit'>
        <input
          type='text'
          placeholder='Amount to deposit'
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={depositHandler}>Deposit</button>
      </div>
      <div className='withdraw'>
        <input
          type='text'
          placeholder='Amount to withdraw'
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={withdrawHandler}>Withdraw</button>
      </div>
      {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
    </div>
  );
}

export default WalletCard;
