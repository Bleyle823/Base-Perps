export const PERPS_AGENT_NAME = 'base-perps-agent';

export const ARB_USDC_TOKEN_ID = '0xaf88d065e77c8cc2239327c5edb3a432268e5831';

export const ARB_USDC_TOKEN_SERVER_CHAIN = 'arb';

export const ARB_USDC_TOKEN_ITEM = {
  id: ARB_USDC_TOKEN_ID,
  chain: ARB_USDC_TOKEN_SERVER_CHAIN,
  name: 'USD Coin',
  optimized_symbol: 'USDC',
  symbol: 'USDC',
  logo_url:
    'https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png',
  amount: 0,
  price: 1,
  decimals: 6,
  display_symbol: 'USDC',
  is_core: false,
  is_verified: false,
  is_wallet: false,
  is_scam: false,
  is_infinity: false,
  is_suspicious: false,
  time_at: 0,
};

export enum CANDLE_MENU_KEY {
  ONE_HOUR = '1H',
  ONE_DAY = '1D',
  ONE_WEEK = '1W',
  ONE_MONTH = '1M',
  YTD = 'YTD',
  ALL = 'ALL',
}

export const DEFAULT_TOP_ASSET = [
  {
    id: 1,
    name: 'ETH',
    full_logo_url:
      'https://static.debank.com/image/hyper_liquid/logo_url/ETH/080c551d4527c48c664e2f9a42358c05.png',
    daily_volume: 5561174310,
  },
  {
    id: 0,
    name: 'BTC',
    full_logo_url:
      'https://static.debank.com/image/hyper_liquid/logo_url/BTC/da8784002998f4dbca0ad720ad10812f.png',
    daily_volume: 3470705727,
  },
  {
    id: 5,
    name: 'SOL',
    full_logo_url:
      'https://static.debank.com/image/hyper_liquid/logo_url/SOL/cf9836949424eb6c85cb04f386526134.png',
    daily_volume: 1122062141,
  },
  {
    id: 159,
    name: 'HYPE',
    full_logo_url:
      'https://static.debank.com/image/hyper_liquid/logo_url/HYPE/3640171ae0c3b46e6a465d278cf02d79.png',
    daily_volume: 456631634,
  },
  {
    id: 18,
    name: 'LINK',
    full_logo_url:
      'https://static.debank.com/image/hyper_liquid/logo_url/LINK/d4d3c2c5dbd014a03e36442e2c31a9a2.png',
    daily_volume: 188894542,
  },
];
