import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        amount: true,
        currency: true,
        merchantAddress: true,
        customerAddress: true,
        paymentLink: true,
        createdAt: true,
      },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Check for idempotency key
    if (!body.idempotencyKey) {
      return NextResponse.json(
        { error: "Idempotency key is required" },
        { status: 400 }
      );
    }

    // Check for existing transaction with the same idempotency key
    const existingTransaction = await prisma.transaction.findUnique({
      where: { idempotencyKey: body.idempotencyKey },
    });

    if (existingTransaction) {
      // Return the existing transaction if found
      return NextResponse.json(existingTransaction, { status: 200 });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: body.amount,
        currency: body.currency,
        merchantAddress: body.merchantAddress,
        customerAddress: body.customerAddress,
        idempotencyKey: body.idempotencyKey,
        paymentLink: { connect: { id: body.paymentLinkId } },
      },
    });
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
