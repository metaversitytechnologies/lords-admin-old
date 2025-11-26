 interface oddsResponse {
  Odds: Odd[];
  Bookmaker: Bookmaker[];
  Fancy: Fancy2[];
  Fancy2: Fancy2[];
  Fancy3: anFancy2y[];
  Khado: Fancy2[];
  Ball: Fancy2[];
  Meter: Fancy2[];
  OddEven: Fancy2[];
  BallByBall: Fancy2[];
}

 interface Odd {
  runners: Runner[];
  matchName: string;
  marketId: string;
  isMarketDataDelayed: boolean;
  status: string;
  inplay: boolean;
  Name: string;
  eventTime: string;
  lastMatchTime: string;
  maxBetRate: number;
  minBetRate: number;
  betDelay: number;
  maxBet: number;
  minBet: number;
  betlock: boolean;
  display_message: any;
}

 interface Runner {
  name: string;
  selectionId: string;
  runnerStatus: string;
  ex: Ex;
}

 interface Ex {
  availableToBack: AvailableToBack[];
  availableToLay: AvailableToLay[];
}

 interface AvailableToBack {
  price: number;
  size: number;
}

 interface AvailableToLay {
  price: number;
  size: number;
}

 interface Bookmaker {
  mid: string;
  t: string;
  sid: number;
  nation: string;
  b1: number;
  bs1: number;
  l1: number;
  ls1: number;
  gstatus: string;
  matchName: string;
  maxBetRate: number;
  minBetRate: number;
  betDelay: number;
  maxBet: number;
  minBet: number;
  betlock: boolean;
  display_message: any;
  provider: string;
  rem: string;
}

 interface Fancy2 {
  mid: string;
  t: string;
  sid: string;
  nation: string;
  b1: number;
  bs1: number;
  l1: number;
  ls1: number;
  gstatus: string;
  maxBet: number;
  minBet: number;
  betDelay: number;
  isCommissionAllowed: boolean;
  srno: number;
  provider: string;
  rem: string;
}
