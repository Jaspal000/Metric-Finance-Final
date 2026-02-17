// =============================================================================
// Metric Finance — Email Service
// =============================================================================
// Replace the placeholder endpoint URLs below with your own service IDs.
// Supported services: Formspree, Resend, SendGrid, Mailchimp, or any REST API.
// =============================================================================

const FORMSPREE_URL = 'https://formspree.io/f/xykdjove';

const ENDPOINTS = {
  // "Save Results" — sends calculator results to the user's email
  saveResults: FORMSPREE_URL,

  // "Subscribe" — newsletter / updates signup
  subscribe: FORMSPREE_URL,

  // "Contact" — contact form submissions
  contact: FORMSPREE_URL,
} as const;

export type EmailType = keyof typeof ENDPOINTS;

export interface EmailPayload {
  email: string;
  [key: string]: unknown;
}

export interface EmailResult {
  ok: boolean;
  message: string;
}

/**
 * Dispatch an email via the configured endpoint.
 *
 * @param type    – Which form is sending (saveResults | subscribe | contact)
 * @param payload – Must include `email`; may include any extra fields
 */
export async function sendEmail(
  type: EmailType,
  payload: EmailPayload,
): Promise<EmailResult> {
  const url = ENDPOINTS[type];

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _formType: type, ...payload }),
    });

    if (res.ok) {
      return { ok: true, message: getSuccessMessage(type) };
    }

    // Surface server-side validation errors when available
    const body = await res.json().catch(() => null);
    const detail = body?.error ?? body?.message ?? `Error ${res.status}`;
    return { ok: false, message: `Something went wrong: ${detail}. Please try again.` };
  } catch {
    return {
      ok: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

function getSuccessMessage(type: EmailType): string {
  switch (type) {
    case 'saveResults':
      return 'Results sent to your inbox!';
    case 'subscribe':
      return "You're on the list! Welcome to Metric Finance.";
    case 'contact':
      return 'Message sent! We will get back to you shortly.';
  }
}
