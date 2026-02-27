import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phone, contactMethod } = await req.json();
    if (!phone || !contactMethod) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    console.log('New lead:', { phone, contactMethod, ts: new Date().toISOString() });
    // TODO: подключить CRM / Telegram bot
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
