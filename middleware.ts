import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/usercredits(.*)',
  '/userprofile(.*)',
  '/usertransformations(.*)',
]);
 
export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
 
    // Add custom logic to run before redirecting
    publicRoutes: ['/api/webhooks/clerk']
 
    return auth().redirectToSignIn();
  }
});
 
export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']};