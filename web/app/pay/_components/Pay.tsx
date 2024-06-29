import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import {
    useAccount,

} from 'wagmi';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import PaymentComplete from './PaymentComplete';
import Processing from './Processing';
import { PaySteps } from './PayDemo';
import { useUSDCContract } from '../_contracts/useUSDC';
import { encodeFunctionData, parseAbiItem, Hex } from "viem";
import { useWriteContracts, useCallsStatus, useCapabilities } from 'wagmi/experimental'


type StartPayProps = {
    setPayStep: React.Dispatch<React.SetStateAction<PaySteps>>;
    payStep: PaySteps;
};

const defaultUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL


export default function Pay({ setPayStep, payStep }: StartPayProps) {
    const { address } = useAccount();
    const { data: callID, writeContracts } = useWriteContracts();
    const [amount, setAmount] = useState('1');
    const [merchantAddress, setMerchantAddress] = useState('0x02C48c159FDfc1fC18BA0323D67061dE1dEA329F');
    console.log("address", address);
    const contract = useUSDCContract();

    if (contract.status !== 'ready') {
        console.error('Contract is not ready');
        return null;
    }

    console.log("contract.address", contract.address);
    console.log("contract.abi", contract.abi);
    console.log("amount", amount);
    console.log("merchantAddress", merchantAddress);

    const handleTransfer = () => {
        writeContracts({
            contracts: [
                {
                    address: contract.address, // Sepolia USDC address
                    abi: contract.abi,
                    functionName: 'transfer',
                    args: [merchantAddress, BigInt(amount) * BigInt(10 ** 6)], // Convert to USDC decimals (6)
                },
            ],
            capabilities: {
                paymasterService: {
                    url: defaultUrl,
                },
            },
        });
    };

    const { data: callsStatus } = useCallsStatus({
        id: callID!,
        query: {
            refetchInterval: (data: any) =>
                data.state.data?.status === 'CONFIRMED' ? false : 1000,
        },
    });


    return (
        <>
            {callsStatus?.status === 'PENDING' && <Processing />}
            {callsStatus?.status === 'CONFIRMED' && (
                <PaymentComplete setPayStep={setPayStep} merchantName={"Isaac"} />
            )}

            {callsStatus?.status !== 'CONFIRMED' && callsStatus?.status !== 'PENDING' && (
                <Button
                    onClick={handleTransfer}
                    className={clsx('w-full my-4')}
                >
                    Pay
                </Button>
            )}
        </>
    );
}