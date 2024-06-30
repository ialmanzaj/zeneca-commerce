import { NextResponse, NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface PaymentLink {
  id: string;
  url: string;
  currency: string;
  amount: number;
  title: string;
  description?: string;
  collectFullName: boolean;
  collectEmail: boolean;
  collectAddress: boolean;
  collectPhoneNumber: boolean;
  createdAt: string;
}

interface PaymentLinksData {
  links: PaymentLink[];
}

const dataFilePath = path.join(process.cwd(), "data", "paymentLinks.json");

async function getPaymentLinks(): Promise<PaymentLinksData> {
  try {
    const jsonData = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading or parsing paymentLinks.json:", error);
    throw new Error("Failed to read payment links data");
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getPaymentLinks();
    const paymentLink = data.links.find((link) => link.id === params.id);

    if (!paymentLink) {
      console.log("Payment link not found");
      return new NextResponse("Payment link not found", { status: 404 });
    }

    return NextResponse.json(paymentLink);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
