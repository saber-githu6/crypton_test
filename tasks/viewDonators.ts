import { task } from "hardhat/config";
require("dotenv").config();
import "@nomiclabs/hardhat-waffle";

task("donators", "Get list of donators").setAction(async function (_args, hre) {
    let contract = await hre.ethers.getContractAt("FundRaise", "0xD82ef1Bc7daf0Ae4DBf14914c67E3014fC5A2EC4");
    console.log("Donators: " + await contract.viewDonators());
});