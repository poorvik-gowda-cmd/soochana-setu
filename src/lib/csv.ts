/**
 * Robust CSV Parser Utility
 * Handles quoted fields, commas within values, and line breaks.
 */
export function parseCSV(csvText: string): any[] {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");
  if (lines.length === 0) return [];

  const headers = splitCSVLine(lines[0]);
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });
    results.push(obj);
  }

  return results;
}

function splitCSVLine(line: string): string[] {
  const result = [];
  let curVal = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(curVal.trim());
      curVal = "";
    } else {
      curVal += char;
    }
  }
  result.push(curVal.trim());
  return result.map(v => v.replace(/^"|"$/g, '').trim());
}
