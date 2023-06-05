<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let session: string | undefined;

	if (browser) {
		getSession();

		window.addEventListener('visibilitychange', async () => {
			if (document.visibilityState === 'visible') {
				await getSession();
			}
		});
	}

	async function login() {
		await goto('/login');
	}

	async function logout() {
		await fetch('/logout');
		session = undefined;
	}

	async function getSession() {
		try {
			const res = await fetch('/session');
			const data = (await res.json()) as { session?: string };
			session = data.session;
		} catch (e) {
			console.log(e);
		}
	}
</script>

<h1>visibilitychange fetch</h1>

{#if session}
	<p>Session: {session}</p>
	<button on:click={logout}>Logout</button>
{:else}
	<button on:click={login}>Login</button>
{/if}
