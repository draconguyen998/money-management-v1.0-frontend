export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split("."); // Split into integer and fractional parts

  let integerPart = parts[0];
  const fractionalPart = parts[1];

  // Regex for Indian numbering system
  // It handles the first three digits, then every two digits
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    // Apply comma after every two digits for the 'otherNumbers' part
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree; // No change if less than 4 digits
  }

  // Combine integer and fractional parts
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};
export const prepareIncomeLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) return [];

  const getDateKey = (t) => {
    const raw =
      t.date ||
      t.createdAt ||
      t.created_at ||
      t.transactionDate ||
      t.transaction_date;

    if (!raw) return null;

    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return null;

    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  };

  const formatLabel = (yyyy_mm_dd) => {
    const d = new Date(yyyy_mm_dd);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  const map = new Map();

  for (const t of transactions) {
    const key = getDateKey(t);
    if (!key) continue;

    const amount = Number(t.amount ?? t.money ?? t.value ?? 0) || 0;
    const title = t.title || t.name || t.source || t.categoryName || "Income";

    if (!map.has(key)) {
      map.set(key, { date: formatLabel(key), amount: 0, details: [] });
    }

    const row = map.get(key);
    row.amount += amount;
    row.details.push({ label: title, value: amount });
  }

  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => v);
};
