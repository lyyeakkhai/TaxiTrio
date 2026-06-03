import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const isCustomerRoute = createRouteMatcher(['/(.*)/customer(.*)']);
const isDriverRoute = createRouteMatcher(['/(.*)/driver(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const authObj = await auth();
  
  if (isCustomerRoute(req)) {
    if (!authObj.userId) {
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }
    // @ts-ignore
    const role = authObj.sessionClaims?.metadata?.role || authObj.sessionClaims?.publicMetadata?.role;
    if (role !== 'customer') {
      return Response.redirect(new URL('/', req.url));
    }
  }

  if (isDriverRoute(req)) {
    if (!authObj.userId) {
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }
    // @ts-ignore
    const role = authObj.sessionClaims?.metadata?.role || authObj.sessionClaims?.publicMetadata?.role;
    if (role !== 'driver') {
      return Response.redirect(new URL('/', req.url));
    }
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};
