// Match types
export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  score: string
  status: string
  timestamp: number
}

export interface MatchDetails {
  incidents: Incident[]
  stats: {
    home: TeamStats
    away: TeamStats
  }
  lineups: {
    home: TeamLineup
    away: TeamLineup
  }
}

export interface Incident {
  minute: number
  type: "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUBSTITUTION"
  playerName: string
  teamName: string
  assistedBy?: string
}

export interface TeamStats {
  possessionPercent: number
  shots: {
    total: number
    onTarget: number
    offTarget: number
  }
  passes: {
    total: number
    accurate: number
  }
  corners: number
  fouls: number
  offsides: number
}

export interface TeamLineup {
  teamName: string
  formation: string
  players: Player[]
}

export interface Player {
  id: string
  name: string
  number: number
  position: string
  role: "STARTER" | "SUBSTITUTE"
  rating: number
  teamName: string
  stats: {
    goals?: number
    assists?: number
    shots?: number
    passes?: number
    saves?: number
    conceded?: number
    tackles?: number
    interceptions?: number
    clearances?: number
    blocks?: number
    yellowCards?: number
    redCards?: number
    [key: string]: number | undefined
  }
}
