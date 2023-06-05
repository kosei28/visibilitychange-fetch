import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/login') {
		return new Response(undefined, {
			headers: {
				'set-cookie': 'session=123; path=/; Samesite=Lax; HttpOnly'
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

		if (session === undefined) {
			return new Response(undefined, {
				status: 401
			});
		}

		return new Response(JSON.stringify({ session }), {
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	return resolve(event);
};
