import { HyperliquidSDK } from '@rabby-wallet/hyperliquid-sdk';

let sdkInstance: HyperliquidSDK | null = null;
let currentMasterAddress: string | null = null;

export const getPerpsSDK = () => {
  if (!sdkInstance) {
    sdkInstance = new HyperliquidSDK({
      isTestnet: false,
      timeout: 10000,
    });
    return sdkInstance;
  }

  return sdkInstance;
};

export const destroyPerpsSDK = () => {
  sdkInstance?.ws.disconnect();
  sdkInstance = null;
  currentMasterAddress = null;
};
