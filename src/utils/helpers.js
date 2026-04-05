export function formatDate(date) {
  // 1. Check if date is valid
  const d = new Date(date);

  if (isNaN(d)) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
    weekday: "short",
  })
    .format(d)
    .replaceAll(",", " ");
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function shorten(name, maxChars) {
  if (name.length > maxChars) {
    return name.split("").slice(0, maxChars).join("").concat("...");
  }
}
