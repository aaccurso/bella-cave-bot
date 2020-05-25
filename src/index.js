require('dotenv').config();
const Telegraf = require('telegraf');

const PhotoURL = 'https://picsum.photos/200/300/?random';

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply('Hello there!'));
bot.help(ctx => ctx.reply('Help message'));
bot.command('photo', ctx => ctx.replyWithPhoto({ url: PhotoURL }));
bot.launch();
