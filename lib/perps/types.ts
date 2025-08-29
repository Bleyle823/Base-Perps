import {
  AssetPosition,
  MarginSummary,
  OpenOrder,
  WsFill,
} from '@rabby-wallet/hyperliquid-sdk';

export interface PositionAndOpenOrder extends AssetPosition {
  openOrders: OpenOrder[];
}

export interface AccountSummary extends MarginSummary {
  withdrawable: string;
}

export interface MarketData {
  index: number;
  logoUrl: string;
  name: string;
  maxLeverage: number;
  minLeverage: number;
  maxUsdValueSize: string;
  szDecimals: number;
  pxDecimals: number;
  dayBaseVlm: string;
  dayNtlVlm: string;
  funding: string;
  markPx: string;
  midPx: string;
  openInterest: string;
  oraclePx: string;
  premium: string;
  prevDayPx: string;
}

export type MarketDataMap = Record<string, MarketData>;

export interface AccountHistoryItem {
  time: number;
  hash: string;
  type: 'deposit' | 'withdraw';
  status: 'pending' | 'success' | 'failed';
  usdValue: string;
}

export interface PerpsState {
  positionAndOpenOrders: PositionAndOpenOrder[];
  accountSummary: AccountSummary | null;
  marketData: MarketData[];
  marketDataMap: MarketDataMap;
  hasPermission: boolean;
  perpFee: number;
  isLogin: boolean;
  isInitialized: boolean;
  userFills: WsFill[];
  userAccountHistory: AccountHistoryItem[];
  localLoadingHistory: AccountHistoryItem[];
  homePositionPnl: {
    pnl: number;
    show: boolean;
  };
}
