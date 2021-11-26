const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory(
    'IndulgencePortal'
  );
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log('Contract deployed at address: ' + contract.address);
  console.log('Contract deployed by: ' + owner.address);

  let sendMessageTx = await contract.confess(
    "I've stole money from my parents"
  );
  sendMessageTx.wait();

  sendMessageTx = await contract.confess('Pushed granma');
  sendMessageTx.wait();

  sendMessageTx = await contract
    .connect(randomPerson)
    .confess('Littered');
  sendMessageTx.wait();

  sendMessageTx = await contract
    .connect(randomPerson)
    .confess('');
  sendMessageTx.wait();
  contracts = await contract.getAllSins();
  console.log(contracts);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error('Contract exited with error: ' + e.message);
    process.exit(1);
  }
};

runMain();
