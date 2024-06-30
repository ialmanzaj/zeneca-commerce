import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentLink = await prisma.paymentLink.findUnique({
      where: { id: params.id },
      include: { merchant: true }, // Include merchant data if needed
    });

    if (!paymentLink) {
      return new NextResponse("Payment link not found", { status: 404 });
    }

    return NextResponse.json(paymentLink);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
