export function middleware(request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = atob(base64Credentials).split(':');
        const username = credentials[0];
        const password = credentials[1];

        const validUser = process.env.BASIC_AUTH_USER;
        const validPass = process.env.BASIC_AUTH_PASS;

        if (username === validUser && password === validPass) {
            return new Response(null, { status: 200 });
        }
    }
    return new Response('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}
