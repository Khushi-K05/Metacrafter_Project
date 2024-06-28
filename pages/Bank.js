import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletCard from './WalletCard';
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // Replace with your deployed contract address
const abi = [{"type":"event","anonymous":false,"name":"Deposited","inputs":[{"type":"address","name":"account","indexed":true},{"type":"uint256","name":"amount","indexed":false}]},{"type":"event","anonymous":false,"name":"Withdrawn","inputs":[{"type":"address","name":"account","indexed":true},{"type":"uint256","name":"amount","indexed":false}]},{"type":"function","name":"deposit","constant":false,"stateMutability":"payable","payable":true,"inputs":[],"outputs":[]},{"type":"function","name":"getBalance","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"withdraw","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"_amount"}],"outputs":[]}];

function Bank() {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    async function fetchBalance() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
          const balance = await contract.getBalance();
          setBalance(balance.toString());
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }

    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    if (window.ethereum && parseFloat(depositAmount) > 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        await contract.deposit({
          value: ethers.utils.parseEther(depositAmount)
        });
        setDepositAmount('');
        fetchBalance();
      } catch (error) {
        console.error('Error depositing:', error);
      }
    }
  };

  const handleWithdraw = async () => {
    if (window.ethereum && parseFloat(withdrawAmount) > 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        await contract.withdraw(ethers.utils.parseEther(withdrawAmount));
        setWithdrawAmount('');
        fetchBalance();
      } catch (error) {
        console.error('Error withdrawing:', error);
      }
    }
  };

  return (
    <div>
      <WalletCard /> {/* Include your MetaMask integration component here */}

      <h2>Your Balance: {balance} ETH</h2>
      <label>Deposit Amount (ETH): </label>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <br />
      <label>Withdraw Amount (ETH): </label>
      <input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default Bank;
