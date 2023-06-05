import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/login') {
		return new Response(undefined, {
			status: 302,
			headers: {
				location: '/',
				'set-cookie': 'session=123; path=/; Samesite=Lax; HttpOnly;'
			}
		});
	} else if (event.url.pathname === '/logout') {
		return new Response(undefined, {
			headers: {
				'set-cookie': 'session=; path=/; Samesite=Lax; HttpOnly; Max-Age=0'
			}
		});
	} else if (event.url.pathname === '/session') {
		const session = event.cookies.get('session');

		console.log('session:', session);

		return new Response(JSON.stringify({ session }), {
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	return resolve(event);
};
