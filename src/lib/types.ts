export interface Player {
  id: string;
  name: string;
  image: string;
  number: number;
  position: string;
  role: "STARTER" | "SUBSTITUTE";
  rating: number;
  teamName: string;
  stats: Record<string, any>;
}

export interface TeamLineup {
  teamName: string;
  formation: string;
  players: Player[];
}

export interface TeamStats {
  possessionPercent: number;
  shots: {
    total: number;
    onTarget: number;
    offTarget: number;
  };
  passes: {
    total: number;
    accurate: number;
  };
  corners: number;
  fouls: number;
  offsides: number;
}

export interface MatchIncident {
  minute: number;
  type: "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUBSTITUTION" | "PENALTY";
  playerName: string;
  teamName: string;
  assistedBy?: string;
}

export interface MatchDetails {
  incidents: MatchIncident[];
  stats: {
    home: TeamStats;
    away: TeamStats;
  };
  lineups: {
    home: TeamLineup;
    away: TeamLineup;
  };
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  score: string;
  status: "FINISHED" | "SCHEDULED" | "IN_PROGRESS" | "POSTPONED";
  timestamp: number;
  date?: string; // Added to match the JSON structure
}

export interface MatchesByDate {
  [date: string]: {
    matches: Match[];
  };
}