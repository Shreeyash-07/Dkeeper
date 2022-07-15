import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, Contract } from "ethers";
import Notes from "./artifacts/contracts/Notes.sol/Notes.json";

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      const account = await provider.request({ method: "eth_requestAccounts" });
      const networkId = await provider.request({ method: "net_version" });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const note = new Contract(
        "0xE01B8076E31279777376740c6Ba16D63DEd4a5C0",
        Notes.abi,
        signer
      );
      resolve({ note, account, networkId });
      return;
    }
    reject("Install Metamask");
  });

export default getBlockchain;
