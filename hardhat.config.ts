
require("@nomiclabs/hardhat-waffle");

import * as dotenv from "dotenv";

import { HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "solidity-coverage";
import "./tasks/checkDonations";
import "./tasks/donateEther";
import "./tasks/viewDonators";
import "./tasks/transferDonatesToAddress";

dotenv.config();

require('dotenv').config();


const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  }
};

export default config;
