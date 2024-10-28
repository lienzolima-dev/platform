import { Google } from "arctic";
import { getGoogleClientId, getGoogleClientSecret } from "../../utils/env";

const GOOGLE_CLIENT_ID = getGoogleClientId();
const GOOGLE_CLIENT_SECRET = getGoogleClientSecret();

const PROD = import.meta.env.PROD;
const base = PROD ? "https://lienzolima.com" : "http://localhost:4321";

export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  base.concat("/login/google/callback"),
);
