'use client';

import dynamic from 'next/dynamic';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Main from '@/components/main';
import { FC } from 'react';

// Because the mint page relies so heavily on client-side state, without disabling SSR
// for its internals we get annoying hydration errors. A future enhancement would be to
// read token metadata through a provider that is available server-side.
const PayDemo = dynamic(
    async () => import('@/app/pay/_components/PayFlow').then((mod) => mod),
    {
        ssr: false,
    },
);


interface PaymentLink {
    id: string;
    link: string;
    currency: string;
    amount: number;
    title: string;
    description?: string;
    merchantName: string;
}

const paymentLinkExample: PaymentLink = {
    id: '123',
    link: 'https://www.google.com',
    currency: 'USDC',
    amount: 100,
    title: 'Pago de servicios',
    description: 'pago de servicios de internet de la empresa XYZ',
    merchantName: 'Isaac Almanza',
}

const PayPage: FC<{ params: { id: string } }> = ({ params }) => {
    console.log(params);
    return (
        <div className="bg-gray-100 min-h-screen">

            <Main>
                <PayDemo link={paymentLinkExample} />
            </Main>

        </div>
    );
}
export default PayPage;




