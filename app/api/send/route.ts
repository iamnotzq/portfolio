import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_EMAIL;

export async function POST(req: NextRequest) {
  // Check if your environment variables are set
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API key is not set in .env.local');
    return NextResponse.json({ error: 'Server configuration error: Missing Resend API key.' }, { status: 500 });
  }
  if (!toEmail) {
    console.error('Contact email is not set in .env.local');
    return NextResponse.json({ error: 'Server configuration error: Missing contact email address.' }, { status: 500 });
  }

  try {
    // Parse the data sent from your contact form
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string | null;
    const description = formData.get('description') as string;
    const attachment = formData.get('attachment') as File | null;

    // Validate that required fields are not empty
    if (!name || !email || !description) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Prepare attachment if it exists
    let attachmentBuffer;
    if (attachment) {
        const bytes = await attachment.arrayBuffer();
        attachmentBuffer = Buffer.from(bytes);
    }

    // Use Resend to send the email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // This 'from' address must be from a domain you've verified with Resend.
      to: [toEmail], // The email address you want to receive messages at.
      subject: `New message from ${name}`,
      // Here we use the clean React component for the email body
      react: EmailTemplate({ name, email, company, description }),
      // Add attachments if they exist
      attachments: attachmentBuffer ? [{ filename: attachment?.name, content: attachmentBuffer }] : [],
    });

    // Handle any errors from the Resend API
    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email.', 'details': error }, { status: 500 });
    }

    // If successful, send back a success message
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (err) {
    console.error('Error processing request:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}