import React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  company: string | null;
  description: string;
}

// Simplified component definition to help with TypeScript type inference.
export const EmailTemplate = ({
  name,
  email,
  company,
  description,
}: EmailTemplateProps) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    {company && <p><strong>Company:</strong> {company}</p>}
    <p><strong>Message:</strong></p>
    <p>{description}</p>
  </div>
);