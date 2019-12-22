from telegram.ext import Updater, CommandHandler
import requests
import json
import logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                     level=logging.INFO)
updater = Updater(token='992019453:AAFcLKDXFXmpAEBhyNJfrup7ExXyEm7uhkI', use_context=True)

def start(update, context):
	context.bot.send_message(chat_id=update.effective_chat.id, text="Getting the latest data out of the oven for you, please wait!")
	res = getApi();
	totalForks = 0
	for i in res:
		# logging.info(i)
		totalForks +=  i['forks']
		# logging.info(i['name'])
	# logging.info(totalForks);
	context.bot.send_message(chat_id=update.effective_chat.id, text="Number of forks for all repos of fedora-infra is " + str(totalForks))

def forkCount(update, context):
	# logging.info(update.message.text);
	text = update.message.text.split();
	repo = text[1];
	res = getApi();
	for i in res:
		if(i['name'] == repo):
			return context.bot.send_message(chat_id=update.effective_chat.id, text="Number of forks for {} is {}".format(repo, str(i['forks'])))
		# logging.info(i['name'])


def getApi():
	res = requests.get('https://api.github.com/orgs/fedora-infra/repos')
	res = json.loads(res.text)
	return res;

dispatcher = updater.dispatcher
dispatcher.add_handler(CommandHandler('start', start))
dispatcher.add_handler(CommandHandler('forks', forkCount))
updater.start_polling()
logging.info('Ready!');
