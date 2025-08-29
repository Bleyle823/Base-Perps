'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPerpsSDK } from './sdkManager';
import type { MarketData, PositionAndOpenOrder, AccountSummary } from './types';

export const usePerpsData = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [positions, setPositions] = useState<PositionAndOpenOrder[]>([]);
  const [accountSummary, setAccountSummary] = useState<AccountSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const sdk = getPerpsSDK();
      
      // Get market metadata
      const meta = await sdk.info.meta();
      
      // Transform to our MarketData format
      const transformedData: MarketData[] = meta.universe.map((asset, index) => ({
        index,
        logoUrl: `https://static.debank.com/image/hyper_liquid/logo_url/${asset.name}/logo.png`,
        name: asset.name,
        maxLeverage: asset.maxLeverage,
        minLeverage: 1,
        maxUsdValueSize: asset.maxUsdValueSize || '0',
        szDecimals: asset.szDecimals,
        pxDecimals: 5, // Default value
        dayBaseVlm: '0',
        dayNtlVlm: '0',
        funding: '0',
        markPx: '0',
        midPx: '0',
        openInterest: '0',
        oraclePx: '0',
        premium: '0',
        prevDayPx: '0',
      }));

      setMarketData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPositions = useCallback(async (userAddress: string) => {
    if (!userAddress) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const sdk = getPerpsSDK();
      
      // Get clearinghouse state (positions and orders)
      const clearinghouse = await sdk.info.clearinghouseState(userAddress);
      
      // Transform to our format
      const transformedPositions: PositionAndOpenOrder[] = clearinghouse.assetPositions.map(position => ({
        ...position,
        openOrders: []
      }));

      setPositions(transformedPositions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch positions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAccountSummary = useCallback(async (userAddress: string) => {
    if (!userAddress) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const sdk = getPerpsSDK();
      
      // Get margin summary
      const marginSummary = await sdk.info.marginSummary(userAddress);
      
      const summary: AccountSummary = {
        ...marginSummary,
        withdrawable: marginSummary.marginUsed || '0'
      };

      setAccountSummary(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account summary');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  return {
    marketData,
    positions,
    accountSummary,
    isLoading,
    error,
    fetchMarketData,
    fetchPositions,
    fetchAccountSummary,
    refetch: fetchMarketData,
  };
};
