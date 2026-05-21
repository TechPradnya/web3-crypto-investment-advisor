export async function getLivePrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=inr&include_24hr_change=true"
    );

    const data = await response.json();

    return [
      {
        name: "Bitcoin",
        symbol: "BTC",
        price: data.bitcoin.inr,
        change: data.bitcoin.inr_24h_change.toFixed(2)
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        price: data.ethereum.inr,
        change: data.ethereum.inr_24h_change.toFixed(2)
      },
      {
        name: "Solana",
        symbol: "SOL",
        price: data.solana.inr,
        change: data.solana.inr_24h_change.toFixed(2)
      }
    ];
  } catch (error) {
    console.error(error);
    return [];
  }
}