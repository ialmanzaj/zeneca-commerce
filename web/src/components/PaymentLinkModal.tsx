import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

const PaymentLinkModal: React.FC = () => {
    const [currency, setCurrency] = useState("USDC");
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [collectFullName, setCollectFullName] = useState(false);
    const [collectEmail, setCollectEmail] = useState(false);
    const [collectAddress, setCollectAddress] = useState(false);
    const [collectPhoneNumber, setCollectPhoneNumber] = useState(false);

    const handleCreate = () => {
        // Here you would typically send the data to your backend
        console.log({
            currency,
            amount,
            title,
            description,
            collectFullName,
            collectEmail,
            collectAddress,
            collectPhoneNumber,
        });
        // Close the modal or show a success message
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Payment Link</Button>
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
                                <SelectItem value="ETH">ETH</SelectItem>
                                <SelectItem value="BTC">BTC</SelectItem>
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
    );
};

export default PaymentLinkModal;