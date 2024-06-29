import { useState } from 'react';
import { getName } from '@coinbase/onchainkit/identity';
import { encodeFunctionData, formatEther } from 'viem';
import { useAccount, useEstimateGas } from 'wagmi';
import { EXPECTED_CHAIN } from '@/constants';
import Pay from './Pay';
import {
    ConnectWallet,
    Wallet,
} from '@coinbase/onchainkit/wallet';

export enum PaySteps {
    START_PAY_STEP,
    PAY_PROCESSING_STEP,
    OUT_OF_GAS_STEP,
    PAY_COMPLETE_STEP,
}
interface PaymentLink {
    id: string;
    link: string;
    currency: string;
    amount: number;
    title: string;
    description?: string;
    collectFullName: boolean;
    collectEmail: boolean;
    collectAddress: boolean;
    collectPhoneNumber: boolean;
    createdAt: string;
}

export default function PayDemo() {
    const [payStep, setPayStep] = useState<PaySteps>(PaySteps.START_PAY_STEP);

    const { isConnected } = useAccount();

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
                <ConnectWallet className='p-3 rounded-2xl w-full' label='Pay'>
                </ConnectWallet>
            )}
        </div>
    );
}