export const marketSummary = {
  name: "Dow Jones Industrial Average",
  value: "39,127.14",
  change: "+211.06 (+0.54%)",
  status: "As of 4:00 PM EST. Market closed.",
};

export const marketTrendByPeriod = {
  "1D": { labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"], values: [38980, 39015, 38995, 39040, 39075, 39050, 39110, 39127] },
  "5D": { labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], values: [38740, 38890, 38820, 39010, 39127] },
  "1M": { labels: ["Week 1", "Week 2", "Week 3", "Week 4"], values: [38450, 38610, 38920, 39127] },
  "6M": { labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], values: [36880, 37240, 37910, 38420, 38860, 39127] },
  YTD: { labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"], values: [36780, 37050, 37860, 38240, 38760, 39010, 39127] },
  "1Y": { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], values: [36950, 37140, 37050, 37620, 37500, 37860, 38220, 37970, 38310, 38670, 38540, 39127] },
  "5Y": { labels: ["2021", "2022", "2023", "2024", "2025", "2026"], values: [30600, 32900, 34600, 37400, 38280, 39127] },
  MAX: { labels: ["2016", "2018", "2020", "2022", "2024", "2026"], values: [18200, 24700, 30600, 32900, 37400, 39127] },
};

export const marketMetrics = [
  { label: "Open", value: "38,980.20" },
  { label: "High", value: "39,150.80" },
  { label: "Low", value: "38,920.10" },
  { label: "Previous Close", value: "38,916.08" },
  { label: "52-Week High", value: "39,889.05" },
  { label: "52-Week Low", value: "32,327.20" },
];

export const chartTypes = ["Area", "Compare", "Indicators"];
export const chartPeriods = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "MAX"];

export const marketCards = [
  { id: "dow", name: "Dow Jones Industrial Average", value: "39,127.14", delta: "+211.06", change: "+0.54%", direction: "up", points: [38980, 39015, 38995, 39040, 39075, 39050, 39110, 39127] },
  { id: "nasdaq", name: "Nasdaq Composite", value: "16,274.94", delta: "+156.44", change: "+0.97%", direction: "up", points: [16020, 16110, 16070, 16180, 16210, 16275] },
  { id: "sp500", name: "S&P 500", value: "5,211.49", delta: "+41.32", change: "+0.80%", direction: "up", points: [5160, 5180, 5170, 5195, 5185, 5205, 5211] },
  { id: "ftse", name: "FTSE 100", value: "7,935.09", delta: "-17.11", change: "-0.22%", direction: "down", points: [7990, 7975, 7940, 7965, 7915, 7935] },
  { id: "nikkei", name: "Nikkei 225", value: "39,773.14", delta: "-381.10", change: "-0.95%", direction: "down", points: [40300, 40180, 39900, 40050, 39800, 39773] },
  { id: "dax", name: "DAX", value: "18,284.11", delta: "+112.56", change: "+0.62%", direction: "up", points: [18120, 18200, 18170, 18245, 18284] },
];

const trendLabels = {
  day: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"],
  week: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  month: ["Week 1", "Week 2", "Week 3", "Week 4"],
  halfYear: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ytd: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
  year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fiveYear: ["2021", "2022", "2023", "2024", "2025", "2026"],
  max: ["2016", "2018", "2020", "2022", "2024", "2026"],
};

function buildMarketTrend(values) {
  return {
    "1D": { labels: trendLabels.day, values: values.slice(0, 8) },
    "5D": { labels: trendLabels.week, values: values.slice(0, 5) },
    "1M": { labels: trendLabels.month, values: [values[0], values[3], values[6], values[11]] },
    "6M": { labels: trendLabels.halfYear, values: [values[0], values[2], values[4], values[6], values[8], values[10]] },
    YTD: { labels: trendLabels.ytd, values: [values[0], values[1], values[3], values[5], values[7], values[9], values[11]] },
    "1Y": { labels: trendLabels.year, values },
    "5Y": { labels: trendLabels.fiveYear, values: [values[0], values[2], values[4], values[7], values[9], values[11]] },
    MAX: { labels: trendLabels.max, values: [values[0], values[1], values[3], values[5], values[8], values[11]] },
  };
}

const marketTrends = {
  dow: buildMarketTrend([36950, 37140, 37050, 37620, 37500, 37860, 38220, 37970, 38310, 38670, 38540, 39127]),
  nasdaq: buildMarketTrend([15020, 15180, 15090, 15340, 15280, 15510, 15780, 15620, 15890, 16040, 15980, 16275]),
  sp500: buildMarketTrend([4750, 4805, 4780, 4860, 4825, 4900, 4975, 4940, 5010, 5070, 5045, 5211]),
  ftse: buildMarketTrend([7680, 7780, 7725, 7850, 7905, 7840, 8010, 7960, 8050, 7995, 8030, 7935]),
  nikkei: buildMarketTrend([33400, 34150, 33800, 35200, 34750, 36100, 37400, 36800, 38250, 39100, 40500, 39773]),
  dax: buildMarketTrend([16200, 16550, 16400, 16850, 17100, 16950, 17400, 17250, 17800, 18100, 17950, 18284]),
};

export const marketDetails = Object.fromEntries(marketCards.map((market) => [market.id, {
  ...market,
  status: "As of 4:00 PM EST. Market closed.",
  metrics: market.id === "dow" ? marketMetrics : [
    { label: "Open", value: market.value },
    { label: "High", value: market.value },
    { label: "Low", value: market.value },
    { label: "Previous Close", value: market.value },
    { label: "52-Week High", value: market.value },
    { label: "52-Week Low", value: market.value },
  ],
  trendByPeriod: marketTrends[market.id],
}]));
