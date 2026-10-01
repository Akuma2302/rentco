import { mockItems, type Item } from "./mockData";

/** Changes owners make to their listings, remembered in this browser. */
type ListingEdits = Record<string, Partial<Item>>;

const EDITS_KEY = "rentco.listingEdits";

function readEdits(): ListingEdits {
  try {
    return JSON.parse(localStorage.getItem(EDITS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** All items, with any saved listing edits applied. */
export function getItems(): Item[] {
  const edits = readEdits();
  return mockItems.map((item) => (edits[item.id] ? { ...item, ...edits[item.id] } : item));
}

export function getItem(id: string | undefined): Item | undefined {
  return getItems().find((item) => item.id === id);
}

export function saveListing(id: string, changes: Partial<Item>) {
  const edits = readEdits();
  edits[id] = { ...edits[id], ...changes };
  try {
    localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
  } catch {
    // Storage unavailable; the edit can't be kept.
  }
}
