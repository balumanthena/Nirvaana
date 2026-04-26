import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // 1. Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        const zohoEmail = process.env.ZOHO_EMAIL || 'info@nirvanawise.in';
        const zohoPass = process.env.ZOHO_PASS || process.env.ZOHO_APP_PASSWORD;

        // 2. Transporter Setup with Fallback
        const createTransporter = async (port: number, secure: boolean) => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.in',
                port,
                secure,
                auth: {
                    user: zohoEmail,
                    pass: zohoPass,
                },
            });
            await transporter.verify();
            return transporter;
        };

        let transporter;
        try {
            // Primary: Port 587
            transporter = await createTransporter(587, false);
        } catch (error) {
            console.log('Port 587 failed, falling back to 465...', error);
            try {
                // Fallback: Port 465
                transporter = await createTransporter(465, true);
            } catch (fallbackError) {
                console.error('SMTP Setup failed on both ports:', fallbackError);
                throw new Error('SMTP connection failed');
            }
        }

        // 3. Email Templates
        // A) Admin Email
        const adminMailOptions = {
            from: `"Nirvana Wise Wealth" <${zohoEmail}>`,
            to: zohoEmail,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #0f172a; padding: 20px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0;">New Contact Inquiry</h2>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #334155; margin-bottom: 20px;">You have received a new message from the website contact form.</p>
                        
                        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
                            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        
                        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Message Content</h3>
                        <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `
        };

        // B) Auto Reply to User
        const userMailOptions = {
            from: `"Nirvana Wise Wealth" <${zohoEmail}>`,
            to: email,
            subject: "We received your message",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #0f172a; padding: 20px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0;">Nirvana Wise Wealth</h2>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <h3 style="color: #0f172a; margin-top: 0;">Hello ${name},</h3>
                        <p style="color: #334155; line-height: 1.6;">Thank you for reaching out to us. We have successfully received your message and our team will get back to you shortly.</p>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 25px 0;">
                            <p style="font-size: 14px; color: #64748b; margin-top: 0; margin-bottom: 10px; text-transform: uppercase; font-weight: bold;">Your Message:</p>
                            <p style="color: #475569; line-height: 1.6; margin: 0; font-style: italic; white-space: pre-wrap;">"${message}"</p>
                        </div>
                        
                        <p style="color: #334155; line-height: 1.6;">If you need immediate assistance, please feel free to call us at our office.</p>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                        <p style="color: #64748b; font-size: 14px; margin: 0;">Best Regards,<br><strong>The Nirvana Wise Wealth Team</strong></p>
                    </div>
                </div>
            `
        };

        // 4. Send Emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Contact Form Error:', error);
        return NextResponse.json(
            { error: 'Failed to process your request. Please try again later.' },
            { status: 500 }
        );
    }
}
