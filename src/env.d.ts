/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user: typeof import("./db/schema").users.$inferSelect | null;
    session: import("lucia").Session | null;
    accessToken: string | null;
    refreshToken: string | null;
  }
}
