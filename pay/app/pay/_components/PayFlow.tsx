'use client';
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
    APPROVE_STEP,
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
    merchantName: string;
}

export default function PayFlow({ link }: { link: PaymentLink }) {
    const [payStep, setPayStep] = useState<PaySteps>(PaySteps.START_PAY_STEP);

    const { isConnected } = useAccount();

    return (
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto border border-gray-200 shadow-md">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-3"></div>
                <h2 className="text-xl font-bold">{link.merchantName}</h2>

            </div>

            <div className="mb-8 h-72">
                <div className="mb-4 flex">
                    <p className="text-gray-400 text-xs grow">PRODUCTS • 1</p>
                    <p className="text-right text-gray-400 text-sm">${link.amount}</p>
                </div>
                <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-3"></div>
                    <div className="mx-6">
                        <p className="font-bold">{link.title}</p>
                        <p className="text-gray-400">{link.description}</p>
                    </div>
                    <p className="ml-auto">${link.amount}</p>
                </div>
            </div>

            <div className="border-t border-gray-700 my-4"></div>

            {isConnected ? (
                <Pay
                    setPayStep={setPayStep}
                    payStep={payStep}
                    paymentLink={link}
                />
            ) : (
                <ConnectWallet className='p-3 rounded-2xl w-full' label='Pay'>
                </ConnectWallet>
            )}
        </div>
    );
}