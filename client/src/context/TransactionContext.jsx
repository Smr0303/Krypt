import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

function getEthereum() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(
    contractAbi,
    contractAddress,
    signer
  );
  console.log(provider, signer, TransactionContract);
  return TransactionContract;
}

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    e.preventDefault();
    setFormData((state) => ({ ...state, [name]: e.target.value }));
    console.log(name, e.target.value);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
      console.log(accounts);
    } catch (err) {
      throw new Error(err);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereum();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: 0x5208,
            value: parsedAmount._hex,
          },
        ],
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
