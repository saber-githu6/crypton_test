import { task } from "hardhat/config";
require("dotenv").config();
import "@nomiclabs/hardhat-waffle";

task("transfer", "Owner transfer ether to address").addParam("amount", "Amount of wei").addParam("address", "Address of wallet").setAction
(async function (_args, hre) {
    let contract = await hre.ethers.getContractAt("FundRaise", "0xD82ef1Bc7daf0Ae4DBf14914c67E3014fC5A2EC4");
    await contract.transferDonates(_args.amount, _args.address);
    console.log("Ether transferred on address");
});