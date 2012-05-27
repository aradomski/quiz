Projekt do zarządzania kartkówkam.

Tworzenie pierwszego użytkownika (Admin):

$ mongo

> use quiz

> db.Users.insert({userName:"uzytkownik", pass:"haslo", isAdmin:true});

Pozostali użytkownicy oraz pytania tworzeni są z panelu admina

Struktura bazy:

Users:
	userName
	pass
	group (opcjonalne)
	created_at (opcjonalne)
	_id
	isAdmin (opcjonalne)
Questions:
	question
	a
	b
	c
	d
	correct
	created_at
	_id