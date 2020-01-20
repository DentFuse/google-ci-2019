import tkinter, json, random

elem = json.load(open('map.json', 'r'))
reverse = {}

for i in elem:
	reverse[elem[str(i)]] = str(i)

# print(reverse)

m = tkinter.Tk()
m.title('Periodic Games') 
lifes = 5

def submit():
	global lifes, isSkip
	answer = e1.get()
	s = tkinter.Toplevel(m)
	if(e1.get() == anskey):
		tkinter.Label(s, text='Correct!').grid(row=0)
		tkinter.Button(s, text='Continue...', width=15, command=s.destroy).grid(row=1)
		renderGame()
	else:
		lifes -= 1
		if(not answer in reverse and not isSkip): result = 'You discovered a new element!'
		else:
			if(isSkip): result = 'The answer is ' + anskey
			else : result = 'You entered the symbol of the ' + reverse[answer] + 'th element, please try again.'
		tkinter.Label(s, text=result).grid(row=1)
		if(lifes <= 0):
			tkinter.Label(s, text='Wrong! You Lost!').grid(row=0)
			tkinter.Button(s, text='Exit', width=15, command=m.destroy).grid(row=2)
			e1.config(state='disabled')
			b1.config(state='disabled')
		else:
			tkinter.Label(s, text='Wrong!').grid(row=0)
			tkinter.Button(s, text='Try again? You have ' + str(lifes) + ' lifes left.', command=s.destroy).grid(row=2)
			isSkip = False;
			renderGame()

def renderGame():
	global e1, anskey, b1
	atomic = random.randrange(0, 119, 1)
	anskey = elem[str(atomic)]
	# print(anskey)
	tkinter.Label(m, text='You have ' + str(lifes) + ' lifes left').grid(row=0, column=1)
	tkinter.Label(m, text='Atom with atomic number ' + str(atomic) + ' (case sensitive)').grid(row=1)
	b1 = tkinter.Button(m, text='Submit', width=15, command=submit)
	tkinter.Button(m, text='Get Answer (lifes -1)', width=15, command=skip).grid(row=2, column=1)
	tkinter.Button(m, text='New Question', width=15, command=renderGame).grid(row=2, column=2)
	tkinter.Button(m, text='Exit', width=15, command=m.destroy).grid(row=2, column=3)
	e1 = tkinter.Entry(m)
	e1.grid(row=1, column=2)
	b1.grid(row=2)

def skip():
	global isSkip
	isSkip = True;
	submit();

renderGame()
m.mainloop()