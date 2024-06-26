import { useState } from 'react';
import { getName } from '@coinbase/onchainkit/identity';
import { encodeFunctionData, formatEther } from 'viem';
import { useAccount, useEstimateGas } from 'wagmi';

import { FallbackImage } from '@/components/FallbackImage/FallbackImage';
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';
import AccountConnect from '@/components/layout/header/AccountConnect';
import NextImage from '@/components/NextImage/NextImage';
import { EXPECTED_CHAIN } from '@/constants';
import { useERC1155TokenMetadata } from '@/hooks/useERC1155TokenMetadata';
import { getChainsForEnvironment } from '@/store/supportedChains';
import { useCustom1155Contract } from '../_contracts/useCustom1155Contract';
import Pay from './Pay';

export enum PaySteps {
  START_PAY_STEP,
  PAY_PROCESSING_STEP,
  OUT_OF_GAS_STEP,
  PAY_COMPLETE_STEP,
}

export default function PayDemo() {
  const [payStep, setPayStep] = useState<PaySteps>(PaySteps.START_PAY_STEP);

  const { chain: accountChain, address, isConnected } = useAccount();
  console.log('accountChain', accountChain);
  const contract = useCustom1155Contract();

  const chain =
    accountChain ?? getChainsForEnvironment().find((envChain) => EXPECTED_CHAIN.id === envChain.id);

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  // The CustomERC1155 contract is a free mint, so instead of mint price we fetch tx fee estimate
  const { data: txFeeEstimation, isLoading: isLoadingFeeEstimate } = useEstimateGas({
    to: contract.status === 'ready' ? contract.address : undefined,
    account: address,
    chainId: chain?.id,
    data: address
      ? encodeFunctionData({
        abi: contract.abi,
        functionName: 'mint',
        args: [address, BigInt(1), BigInt(1), address],
      })
      : undefined,
    query: { enabled: onCorrectNetwork && !!address },
  });


  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-3"></div>
        <h2 className="text-xl font-bold">Isaac</h2>

      </div>

      <div className="mb-8 h-72">
        <div className="mb-4 flex">
          <p className="text-gray-400 text-xs grow">PRODUCTS • 1</p>
          <p className="text-right text-gray-400 text-sm">$100</p>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-3"></div>
          <div>
            <p className="font-bold">pago de servicios</p>
            <p className="text-gray-400">pago de servicios de internet</p>
          </div>
          <p className="ml-auto">$100</p>
        </div>
      </div>

      <div className="border-t border-gray-700 my-4"></div>

      {isConnected ? (
        <Pay
          setPayStep={setPayStep}
          payStep={payStep}
        />
      ) : (
        <AccountConnect />
      )}
    </div>
  );
}
