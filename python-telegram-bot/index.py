from telegram.ext import Updater, CommandHandler
import requests
import json
import logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                     level=logging.INFO)
updater = Updater(token='992019453:AAFcLKDXFXmpAEBhyNJfrup7ExXyEm7uhkI', use_context=True)

def start(update, context):
	context.bot.send_message(chat_id=update.effective_chat.id, text="Getting the latest data out of the oven for you, please wait!")
	res = requests.get('https://api.github.com/orgs/fedora-infra/repos')
	res = json.loads(res.text)
	totalForks = 0
	for i in res:
		# logging.info(i)
		totalForks +=  i['forks']
		# logging.info(i['name'])
	# logging.info(totalForks);
	context.bot.send_message(chat_id=update.effective_chat.id, text="Number of forks for all repos of fedora-infra is " + str(totalForks))

dispatcher = updater.dispatcher
start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)
updater.start_polling()
logging.info('Ready!');
