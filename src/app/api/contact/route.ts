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

// Template Constants
const LOGO_URL = "https://nirvanawise.in/images/Untitled_design__15_-removebg-preview.png";
const BRAND_COLOR = "#a9742a";
const BG_LIGHT = "#f5f7fb";
const CALENDLY_URL = "https://calendly.com/nirvanawealthplanner-info/new-meeting";

function getAdminTemplate(name: string, email: string, message: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f5f5f7; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 520px; background-color: #ffffff; border-radius: 14px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04); overflow: hidden;">
                        <tr>
                            <td style="padding: 40px 40px 0 40px; text-align: center;">
                                <img src="${LOGO_URL}" alt="Nirvana Wise Wealth" style="max-width: 100px; height: auto;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px 40px 40px 40px;">
                                <h1 style="color: #111111; font-size: 20px; font-weight: 600; margin: 0 0 24px 0; text-align: left; letter-spacing: -0.3px;">New Inquiry</h1>
                                
                                <div style="margin-bottom: 24px;">
                                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                                    <p style="margin: 0; font-size: 15px; color: #111111;">${name}</p>
                                </div>
                                
                                <div style="margin-bottom: 24px;">
                                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                    <p style="margin: 0; font-size: 15px; color: #111111;"><a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email}</a></p>
                                </div>
                                
                                <div style="margin-bottom: 0;">
                                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                                    <div style="background-color: #f2f2f2; border-radius: 8px; padding: 16px;">
                                        <p style="margin: 0; font-size: 15px; color: #333333; line-height: 1.5; white-space: pre-wrap;">${message}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    
                    <div style="max-width: 520px; margin: 0 auto; padding-top: 24px; text-align: center;">
                        <p style="color: #999999; font-size: 12px; margin: 0;">Nirvana Wise Wealth &mdash; Build wealth, the wise way</p>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

function getUserTemplate(name: string, message: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f5f5f7; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 520px; background-color: #ffffff; border-radius: 14px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04); overflow: hidden;">
                        <tr>
                            <td style="padding: 40px 40px 0 40px; text-align: center;">
                                <img src="${LOGO_URL}" alt="Nirvana Wise Wealth" style="max-width: 100px; height: auto;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px 40px 40px 40px;">
                                <h1 style="color: #111111; font-size: 22px; font-weight: 600; margin: 0 0 16px 0; text-align: left; letter-spacing: -0.4px;">Hi ${name},</h1>
                                
                                <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Thank you for getting in touch with us.</p>
                                <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">We have received your message and our team will be reviewing it shortly. We aim to respond to all inquiries as quickly as possible.</p>
                                
                                <div style="background-color: #f2f2f2; border-radius: 8px; padding: 16px; margin-bottom: 32px;">
                                    <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.5; white-space: pre-wrap;">${message}</p>
                                </div>
                                
                                <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">If you'd like to speak with an advisor immediately, you can schedule a dedicated time with us.</p>
                                
                                <div style="text-align: left;">
                                    <a href="${CALENDLY_URL}" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 15px; font-weight: 500; text-decoration: none; padding: 12px 20px; border-radius: 8px; text-align: center;">Schedule a Call</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                    
                    <div style="max-width: 520px; margin: 0 auto; padding-top: 24px; text-align: center;">
                        <p style="color: #999999; font-size: 12px; margin: 0;">Nirvana Wise Wealth &mdash; Build wealth, the wise way</p>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

        // 3. Email Templates
        // A) Admin Email
        const adminMailOptions = {
            from: `"Nirvana Wise Wealth" <${zohoEmail}>`,
            to: zohoEmail,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: getAdminTemplate(name, email, message)
        };

        // B) Auto Reply to User
        const userMailOptions = {
            from: `"Nirvana Wise Wealth" <${zohoEmail}>`,
            to: email,
            subject: "We received your message",
            html: getUserTemplate(name, message)
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
