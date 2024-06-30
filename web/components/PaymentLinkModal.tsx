import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import SharePaymentLinkDialog from "@/components/share";

interface PaymentLink {
    currency: string;
    amount: number;
    title: string;
    url: string;
    description?: string;
    collectFullName: boolean;
    collectEmail: boolean;
    collectAddress: boolean;
    collectPhoneNumber: boolean;
}

const schema = z.object({
    currency: z.string().min(1, { message: "Currency is required" }),
    amount: z.number().positive({ message: "Amount must be positive" }),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    collectFullName: z.boolean(),
    collectEmail: z.boolean(),
    collectAddress: z.boolean(),
    collectPhoneNumber: z.boolean(),
});

type FormData = z.infer<typeof schema>;


const PaymentLinkModal: React.FC = () => {
    const [currency, setCurrency] = useState("USDC");
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [collectFullName, setCollectFullName] = useState(false);
    const [collectEmail, setCollectEmail] = useState(false);
    const [collectAddress, setCollectAddress] = useState(false);
    const [collectPhoneNumber, setCollectPhoneNumber] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogLink, setDialogLink] = useState<PaymentLink | null>(null);

    const handleCreate = async () => {
        const paymentLinkData: PaymentLink = {
            currency,
            amount: parseFloat(amount),
            title,
            url: "",
            description,
            collectFullName,
            collectEmail,
            collectAddress,
            collectPhoneNumber,
        };

        try {
            const response = await fetch('/api/payment-links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentLinkData),
            });

            if (response.ok) {
                setIsDialogOpen(false);
                const createdLink = await response.json();
                setDialogLink(createdLink);
                console.log('Payment link created:', createdLink);
                // Here you can add logic to update your UI, close the modal, show a success message, etc.
            } else {
                console.error('Failed to create payment link');
                // Handle error (show error message to user)
            }
        } catch (error) {
            console.error('Error creating payment link:', error);
            // Handle error (show error message to user)
        }
    };

    const handleClose = () => {
        setIsDialogOpen(false);

    };


    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className="ml-auto gap-1">Create Payment Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Payment link</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USDC">USDC</SelectItem>

                                </SelectContent>
                            </Select>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount"
                            />
                        </div>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="fullName"
                                checked={collectFullName}
                                onCheckedChange={(checked) => setCollectFullName(checked as boolean)}
                            />
                            <label htmlFor="fullName">Collect full name</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="email"
                                checked={collectEmail}
                                onCheckedChange={(checked) => setCollectEmail(checked as boolean)}
                            />
                            <label htmlFor="email">Collect email</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="address"
                                checked={collectAddress}
                                onCheckedChange={(checked) => setCollectAddress(checked as boolean)}
                            />
                            <label htmlFor="address">Collect address</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="phoneNumber"
                                checked={collectPhoneNumber}
                                onCheckedChange={(checked) => setCollectPhoneNumber(checked as boolean)}
                            />
                            <label htmlFor="phoneNumber">Collect phone number</label>
                        </div>
                    </div>
                    <Button onClick={handleCreate} className="w-full">Create</Button>
                </DialogContent>
            </Dialog>
            {dialogLink && (
                <SharePaymentLinkDialog
                    isOpened={dialogLink !== null}
                    paymentLink={dialogLink.url}
                />
            )}
        </>
    );
};

export default PaymentLinkModal;