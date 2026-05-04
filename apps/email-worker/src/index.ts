export interface Env {
	STORAGE: KVNamespace;
	EMAIL_WORKER_AUTH_SECRET: string;
	APP_URL: string;
}

export default {
	async email(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext) {
		const messageId = crypto.randomUUID();

		const rawContent = await new Response(message.raw).text();
		await env.STORAGE.put(messageId, rawContent, { expirationTtl: 604800 });

		const messageHeaders: Record<string, string> = {};
		message.headers.forEach((value, key) => {
			messageHeaders[key] = value;
		});

		const payload = {
			messageId,
			messageHeaders,
			to: message.to,
			from: message.from,
		};

		ctx.waitUntil(
			fetch(`${env.APP_URL}/api/email/new`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${env.EMAIL_WORKER_AUTH_SECRET}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}),
		);
	},
};
