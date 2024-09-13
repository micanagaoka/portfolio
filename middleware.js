export const config = {
  matcher: '/(.*)',
};

export default async function middleware(req) {
  const auth = req.headers.get('authorization');
  
  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    
    if (scheme === 'Basic') {
      const [providedUsername, providedPassword] = atob(encoded).split(':');
      
      if (providedUsername === username && providedPassword === password) {
        return new Response('Authenticated', { status: 200 });
      }
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}
