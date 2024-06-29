
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

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

const dataFilePath = path.join(process.cwd(), 'data', 'paymentLinks.json');

async function getPaymentLinks(): Promise<PaymentLinksData> {
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

async function savePaymentLinks(data: PaymentLinksData): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

function generateRandomId(): string {
  return `link_${crypto.randomBytes(8).toString('hex')}`;
}


export async function GET() {
  const data = await getPaymentLinks();
  return NextResponse.json(data.links);
}

export async function POST(request: Request) {
  const data = await getPaymentLinks();
  const body = await request.json();
  const randomId = generateRandomId();
  const newLink: PaymentLink = {
    id: randomId,
    url: `/pay/${randomId}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  data.links.push(newLink);
  await savePaymentLinks(data);
  return NextResponse.json(newLink, { status: 201 });
}