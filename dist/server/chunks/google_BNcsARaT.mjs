import { Google } from 'arctic';
import { g as getGoogleClientId, a as getGoogleClientSecret } from './env_DfMdWqLj.mjs';
import { b as baseUrl } from './global_BIDG6M1E.mjs';

const GOOGLE_CLIENT_ID = getGoogleClientId();
const GOOGLE_CLIENT_SECRET = getGoogleClientSecret();
const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  baseUrl.concat("/login/google/callback")
);

export { google as g };
