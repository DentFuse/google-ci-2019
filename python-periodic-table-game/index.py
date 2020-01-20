import tkinter, json, random

elem = json.load(open('map.json', 'r'))

m = tkinter.Tk()
m.title('Periodic Games') 

def submit():
	answer = e1.get()
	s = tkinter.Toplevel(m)
	if(e1.get() == anskey):
		tkinter.Label(s, text='Correct!').grid(row=0)
		tkinter.Button(s, text='Continue...', command=s.destroy).grid(row=1)
		renderGame()
	else:
		tkinter.Label(s, text='Wrong!').grid(row=0)
		tkinter.Button(s, text='Exit', command=m.destroy).grid(row=1)

def renderGame():
	global e1, anskey
	atomic = random.randrange(0, 119, 1)
	anskey = elem[str(atomic)]
	# print(anskey)
	tkinter.Label(m, text='Atom with atomic number ' + str(atomic)).grid(row=0)
	tkinter.Button(m, text='Submit', width=15, command=submit).grid(row=1)
	tkinter.Button(m, text='Exit', width=15, command=m.destroy).grid(row=1, column=1)
	e1 = tkinter.Entry(m)
	e1.grid(row=0, column=1)

renderGame()
m.mainloop()