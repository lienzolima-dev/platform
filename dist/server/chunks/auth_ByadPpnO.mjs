import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { d as db, j as sessions, u as users } from './db_DooF3xjr.mjs';

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: "true"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      googleId: attributes.google_id,
      username: attributes.username
    };
  }
});

export { lucia as l };
