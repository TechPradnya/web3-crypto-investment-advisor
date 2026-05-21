import { ethers } from "ethers";

const contractAddress = "YOUR_CONTRACT_ADDRESS";

const abi = [
  "function saveRecommendation(uint _budget, string memory _risk, string memory _suggestion) public"
];

export const saveRecommendationToBlockchain = async (
  budget,
  risk,
  suggestion
) => {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const tx = await contract.saveRecommendation(
      budget,
      risk,
      suggestion
    );

    await tx.wait();

    alert("Recommendation saved on blockchain!");
  } catch (error) {
    console.error("Blockchain save failed:", error);
  }
};