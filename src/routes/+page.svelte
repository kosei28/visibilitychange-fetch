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

	async function getSession(isRetry = false): Promise<string | undefined> {
		try {
			const res = await fetch('/session');
			try {
				const data = (await res.json()) as { session?: string };
				return data.session;
			} catch (e) {
				console.log(e);
				return undefined;
			}
		} catch {
			if (!isRetry) {
				return await getSession(true);
			} else {
				return undefined;
			}
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
