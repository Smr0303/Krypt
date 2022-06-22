// https://eth-goerli.alchemyapi.io/v2/rTLp-NkAw2u7sXFlsMjq_lPSWmkQtT3V

require("@nomiclabs/hardhat-waffle");

module.exports= {
  solidity: "0.8.0",
  networks: {
    Goerli:{
      url:"https://eth-goerli.alchemyapi.io/v2/rTLp-NkAw2u7sXFlsMjq_lPSWmkQtT3V",
      accounts:['da059b0dd0ca6f0e2c7c012949c0187603f9c9f3bc7c73520c80035bb648bedb']
    }
  }
}


