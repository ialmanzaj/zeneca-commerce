//import { SymbolIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

export default function StepMintProcessing() {
    return (
        <div
            className={clsx(
                'rounded-lg border border-boat-color-palette-line',
                'mb-8 bg-primary p-8',
            )}
        >
            <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white">
                Processing your payment...
            </h2>

            <div className="text-center text-6xl">💳</div>

            <div className="my-4 text-center text-sm text-gray-400">
                Please confirm transaction in your wallet
            </div>

            <Button
                variant="secondary"
            >
                <span>Your payment is in progress</span>
            </Button>
        </div>
    );
}