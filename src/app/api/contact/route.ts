import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        console.log('ZOHO_APP_PASSWORD defined:', !!process.env.ZOHO_APP_PASSWORD);
        if (process.env.ZOHO_APP_PASSWORD) {
            console.log('ZOHO_APP_PASSWORD length:', process.env.ZOHO_APP_PASSWORD.length);
        } else {
            console.error('ZOHO_APP_PASSWORD is MISSING in API route');
        }

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
