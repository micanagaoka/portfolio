import { NextResponse } from 'next/server';

export const config = {
  matcher: '/(.*)',
};

export default function middleware(req) {
  const auth = req.headers.get('authorization');
  
  if (auth) {
    const [username, password] = atob(auth.split(' ')[1]).split(':');
    
    const expectedUsername = process.env.BASIC_AUTH_USERNAME;
    const expectedPassword = process.env.BASIC_AUTH_PASSWORD;
    
    if (username === expectedUsername && password === expectedPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}