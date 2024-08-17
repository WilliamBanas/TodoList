import { lucia } from "$lib/lucia";
import type { Handle } from "@sveltejs/kit";

interface Locals {
  user: any;
  session: any;
}

type MyLocals = Locals & {
  session: any;
}

export const handle: Handle = async ({ event, resolve }) => {
 const sessionId = event.cookies.get(lucia.sessionCookieName);
 if (!sessionId) {
  (event.locals as MyLocals).user = null;
  (event.locals as MyLocals).session = null;
  return resolve(event);
 }

 const { session, user } = await lucia.validateSession(sessionId);
 if (session && session.fresh) {
  const sessionCookie = lucia.createSessionCookie(session.id);
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
   path: ".",
   ...sessionCookie.attributes
  });
 }
 if (!session) {
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
   path: ".",
   ...sessionCookie.attributes
  });
 }
 (event.locals as MyLocals).user = user;
 (event.locals as MyLocals).session = session;
 return resolve(event);
};