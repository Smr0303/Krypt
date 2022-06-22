const main = async () => {
  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const trsansaction = await Transaction.deploy();

  await transaction.deployed();

  console.log("Trsansaction deployed to", trsansaction.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();
