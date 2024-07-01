import { NextResponse } from "next/server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function generateRandomId(): string {
  return `link_${crypto.randomBytes(8).toString("hex")}`;
}

export async function GET() {
  try {
    const links = await prisma.paymentLink.findMany({
      select: {
        id: true,
        url: true,
        title: true,
        amount: true,
        currency: true,
        description: true,
        createdAt: true,
      },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching payment links:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const randomId = generateRandomId();
    const newLink = await prisma.paymentLink.create({
      data: {
        id: randomId,
        url: `/pay/${randomId}`,
        ...body,
      },
    });
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 500 }
    );
  }
}
