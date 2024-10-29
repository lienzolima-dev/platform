import { Google } from "arctic";
import { getGoogleClientId, getGoogleClientSecret } from "../../utils/env";
import { baseUrl } from "../../utils/global";

const GOOGLE_CLIENT_ID = getGoogleClientId();
const GOOGLE_CLIENT_SECRET = getGoogleClientSecret();

export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  baseUrl.concat("/login/google/callback"),
);
