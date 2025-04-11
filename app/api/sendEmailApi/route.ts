import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message } = await req?.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields3333333333" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sibypriya2010@gmail.com",
        pass: "emcc fvrd supn fxnr",
      },
    });

    await transporter.sendMail({
      from: "bibelor814@bankrau.com",
      to: to,
      subject: subject,
      text: typeof message === "string" ? message : JSON.stringify(message, null, 2), 
    });

    return NextResponse.json({ success: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
