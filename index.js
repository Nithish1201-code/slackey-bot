require("dotenv").config();

const { App } = require("@slack/bolt");

console.log('SLACK_APP_TOKEN set?', !!process.env.SLACK_APP_TOKEN);
console.log('SLACK_BOT_TOKEN set?', !!process.env.SLACK_BOT_TOKEN);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/slackey-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();