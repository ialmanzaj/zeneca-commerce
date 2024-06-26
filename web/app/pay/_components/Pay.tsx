import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import Button from '@/components/Button/Button';
import { EXPECTED_CHAIN } from '@/constants';
import { useCustom1155Contract } from '../_contracts/useCustom1155Contract';
import { PaySteps } from './PayDemo';
import StepMintComplete from './StepMintComplete';
import StepMintProcessing from './StepMintProcessing';
import isLocal from '../../../src/utils/isLocal';


type StartPayProps = {
  setPayStep: React.Dispatch<React.SetStateAction<PaySteps>>;
  payStep: PaySteps;
};

const isLocalEnv = isLocal();

const defaultUrl = isLocalEnv
  ? process.env.NEXT_PUBLIC_PAYMASTER_URL
  : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/paymaster-proxy`;


export default function Pay({ setPayStep, payStep }: StartPayProps) {
  const { chain } = useAccount();
  const { address } = useAccount();
  const contract = useCustom1155Contract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  console.log('onCorrectNetwork', onCorrectNetwork, chain?.id, EXPECTED_CHAIN.id);

  const { data: mintData } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
    query: {
      enabled: onCorrectNetwork,
    },
  });

  const { writeContract: performMint, error: errorMint, data: dataMint } = useWriteContract();

  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash: dataMint,
    query: {
      enabled: !!dataMint,
    },
  });

  console.log('dataMint', dataMint);

  useEffect(() => {
    if (transactionStatus === 'success') {
      setPayStep(PaySteps.PAY_COMPLETE_STEP);
    }

    if (errorMint) {
      const isOutOfGas =
        errorMint instanceof TransactionExecutionError &&
        errorMint.message.toLowerCase().includes('out of gas');
      setPayStep(isOutOfGas ? PaySteps.OUT_OF_GAS_STEP : PaySteps.START_PAY_STEP);
    }
  }, [transactionStatus, setPayStep, errorMint]);
  console.log('mintData', mintData);

  const handleMint = useCallback(() => {
    console.log('mintData?.request', mintData?.request);
    if (mintData?.request) {
      performMint?.(mintData?.request);
      setPayStep(PaySteps.PAY_PROCESSING_STEP);
    }
  }, [mintData, performMint, setPayStep]);

  return (
    <>
      {payStep === PaySteps.PAY_PROCESSING_STEP && <StepMintProcessing />}
      {payStep === PaySteps.PAY_COMPLETE_STEP && (
        <StepMintComplete setPayStep={setPayStep} merchantName={"Isaac"} />
      )}

      {payStep === PaySteps.START_PAY_STEP && (
        <Button
          buttonContent="Pay"
          onClick={handleMint}
          disabled={!onCorrectNetwork}
          className={clsx('my-4', onCorrectNetwork ? 'bg-white' : 'bg-gray-400')}
        />
      )}
    </>
  );
}
