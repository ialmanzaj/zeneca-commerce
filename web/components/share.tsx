import React, { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2 } from "lucide-react";

interface PaymentLink {
    currency: string;
    amount: number;
    title: string;
    description?: string;
    url: string;
}

interface SharePaymentLinkDialogProps {
    isOpened: boolean;
    paymentLink: PaymentLink;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SharePaymentLinkDialog: React.FC<SharePaymentLinkDialogProps> = ({ isOpened, paymentLink }) => {
    const paymentLinkUrl = `${API_URL}${paymentLink.url}`;

    const [isOpen, setIsOpen] = useState(isOpened);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(paymentLinkUrl);
        // Optionally, show a toast notification here
    };

    const shareLink = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Payment Link',
                text: 'Here is your payment link',
                url: paymentLinkUrl,
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support navigator.share
            copyToClipboard();
        }
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share Payment Link</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2 my-4">
                    <Input value={paymentLinkUrl} readOnly className="flex-grow" />
                    <Button onClick={copyToClipboard} variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                    </Button>
                </div>
                <DialogFooter>
                    <Button onClick={shareLink} variant="default">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <Button onClick={onClose} variant="outline">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SharePaymentLinkDialog;