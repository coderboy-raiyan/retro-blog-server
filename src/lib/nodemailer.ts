import nodemailer from 'nodemailer';
import { User } from '../../generated/prisma/client';
import config from '../config';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
});

export async function sendEmail(verificationUrl: string, user: Partial<User>) {
    try {
        await transporter.sendMail({
            from: '"Retro Team" <retroblog@gmail.com>',
            to: `${user?.email}`,
            subject: 'Confirm your identity',
            html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f6f9fc; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                        <tr>
                            <td style="padding: 40px 40px 20px 40px; text-align: left;">
                                <div style="font-size: 24px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px;">Retro Blog.</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 40px 40px 40px;">
                                <h1 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 22px; font-weight: 600; line-height: 30px;">Verify your email address</h1>
                                <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px; line-height: 24px;">To finish setting up your account, please confirm that this is your email address by clicking the button below.</p>
                                
                                <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                    <tr>
                                        <td align="center" bgcolor="#000000" style="border-radius: 6px;">
                                            <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 600;">Verify Email</a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 10px 0; color: #718096; font-size: 14px;">Or use this code:</p>
                                <div style="font-family: monospace; font-size: 24px; font-weight: 700; color: #2d3748; letter-spacing: 2px;">${verificationUrl}</div>
                                
                                <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                    <p style="margin: 0; color: #a0aec0; font-size: 12px; line-height: 18px;">If you didn't request this, you can safely ignore this email. This link will expire in 24 hours.</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; margin-top: 20px;">
                        <tr>
                            <td align="center" style="color: #a0aec0; font-size: 12px;">
                                &copy; 2025 Retro Blog. All rights reserved. <br>
                                Dhaka, Bangladesh
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
        });
    } catch (err) {
        console.error('Error while sending mail', err);
    }
}
