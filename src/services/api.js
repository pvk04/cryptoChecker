const API_KEY =
  "10b9a5f7e292759dd154058bb3f4f6ae549dce9af0e7bf9e09af74eb565ce3dd";

export async function loadTickers(tickers) {
  const data = await fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(
      ","
    )}&tsyms=USD&api_key=${API_KEY}`
  );
  return await data.json();
}

export async function loadAvalibeCoinList() {
  const data = await fetch(
    `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${API_KEY}`
  );
  const coinList = await data.json();
  return Object.keys(coinList.Data);
}
