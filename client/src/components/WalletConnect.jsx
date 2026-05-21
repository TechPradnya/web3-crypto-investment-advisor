import React from "react";

function WalletConnect({ wallet, setWallet }) {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Accounts:", accounts);

      if (accounts.length > 0) {
        setWallet(accounts[0]);
        alert("Wallet connected successfully!");
      } else {
        alert("No account found");
      }

    } catch (error) {
      console.error("MetaMask Error:", error);

      alert(
        "MetaMask Error: " +
        (error.message || "Unknown error")
      );
    }
  };

  return (
    <div>
      {wallet ? (
        <button className="main-btn">
          ✅ Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}
        </button>
      ) : (
        <button className="main-btn" onClick={connectWallet}>
          🔗 Connect MetaMask
        </button>
      )}
    </div>
  );
}

export default WalletConnect;