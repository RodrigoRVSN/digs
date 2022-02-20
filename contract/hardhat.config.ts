import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-waffle";

dotenv.config();

module.exports = {
  solidity: "0.8.2",
  networks: {
    rinkeby: {
      url: process.env.RIKENBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
