export function getResendApiKey(): string {
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  if (!resendApiKey) throw new Error("RESEND_API_KEY is not set");

  return resendApiKey;
}

export function getGoogleClientId(): string {
  const googleClientId = import.meta.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) throw new Error("GOOGLE_CLIENT_ID is not set");

  return googleClientId;
}

export function getGoogleClientSecret(): string {
  const googleClientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;
  if (!googleClientSecret) throw new Error("GOOGLE_CLIENT_SECRET is not set");

  return googleClientSecret;
}

export function getWebsiteUrl(): string {
  const websiteUrl = import.meta.env.WEBSITE_URL;
  if (!websiteUrl) throw new Error("WEBSITE_URL is not set");

  return websiteUrl;
}
