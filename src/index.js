// ENV VARIABLES
require('dotenv').config();
const {
	BOT_TOKEN,
	PORT,
	// TODO: CHAT_ID will be a list of chat ids persisted in a key-value store.
	CHAT_ID,
} = process.env;

// DEPENDENCIES
const Telegraf = require('telegraf');
const express = require('express');

// MULTI PART UPLOAD
const multer = require('multer');
const upload = multer();

// TELEGRAF BOT
const bot = new Telegraf(BOT_TOKEN);
bot.start(ctx => ctx.reply('Hello there!'));
bot.help(ctx => ctx.reply('Help message'));
const photo = { url: 'https://picsum.photos/200/300/?random' };
bot.command('photo', ctx => ctx.replyWithPhoto(photo));
bot.launch().catch(console.error);

// EXPRESS APP
const app = express();
app.post('/photo', upload.single('photo'), (req, res, next) => {
	const {
		buffer,
		originalname,
	} = req.file;

	bot.telegram.sendPhoto(CHAT_ID, {
		source: buffer,
	})
	.then(() => res.send(`Image "${originalname}" sent!`))
	.catch(next);
});

app.listen(PORT, () => {
	console.log(`Express listening in port ${PORT}`);
});
