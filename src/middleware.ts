import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // Auth routes are public
      if (pathname.startsWith('/api/auth') || pathname.startsWith('/login')) {
        return true;
      }

      // Everything else requires a valid session
      return !!token;
    },
  },
    pages: {
      signIn: '/login',
    },
});

export const config = {
  matcher: ['/((?!api/_next|_next/static|_next/image|favicon.ico|login|api/auth).*)'],
};
