import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

function getEthereum() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // console.log(contractAbi);
  const TransactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  // console.log(provider, signer, TransactionContract);
  return TransactionContract;
}

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [Loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getAllTransactions= async () => { 
    try{
    if(ethereum){
      const transactionContract = getEthereum();
      const allTransactions = await transactionContract.getAllTransactions();
      const structuredTransactions = allTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));
      setTransaction(structuredTransactions);
      console.log(allTransactions);
    }
    }
    catch(e){ 
      alert("Connect to wallet");
      throw new Error(e);}
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        getAllTransactions();
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
      window.location.reload();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  const checkTransactionExists = async () => {
    try {
      const transactionContract = getEthereum();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (err) {
      throw new Error(err);
    }
  };
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereum();
      const parsedAmount = ethers.utils.parseEther(amount);
 console.log(connectedAccount, addressTo);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message
      );
      setLoading(true);
      console.log("loading", transactionHash.hash);
      await transactionHash.wait();
      setLoading(false);
      console.log("success", transactionHash.hash);

     window.location.reload();
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkTransactionExists();
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
        transaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
