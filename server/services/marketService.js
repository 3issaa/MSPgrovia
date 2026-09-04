import axios from "axios";

const cache = new Map();
const TTL = 15 * 60 * 1000;
const cached = async (key, factory) => {
  const existing = cache.get(key);
  if (existing && Date.now() - existing.createdAt < TTL) return existing.value;
  const value = await factory(); cache.set(key, { value, createdAt: Date.now() }); return value;
};

export async function getAlphaQuote(symbol) {
  if (!process.env.ALPHA_VANTAGE_API_KEY) throw Object.assign(new Error("Alpha Vantage key is not configured."), { status: 503 });
  return cached(`alpha:${symbol}`, async () => {
    const { data } = await axios.get("https://www.alphavantage.co/query", { params: { function: "GLOBAL_QUOTE", symbol, apikey: process.env.ALPHA_VANTAGE_API_KEY }, timeout: 10000 });
    if (data.Note || data.Information) throw Object.assign(new Error(data.Note || data.Information), { status: 429 });
    const quote = data["Global Quote"];
    if (!quote?.["01. symbol"]) throw Object.assign(new Error("Symbol not found."), { status: 404 });
    return { symbol: quote["01. symbol"], price: Number(quote["05. price"]), change: Number(quote["09. change"]), changePercent: quote["10. change percent"], updatedAt: quote["07. latest trading day"], source: "Alpha Vantage", delayed: true };
  });
}

export async function getEgxQuote(symbol) {
  if (!process.env.EGX_API_KEY) throw Object.assign(new Error("EGX API key is not configured."), { status: 503 });
  return cached(`egx:${symbol}`, async () => {
    const { data } = await axios.get(`${process.env.EGX_API_BASE_URL || "https://api.egxapi.com/v2"}/market/quotes/${encodeURIComponent(symbol)}`, { headers: { Authorization: `Bearer ${process.env.EGX_API_KEY}`, "X-EGX-Env": "paper" }, timeout: 10000 });
    return { ...data, source: "EGXAPI", environment: "paper" };
  });
}
