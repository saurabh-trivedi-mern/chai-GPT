import { authMiddleware } from "@clerk/nextjs";
 
import createMiddleware from "next-intl/middleware";
 
const intlMiddleware = createMiddleware({
  locales: ['en','fr','it','de','ja','hi','zh','es','pa','ta','te'],
  defaultLocale: 'en'
});
 
export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
 
  // Ensure that locale specific sign-in pages are public
  publicRoutes: ['/en', '/fr','/it','/de','/ja','/hi','/zh','/es','/pa','/ta','/te', '/:locale/sign-in', '/:locale/sign-up'],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", '/en', '/fr','/it','/de','/ja','/hi','/zh','/es','/pa','/ta','/te', "/(api|trpc)(.*)",],
};


