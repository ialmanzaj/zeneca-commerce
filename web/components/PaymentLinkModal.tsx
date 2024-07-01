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
import { prisma } from "@/lib/prisma";
import { usePrivy } from "@privy-io/react-auth";

interface PaymentLink {
    currency: string;
    amount: number;
    title: string;
    description?: string;
    collectFullName: boolean;
    collectEmail: boolean;
    collectAddress: boolean;
    collectPhoneNumber: boolean;
}

interface PaymentLinkResponse {
    currency: string;
    amount: number;
    title: string;
    url: string;
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
    const [dialogLink, setDialogLink] = useState<PaymentLinkResponse | null>(null);

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            currency: "USDC",
            amount: 0,
            title: "",
            description: "",
            collectFullName: false,
            collectEmail: false,
            collectAddress: false,
            collectPhoneNumber: false,
        }
    });
    const { user } = usePrivy();
    console.log("user", user?.id);

    const onSubmit = async (data: FormData) => {
        try {
            const merchantId = user?.id.split(":")[2];
            console.log("merchantId", merchantId);
            const response = await fetch('/api/payment-links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, merchantId: user?.id.split(":")[2] }),
            });

            if (response.ok) {
                setIsDialogOpen(false);
                const createdLink = await response.json();
                setDialogLink(createdLink);
                console.log('Payment link created:', createdLink);
            } else {
                console.error('Failed to create payment link');
            }
        } catch (error) {
            console.error('Error creating payment link:', error);
        }
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
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
                                {...register("amount", { valueAsNumber: true })}
                                placeholder="Amount"
                            />
                        </div>
                        <Input
                            {...register("title")}
                            placeholder="Title"
                        />
                        <Textarea
                            {...register("description")}
                            placeholder="Description (optional)"
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="fullName"
                                checked={collectFullName}
                                {...register("collectFullName")}
                            />
                            <label htmlFor="fullName">Collect full name</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="email"
                                checked={collectEmail}
                                {...register("collectEmail")}
                            />
                            <label htmlFor="email">Collect email</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="address"
                                checked={collectAddress}
                                {...register("collectAddress")}
                            />
                            <label htmlFor="address">Collect address</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="phoneNumber"
                                checked={collectPhoneNumber}
                                {...register("collectPhoneNumber")}
                            />
                            <label htmlFor="phoneNumber">Collect phone number</label>
                        </div>
                        <Button type="submit" className="w-full">Create</Button>
                    </form>
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