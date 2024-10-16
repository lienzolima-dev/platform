import { Google } from "arctic";

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID) throw new Error("GOOGLE_CLIENT_ID is not set");
if (!GOOGLE_CLIENT_SECRET) throw new Error("GOOGLE_CLIENT_SECRET is not set");

export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:4321/login/google/callback",
);
