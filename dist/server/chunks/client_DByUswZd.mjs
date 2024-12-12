import { Resend } from 'resend';
import { b as getResendApiKey } from './env_DfMdWqLj.mjs';

const resend = new Resend(getResendApiKey());

export { resend as r };
