import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import {
    useAccount,
    useSimulateContract,
    useWaitForTransactionReceipt,
    useWriteContract,
} from 'wagmi';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import PaymentComplete from './PaymentComplete';
import Processing from './Processing';
import { PaySteps } from './PayDemo';


type StartPayProps = {
    setPayStep: React.Dispatch<React.SetStateAction<PaySteps>>;
    payStep: PaySteps;
};


export default function Pay({ setPayStep, payStep }: StartPayProps) {
    const { chain } = useAccount();
    const { address } = useAccount();
    const contract = useCustom1155Contract();

    const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

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
            {payStep === PaySteps.PAY_PROCESSING_STEP && <Processing />}
            {payStep === PaySteps.PAY_COMPLETE_STEP && (
                <PaymentComplete setPayStep={setPayStep} merchantName={"Isaac"} />
            )}

            {payStep === PaySteps.START_PAY_STEP && (
                <Button
                    onClick={handleMint}
                    disabled={!onCorrectNetwork}
                    className={clsx('my-4', onCorrectNetwork ? 'bg-white' : 'bg-gray-400')}
                >
                    Pay
                </Button>
            )}
        </>
    );
}