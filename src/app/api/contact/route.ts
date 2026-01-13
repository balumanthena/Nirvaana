import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

// Explicitly load .env.local to ensure variables are present
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Debug logging
        const zohoPassword = process.env.ZOHO_APP_PASSWORD;
        console.log("Debug: API Route hit");
        console.log("Debug: CWD =", process.cwd());
        console.log("Debug: ZOHO_APP_PASSWORD type =", typeof zohoPassword);
        console.log("Debug: ZOHO_APP_PASSWORD length =", zohoPassword ? zohoPassword.length : "undefined");
        console.log("Debug: NODE_ENV =", process.env.NODE_ENV);

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'info@nirvanawealthplanner.com',
                pass: process.env.ZOHO_APP_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: '"Nirvana Wealth Planner Website" <info@nirvanawealthplanner.com>',
            to: 'info@nirvanawealthplanner.com',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message:
${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: `Failed to send message: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}
