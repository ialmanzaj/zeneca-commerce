'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
//mport Footer from '@/components/footer';
import Header from '@/components/header';
import Main from '@/components/main';
import Footer from '@/components/footer';
//import { v4 as uuidv4 } from 'uuid';

//import PaymentLinkModal from '@/components/PaymentLinkModal';


interface PaymentLink {
    id: string;
    title: string;
    amount: number;
    currency: string;
}


/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
    const account = useAccount();
    const [links, setLinks] = useState<PaymentLink[]>([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USDC');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLink: PaymentLink = {
            id: '123',//uuidv4(),
            title,
            amount: parseFloat(amount),
            currency,
        };
        setLinks([...links, newLink]);
        setTitle('');
        setAmount('');
    };


    return (
        <div id="page-container">
            <Header />
            <Main>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Payment Links</h1>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Title</th>
                                <th className="text-left">Amount</th>
                                <th className="text-left">Currency</th>
                                <th className="text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map((link) => (
                                <tr key={link.id}>
                                    <td>{link.title}</td>
                                    <td>{link.amount}</td>
                                    <td>{link.currency}</td>
                                    <td>
                                        <button className="text-blue-500 mr-2">Edit</button>
                                        <button className="text-red-500">Archive</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Main>
            <Footer />
        </div>
    )
}