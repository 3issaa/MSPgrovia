// Mock data for the Portfolio page.
// Same shape-driven pattern as walletData.js — swap for real API calls later
// without touching any component.

export const portfolioSummary = {
  totalValue: 124321.4,
  ytdChange: 18.4,
  totalGainLoss: 19382.56,
  sinceInception: "Jan 2024",
};

export const allocationCategories = [
  {
    id: "us-equities",
    name: "US Equities",
    value: 35,
    amount: 43512,
    color: "#14B8A6",
  },
  {
    id: "intl-equities",
    name: "International Equities",
    value: 20,
    amount: 24864,
    color: "#0F2A44",
  },
  {
    id: "fixed-income",
    name: "Fixed Income",
    value: 18,
    amount: 22378,
    color: "#0E7C86",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    value: 12,
    amount: 14918,
    color: "#F5A623",
  },
  {
    id: "commodities",
    name: "Commodities",
    value: 8,
    amount: 9946,
    color: "#F0715A",
  },
  {
    id: "cash",
    name: "Cash & Equivalents",
    value: 7,
    amount: 8703,
    color: "#94A3B8",
  },
];

// Relative performance values (any unit) used to draw the line chart.
export const performanceHistory = [
  { month: "Feb", value: 105 },
  { month: "Mar", value: 112 },
  { month: "Apr", value: 108 },
  { month: "May", value: 124 },
  { month: "Jun", value: 116 },
  { month: "Jul", value: 138 },
  { month: "Aug", value: 145 },
];

export const investmentHoldings = [
  {
    id: "vti",
    name: "US Equities Index Fund (VTI)",
    type: "Equity",
    currentValue: 43512.49,
    gainLoss: 5210.4,
    allocationShare: 35,
    color: "#14B8A6",
  },
  {
    id: "vea",
    name: "International Developed Markets (VEA)",
    type: "Equity",
    currentValue: 24864.28,
    gainLoss: 1840.12,
    allocationShare: 20,
    color: "#0F2A44",
  },
  {
    id: "bnd",
    name: "Vanguard Total Bond Market (BND)",
    type: "Bond",
    currentValue: 22377.85,
    gainLoss: -210.5,
    allocationShare: 18,
    color: "#0E7C86",
  },
  {
    id: "vnq",
    name: "Vanguard Real Estate REIT (VNQ)",
    type: "REIT",
    currentValue: 14918.57,
    gainLoss: 1120.8,
    allocationShare: 12,
    color: "#F5A623",
  },
  {
    id: "iau",
    name: "iShares Gold Trust (IAU)",
    type: "Commodity",
    currentValue: 9945.71,
    gainLoss: 850.32,
    allocationShare: 8,
    color: "#F0715A",
  },
  {
    id: "spaxx",
    name: "High Yield Cash Reserves (SPAXX)",
    type: "Cash",
    currentValue: 8702.5,
    gainLoss: 571.42,
    allocationShare: 7,
    color: "#94A3B8",
  },
];
