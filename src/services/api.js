const API_KEY =
  "eddce2f712fb0211cec459ed54471b812a4aacc367dd4c5bd86e0b1de9b039d7";

const tickersHandlers = new Map();
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

const AGREGATE_INDEX = "5";

socket.addEventListener("message", (e) => {
  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: newPrice,
  } = JSON.parse(e.data);

  if (type !== AGREGATE_INDEX || newPrice === undefined) {
    return;
  }

  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => {
    fn(newPrice);
  });
});

export async function loadAvalibeCoinList() {
  const data = await fetch(
    `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${API_KEY}`
  );
  const coinList = await data.json();
  return Object.keys(coinList.Data);
}

function sendToWebsocket(message) {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}

function subscribersToTickerOnWS(ticker) {
  sendToWebsocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

function unsubscribersFromTickerOnWS(ticker) {
  sendToWebsocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

export function subscribeToTicker(ticker, callback) {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, callback]);
  subscribersToTickerOnWS(ticker);
}

export function unsubscribeToTicker(ticker) {
  tickersHandlers.delete(ticker);
  unsubscribersFromTickerOnWS(ticker);
}
