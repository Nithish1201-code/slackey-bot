require("dotenv").config();

const { App } = require("@slack/bolt");

const axios = require("axios");

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

app.command("/slackey-time", async ({ ack, respond }) => {
    await ack();
    const currentTime = new Date().toLocaleString();
    await respond({ text: `Current time is: ${currentTime}` });
});

app.command("/slackey-roll", async ({ ack, respond }) => {
    await ack();
    const roll = Math.floor(Math.random() * 6) + 1; 
    await respond({ text: `You rolled a ${roll}!` });
});

app.command("/slackey-coin", async ({ ack, respond }) => {
    await ack();
    const coin = Math.random() < 0.5 ? 'Heads' : 'Tails';
    await respond({ text: `You flipped a coin and got: ${coin}` })
});

app.command("/slackey-8ball", async ({ ack, respond}) => {
    await ack();
    const responses = [
        "It is certain.",
        "Without a doubt.",
        "You may rely on it.",
        "Yes, definetly.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Signs point to no.",
        "NAH.",
        "OFC",
        "Dont count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    await respond({ text: `Magic 8 ball says: ${response}` });
});

app.command("/slackey-joke", async ({ ack, respond}) => {
    await ack();
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = response.data;
        await respond({ text: `Here's a joke for you: ${joke.setup}\n\n${joke.punchline}` });
    } catch (error) {
        console.error('Error fetching joke:', error);
        await respond({ text: "Sorry, I couldn't fetch a joke right now." });
    }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();