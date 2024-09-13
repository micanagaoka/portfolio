export const config = {
  matcher: '/(.*)'
}

export default function middleware(req) {
  const auth = req.headers.get('authorization');
  
  if (auth) {
    const [username, password] = atob(auth.split(' ')[1]).split(':');
    
    if (username === 'your-username' && password === 'your-password') {
      return new Response(null, { status: 200 });
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}
