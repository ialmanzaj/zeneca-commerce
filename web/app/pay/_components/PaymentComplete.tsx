import { useCallback } from 'react';
import clsx from 'clsx';
import { PaySteps } from './PayDemo';

type MintCompleteStepProps = {
    setPayStep: React.Dispatch<React.SetStateAction<PaySteps>>;
    merchantName: string | null;
};

export default function StepMintComplete({ setPayStep, merchantName }: MintCompleteStepProps) {
    const handleMintAnother = useCallback(() => {
        setPayStep(PaySteps.START_PAY_STEP);
    }, [setPayStep]);

    return (
        <div
            className={clsx(
                'rounded-lg border border-boat-color-palette-line',
                'mb-8 bg-boat-footer-dark-gray p-8',
            )}
        >
            <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white">
                Congrats! You paid {merchantName}
            </h2>
            <div className="text-center text-6xl">💳</div>
        </div>
    );
}