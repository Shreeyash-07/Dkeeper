# Dkeeper 
(Decentralized Keeper App using Solidity)

##Steps to recreate app
1. Open the terminal and go to cd smart_contracts
2. Create your own rinkeby test network (on eg. Alchemy or Infura)
3. Create .env file in smart_contracts folder
4. Add rinkeby url ,private key and API key in .env file (for private key -> Open Metamask extension -> Go to Account Details -> Export Private Key)
5. Now Deploy the smart contract on rinkeby network using command -> npx hardhat run ./scripts/deploy.js --network rinkeby 
6. Copy the deployed contract address for later

7. Now Open the another terminal and go to cd client
8. Open ethereum.js and enter copied smart contract address on line no. 14
9. Then finally start the react app using npm start....!

