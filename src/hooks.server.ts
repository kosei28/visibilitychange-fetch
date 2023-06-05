import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/login') {
		return new Response(undefined, {
			headers: {
				'set-cookie': 'session=123; path=/; Samesite=Lax; HttpOnly'
			}
		});
	} else if (event.url.pathname === '/securelogin') {
		return new Response(undefined, {
			headers: {
				'set-cookie': 'session=123; path=/; Samesite=Lax; HttpOnly; Secure'
			}
		});
	} else if (event.url.pathname === '/logout') {
		return new Response(undefined, {
			headers: {
				'set-cookie': 'session=; path=/; Max-Age=0'
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
