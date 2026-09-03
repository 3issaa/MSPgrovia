// Mock data for the Wallet page.
// Swap these for real API calls later without touching the components —
// every component in components/wallet consumes this exact shape via props.

export const walletSummary = {
  totalBalance: 124321.4,
  changeVsLastMonth: 2.4,
  availableToSpend: 45210.49,
  // relative heights (0-1) for the mini trend chart on the balance card
  trend: [0.3, 0.35, 0.32, 0.45, 0.5, 0.48, 0.62, 0.7, 0.66, 0.85, 1],
};

export const quickActions = [
  { id: "add-money", label: "Add Money", icon: "Plus" },
  { id: "withdraw", label: "Withdraw", icon: "ArrowDownToLine" },
  { id: "transfer", label: "Transfer", icon: "ArrowLeftRight" },
  { id: "manage-banks", label: "Manage Banks", icon: "Landmark" },
];

export const expenseCategories = [
  {
    id: "investments",
    name: "Investments",
    value: 40,
    amount: 4980.0,
    color: "#14B8A6",
  },
  {
    id: "transfer",
    name: "Transfer",
    value: 25,
    amount: 3112.5,
    color: "#0F2A44",
  },
  { id: "food", name: "Food", value: 15, amount: 1867.5, color: "#F5A623" },
  {
    id: "medical",
    name: "Medical",
    value: 14,
    amount: 1245.0,
    color: "#0E7C86",
  },
  {
    id: "shopping",
    name: "Shopping",
    value: 7,
    amount: 622.5,
    color: "#F0715A",
  },
  {
    id: "groceries",
    name: "Groceries",
    value: 7,
    amount: 622.5,
    color: "#94A3B8",
  },
];

export const linkedAccounts = [
  { id: "chase", bankCode: "CHASE", name: "Chase Checking", last4: "4209" },
  {
    id: "wells-fargo",
    bankCode: "WF",
    name: "Wells Fargo Savings",
    last4: "8812",
  },
];

export const recentTransactions = [
  {
    id: 1,
    name: "Apple Store",
    category: "Shopping",
    date: "Today, 2:45 PM",
    amount: -1299.0,
  },
  {
    id: 2,
    name: "Tech Corp Inc.",
    category: "Salary",
    date: "Yesterday",
    amount: 8450.0,
  },
  {
    id: 3,
    name: "Transfer to Savings",
    category: "Transfer",
    date: "Aug 12, 2026",
    amount: -500.0,
  },
  {
    id: 4,
    name: "Whole Foods",
    category: "Food",
    date: "July 24, 2026",
    amount: -142.3,
  },
  {
    id: 5,
    name: "Tech Corp Inc.",
    category: "Salary",
    date: "June 15, 2026",
    amount: 8450.0,
  },
  {
    id: 6,
    name: "Central Bank of Egypt",
    category: "Interest",
    date: "May 30, 2026",
    amount: 500.0,
  },
  {
    id: 7,
    name: "Whole Foods",
    category: "Groceries",
    date: "Jan 03, 2026",
    amount: -142.3,
  },
  {
    id: 8,
    name: "Tech Corp Inc.",
    category: "Salary",
    date: "Oct 19, 2025",
    amount: 8450.0,
  },
  {
    id: 9,
    name: "Hospital",
    category: "Medical",
    date: "March 19, 2025",
    amount: -1299.0,
  },
  {
    id: 10,
    name: "Whole Foods",
    category: "Groceries",
    date: "Sep 12, 2024",
    amount: -142.3,
  },
];

export const walletShortcuts = [
  {
    id: "quick-add",
    title: "Quick Add",
    subtitle: "Instantly top up balance",
    icon: "Zap",
  },
  {
    id: "instant-withdraw",
    title: "Instant Withdraw",
    subtitle: "Move funds to bank",
    icon: "Banknote",
  },
  {
    id: "auto-invest",
    title: "Auto-Invest",
    subtitle: "Set up recurring rules",
    icon: "TrendingUp",
  },
];
