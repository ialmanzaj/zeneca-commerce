import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialMerchants = [
  {
    id: "merchant_113063cc11fc2f6c",
    name: "Isaac Almanza",
    address: "0x1234567890",
    createdAt: "2024-06-28T22:38:09.770Z",
  },
];
const initialPaymentLinks = [
  {
    url: "/pay/link_fcda7b9e1697c4ab",
    currency: "USDC",
    amount: 20,
    title: "Pago de servicios",
    description: "pago de servicios de internet de la empresa XYZ",
    merchant: {
      connect: {
        id: "merchant_113063cc11fc2f6c",
        name: "Isaac Almanza",
      },
    },
    collectFullName: false,
    collectEmail: false,
    collectAddress: false,
    collectPhoneNumber: false,
    createdAt: "2024-06-28T22:38:09.770Z",
  },
  {
    url: "/pay/link_113063cc11fc2f6c",
    currency: "USDC",
    amount: 1,
    title: "Pago de servicios",
    description: "pago de servicios de internet de la empresa XYZ",
    merchant: {
      connect: {
        id: "merchant_113063cc11fc2f6c",
        name: "Isaac Almanza",
      },
    },
    collectFullName: false,
    collectEmail: false,
    collectAddress: false,
    collectPhoneNumber: false,
    createdAt: "2024-06-28T22:38:09.925Z",
  },
  {
    url: "/pay/link_567ec3b4dcdc2428",
    currency: "USDC",
    amount: 1,
    title: "Pago de servicios",
    description: "pago de servicios de internet de la empresa XYZ",
    merchant: {
      connect: {
        id: "merchant_113063cc11fc2f6c",
        name: "Isaac Almanza",
      },
    },
    collectFullName: false,
    collectEmail: false,
    collectAddress: false,
    collectPhoneNumber: false,
    createdAt: "2024-06-29T01:11:07.180Z",
  },
];

const seed = async () => {
  // clean up before the seeding (optional)
  //await prisma.paymentLink.deleteMany();

  // you could also use createMany
  // but it is not supported for databases
  // e.g. SQLite https://github.com/prisma/prisma/issues/10710
  for (const merchant of initialMerchants) {
    await prisma.merchant.create({
      data: merchant,
    });
  }
  for (const paymentLink of initialPaymentLinks) {
    await prisma.paymentLink.create({
      data: paymentLink,
    });
  }
};

seed();
