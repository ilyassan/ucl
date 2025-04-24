import type { Match, MatchDetails, MatchesByDate } from "@/lib/types";


async function fetchData<T>(): Promise<T> {
  const response = await fetch(`/api/matches`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch`);
  }
  const { data } = await response.json();

  return data;
}

// API functions
export async function fetchMatches(): Promise<Match[]> {
  const data: MatchesByDate = await fetchData();
  return Object.values(data).flatMap(dateData => dateData.matches);
}

export async function fetchMatchesByDate(date: string): Promise<Match[]> {
  const data: MatchesByDate = await fetchData();
  return data[date]?.matches || [];
}

export async function fetchMatchById(id: string): Promise<Match | null> {
  const allMatches = await fetchMatches();
  return allMatches.find(match => match.id === id) || null;
}

export async function fetchMatchDetails(id: string): Promise<MatchDetails> {
  // First find which date the match is on
  const allMatchesByDate: MatchesByDate = await fetchData();
  
  for (const date in allMatchesByDate) {
    const match = allMatchesByDate[date].matches.find(m => m.id === id);
    if (match) {
      return (match as any).details || 
        Promise.reject(new Error(`Details not found for match ${id}`));
    }
  }
  
  throw new Error(`Match details not found for ID: ${id}`);
}

export async function fetchAvailableDates(): Promise<string[]> {
  const data: MatchesByDate = await fetchData();
  return Object.keys(data);
}