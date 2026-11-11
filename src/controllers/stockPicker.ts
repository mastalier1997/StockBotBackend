import { Stock } from "../interfaces/stockInterface";
import fetch from "node-fetch";
import { addNativeStock } from "./stocksEndpoint";

// Financial Modeling Prep API key, read from the environment (never commit it).
const FMP_API_KEY = process.env.FMP_API_KEY;
if (!FMP_API_KEY) {
  console.warn("FMP_API_KEY is not set; NASDAQ constituent lookups will fail.");
}

const NasDaq500API = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FMP_API_KEY}`;

const StockInfoAPI = "https://query1.finance.yahoo.com/v8/finance/chart/";
const StockInfoAPIParameters =
  "?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";

const stockLogoUrl =
  "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=";

const stockCompanyUrl =
  "https://query1.finance.yahoo.com/v11/finance/quoteSummary/";
const stockCompanyUrlParameters = "?modules=assetProfile";

//adds the selected stock to the portfolio of the StockBot
async function addStockToDb() {
  const stockToAdd = await getRandomStockSymbol();

  if (stockToAdd == null) return;

  const stockInfoUrl =
    StockInfoAPI + stockToAdd.symbol + StockInfoAPIParameters;

  const json = await fetchStockInfo(stockInfoUrl);

  const stock: Stock = {
    symbol: json.chart.result[0].meta.symbol,
    name: stockToAdd.name,
    buydate: new Date().toISOString(),
    shares_count: 1,
    price: json.chart.result[0].meta.regularMarketPrice,
    dbTimestamp: new Date().toISOString(),
    logoUrl: stockLogoUrl + stockToAdd.symbol,
    companyUrl: stockCompanyUrl + stockToAdd.symbol + stockCompanyUrlParameters,
    stockUrl: stockInfoUrl,
  };

  addNativeStock(stock);
}

//pick a random element from nasdaq500
async function getRandomStockSymbol(): Promise<Stock | undefined> {
  const symbols = await getStocksFromNasdaq500();
  if (symbols.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * symbols.length);

  const stock: Stock = {
    symbol: symbols[randomIndex].symbol,
    name: symbols[randomIndex].name,
    price: -1,
  };

  return stock;
}

//fetch list of all stocks from nasdaq500
const getStocksFromNasdaq500 = () => {
  return fetch(NasDaq500API)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

//fetch data for a specific stock
const fetchStockInfo = (url: string) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addStockAtTime = (hour: number, minute: number) => {
  const now = new Date();
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute
  );
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }
  const delay = target.getTime() - now.getTime();
  setTimeout(() => {
    addStockToDb(); //adds the stock after the delay (for example: its 9am, so the timeout will wait 1 hour until 10am. then an interval is set to run every 24 hours)
    setInterval(() => {
      addStockToDb();
    }, 24 * 60 * 60 * 1000); // get seconds in a day: 24 hours * 60 minutes * 60 seconds (* 1000 to convert to milliseconds)
  }, delay);
};
