
import { notFound } from 'next/navigation';

import Main from '@/components/main';
import { FC } from 'react';
import PayDemo from '@/app/pay/_components/PayFlow';

interface PaymentLink {
    id: string;
    link: string;
    currency: string;
    amount: number;
    title: string;
    description?: string;
    merchantName: string;
}


const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getPaymentLink(id: string): Promise<PaymentLink> {
    const res = await fetch(`${API_URL}/api/payment-links/${id}`);
    if (!res.ok) notFound();
    return res.json();
}

const PayPage: FC<{ params: { id: string } }> = async ({ params }) => {
    const paymentLink = await getPaymentLink(params.id);
    return (
        <div className="bg-gray-100 min-h-screen">

            <Main>
                <PayDemo link={paymentLink} />
            </Main>

        </div>
    );
}
export default PayPage;




