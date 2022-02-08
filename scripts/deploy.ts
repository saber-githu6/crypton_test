import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Ether's balance", (await deployer.getBalance()).toString());

  const FundRaise = await hre.ethers.getContractFactory("FundRaise"); // указываем контракт
  const fundRaise = await FundRaise.deploy(); //деплоинг контракта

  await fundRaise.deployed(); // ждем окончания деплоя контракта

  console.log("FundRaise deployed to:", fundRaise.address); // Возвращаем адрес контракта на rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
