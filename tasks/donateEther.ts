import { task } from "hardhat/config";
require("dotenv").config();
import "@nomiclabs/hardhat-waffle";
import { ethers } from "ethers";


task("donate", "User can donate some ether on contract").addParam("amount", "Amount of ether").setAction(async function (_args, hre) {
    let contract = await hre.ethers.getContractAt("FundRaise", "0xD82ef1Bc7daf0Ae4DBf14914c67E3014fC5A2EC4");
    await contract.donateEther({value: ethers.utils.parseEther(_args.amount)});
    console.log("Ether sended on contract");
});