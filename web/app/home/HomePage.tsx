'use client';
import { ArrowUpRight } from "lucide-react"
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
//mport Footer from '@/components/footer';
import Header from '@/components/header';
import Main from '@/components/main';
import Footer from '@/components/footer';
//import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
//import PaymentLinkModal from '@/components/PaymentLinkModal';
import PaymentLinkModal from '@/components/PaymentLinkModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Copy } from "lucide-react";


interface PaymentLink {
    id: string;
    url: string;
    title: string;
    amount: number;
    currency: string;
    description: string;
}

interface Transaction {
    id: string;
    merchantAddress: string;
    customerAddress: string;
    amount: number;
    currency: string;
    paymentLink: PaymentLink;
    createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
const truncateUrl = (url: string, maxLength: number) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
};

export default function HomePage() {
    const account = useAccount();
    const [links, setLinks] = useState<PaymentLink[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optionally, you can add a toast notification here to confirm the copy action
    };

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('/api/payment-links');
                if (!response.ok) {
                    throw new Error('Failed to fetch payment links');
                }
                const data = await response.json();
                setLinks(data);
            } catch (error) {
                console.error('Error fetching payment links:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        fetchLinks();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/transactions');
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        fetchTransactions();
    }, []);
    console.log(transactions);

    return (
        <div id="page-container">
            <Header />
            <Main>
                <div className="container mx-auto p-4">
                    <Card
                        className="xl:col-span-2 mb-6" x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Payment Links</CardTitle>
                                <CardDescription>
                                    Payment links to send to your customers.
                                </CardDescription>
                            </div>
                            <PaymentLinkModal />

                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-left">Title</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead className="text-right">Currency</TableHead>
                                        <TableHead className="text-right">Link</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {links.map((link) => (
                                        <>
                                            <TableRow key={link.id}>
                                                <TableCell>
                                                    <div className="font-bold text-lg">{link.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {link.description}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="font-medium">
                                                    {link.amount}
                                                </TableCell>
                                                <TableCell className="text-right">{link.currency}</TableCell>

                                                <TableCell className="text-right">
                                                    <div className="flex items-center space-x-2 justify-right">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="cursor-pointer underline">
                                                                        {truncateUrl(`${API_URL}${link.url}`, 30)}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    Share this link to your customers.
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => copyToClipboard(`${API_URL}${link.url}`)}
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card
                        className="xl:col-span-2 mb-6" x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Transactions</CardTitle>
                                <CardDescription>
                                    View all transactions made to you.
                                </CardDescription>

                            </div>

                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Amount</TableHead>
                                
                                        <TableHead className="text-right">Currency</TableHead>
                                        <TableHead className="text-right">Paid</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <>
                                            <TableRow key={transaction.id}>
                                                <TableCell>
                                                    <div className="font-medium">{transaction.customerAddress}</div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {transaction.amount}
                                                </TableCell>
                                                <TableCell className="text-right">{transaction.currency}</TableCell>
                                                <TableCell className="text-right">{transaction.createdAt}</TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </div>
            </Main>
            <Footer />
        </div>
    )
}