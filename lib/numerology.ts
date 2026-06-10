const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

export function isValidAddress(address: string): boolean {
  return ADDRESS_PATTERN.test(address.trim());
}

function digitValue(char: string): number {
  if (char >= "0" && char <= "9") {
    return Number(char);
  }

  const code = char.charCodeAt(0);

  if (code >= 97 && code <= 102) {
    return code - 96;
  }

  return 0;
}

export function reduceFortuneNumber(value: number): number {
  let current = value;

  while (current > 9 && current !== 11 && current !== 22) {
    current = String(current)
      .split("")
      .reduce((sum, char) => sum + Number(char), 0);
  }

  return current;
}

export function getDateKey(date = new Date(), offsetDays = 0): string {
  const shifted = new Date(date.getTime() + offsetDays * 86_400_000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
  });
  const parts = formatter.formatToParts(shifted);
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
}

export function getDateNumerologyNumber(dateKey: string): number {
  const sum = dateKey
    .replaceAll("-", "")
    .split("")
    .reduce((total, char) => total + Number(char), 0);

  return reduceFortuneNumber(sum);
}

export function getMonthKey(date = new Date(), offsetMonths = 0): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
  });
  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value ?? "1970");
  const month = Number(parts.find((part) => part.type === "month")?.value ?? "1");
  const shiftedMonthIndex = year * 12 + (month - 1) + offsetMonths;
  const shiftedYear = Math.floor(shiftedMonthIndex / 12);
  const shiftedMonth = (shiftedMonthIndex % 12) + 1;

  return `${shiftedYear}-${String(shiftedMonth).padStart(2, "0")}`;
}

export function getMonthNumerologyNumber(monthKey: string): number {
  const sum = monthKey
    .replaceAll("-", "")
    .split("")
    .reduce((total, char) => total + Number(char), 0);

  return reduceFortuneNumber(sum);
}

export function getAddressDateFortuneNumber(address: string, dateKey: string): number {
  const normalized = normalizeAddress(address);
  const body = normalized.startsWith("0x") ? normalized.slice(2) : normalized;
  const addressSum = body.split("").reduce((total, char) => total + digitValue(char), 0);
  const dateSum = dateKey
    .replaceAll("-", "")
    .split("")
    .reduce((total, char) => total + Number(char), 0);

  return reduceFortuneNumber(addressSum + dateSum);
}

export function getAddressMonthFortuneNumber(address: string, monthKey: string): number {
  const normalized = normalizeAddress(address);
  const body = normalized.startsWith("0x") ? normalized.slice(2) : normalized;
  const addressSum = body.split("").reduce((total, char) => total + digitValue(char), 0);
  const monthSum = monthKey
    .replaceAll("-", "")
    .split("")
    .reduce((total, char) => total + Number(char), 0);

  return reduceFortuneNumber(addressSum + monthSum);
}

export function addressDateToSeed(address: string, dateKey: string): number {
  return addressToSeed(`${normalizeAddress(address)}:${dateKey}`);
}

export function addressMonthToSeed(address: string, monthKey: string): number {
  return addressToSeed(`${normalizeAddress(address)}:${monthKey}`);
}

export function addressToSeed(address: string): number {
  const normalized = normalizeAddress(address);
  const body = normalized.startsWith("0x") ? normalized.slice(2) : normalized;
  let hash = 2166136261;

  for (const char of body) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function getFortuneNumber(address: string): number {
  const normalized = normalizeAddress(address);
  const body = normalized.startsWith("0x") ? normalized.slice(2) : normalized;
  const sum = body.split("").reduce((total, char) => total + digitValue(char), 0);

  return reduceFortuneNumber(sum);
}
