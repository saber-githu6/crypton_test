import { task } from "hardhat/config";
require("dotenv").config();
import "@nomiclabs/hardhat-waffle";

task("viewdonations", "View donations of user").addParam("address", "Address of user").setAction(async function (_args, hre) {
    let contract = await hre.ethers.getContractAt("FundRaise", "0xD82ef1Bc7daf0Ae4DBf14914c67E3014fC5A2EC4");
    console.log("Donations of user: " + await contract.checkDonations(_args.address));
});