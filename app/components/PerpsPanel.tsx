'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from './DemoComponents';
import { usePerpsData } from '../../lib/perps/usePerpsData';
import { formatUsdValue, splitNumberByStep, formatPercent } from '../../lib/perps/utils';

interface MarketRowProps {
  name: string;
  logoUrl: string;
  markPx: string;
  funding: string;
  volume: string;
  onTrade: () => void;
}

function MarketRow({ name, logoUrl, markPx, funding, volume, onTrade }: MarketRowProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <img 
          src={logoUrl} 
          alt={name} 
          className="w-8 h-8 rounded-full"
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/32x32/3b82f6/ffffff?text=${name.charAt(0)}`;
          }}
        />
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{formatUsdValue(markPx)}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{formatPercent(Number(funding))}</div>
        <div className="text-xs text-gray-500">{splitNumberByStep(volume)}</div>
      </div>
      <Button size="sm" onClick={onTrade}>
        Trade
      </Button>
    </div>
  );
}

export function PerpsPanel() {
  const { address } = useAccount();
  const { marketData, positions, accountSummary, isLoading, error, fetchPositions, fetchAccountSummary } = usePerpsData();
  const [activeTab, setActiveTab] = useState<'markets' | 'positions'>('markets');

  useEffect(() => {
    if (address) {
      fetchPositions(address);
      fetchAccountSummary(address);
    }
  }, [address, fetchPositions, fetchAccountSummary]);

  const handleTrade = (assetName: string) => {
    // Placeholder for trading functionality
    console.log(`Trading ${assetName}`);
    alert(`Trading functionality for ${assetName} would be implemented here`);
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-700 font-medium">Error loading perps data</div>
        <div className="text-red-600 text-sm mt-1">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <h2 className="text-xl font-bold">Perpetual Futures</h2>
        <p className="text-blue-100 text-sm mt-1">Trade with up to 100x leverage</p>
      </div>

      {/* Account Summary */}
      {address && accountSummary && (
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Account Value</div>
              <div className="text-lg font-semibold">{formatUsdValue(accountSummary.accountValue)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Available Balance</div>
              <div className="text-lg font-semibold">{formatUsdValue(accountSummary.withdrawable)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 font-medium text-sm ${
            activeTab === 'markets'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('markets')}
        >
          Markets
        </button>
        <button
          className={`flex-1 py-3 px-4 font-medium text-sm ${
            activeTab === 'positions'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('positions')}
        >
          Positions
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <div className="mt-2 text-gray-600">Loading...</div>
          </div>
        ) : activeTab === 'markets' ? (
          <div>
            {marketData.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No market data available
              </div>
            ) : (
              marketData.slice(0, 10).map((market) => (
                <MarketRow
                  key={market.name}
                  name={market.name}
                  logoUrl={market.logoUrl}
                  markPx={market.markPx}
                  funding={market.funding}
                  volume={market.dayBaseVlm}
                  onTrade={() => handleTrade(market.name)}
                />
              ))
            )}
          </div>
        ) : (
          <div>
            {positions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {address ? 'No open positions' : 'Connect wallet to view positions'}
              </div>
            ) : (
              positions.map((position, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{position.position.coin}</div>
                      <div className="text-sm text-gray-500">
                        Size: {position.position.szi}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatUsdValue(position.position.unrealizedPnl)}
                      </div>
                      <div className="text-sm text-gray-500">PnL</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="text-xs text-gray-600 text-center">
          Powered by Hyperliquid • Trade at your own risk
        </div>
      </div>
    </div>
  );
}
