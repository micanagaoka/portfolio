import { NextResponse } from 'next/server';

export const config = {
  matcher: '/(.*)'
}

export default function middleware(req) {
  const auth = req.headers.get('authorization');
  
  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;

  if (auth) {
    const [providedUsername, providedPassword] = atob(auth.split(' ')[1]).split(':');
    
    if (providedUsername === username && providedPassword === password) {
      return NextResponse.next();
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}