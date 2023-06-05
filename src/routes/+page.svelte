<script lang="ts">
	import { browser } from '$app/environment';

	let session: string | undefined;

	if (browser) {
		init();

		window.addEventListener('visibilitychange', async () => {
			if (document.visibilityState === 'visible') {
				session = await getSession();
			}
		});
	}

	async function init() {
		session = await getSession();
	}

	async function login(secure: boolean) {
		if (secure) {
			await fetch('/securelogin');
		} else {
			await fetch('/login');
		}
		session = await getSession();
	}

	async function logout() {
		await fetch('/logout');
		session = undefined;
	}

	async function getSession() {
		try {
			const res = await fetch('/session');
			const data = (await res.json()) as { session?: string };
			return data.session;
		} catch (e) {
			alert(e);
		}
	}
</script>

<h1>visibilitychange fetch</h1>

{#if session}
	<p>Session: {session}</p>
	<button on:click={logout}>Logout</button>
{:else}
	<button
		on:click={() => {
			login(false);
		}}
	>
		Login
	</button>
	<button
		on:click={() => {
			login(true);
		}}
	>
		Secure Login
	</button>
{/if}
