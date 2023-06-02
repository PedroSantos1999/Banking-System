# Angular Banking System

This is a small home banking project that includes a login and a registration page, a list of movements, and includes options to deposit or withdraw funds.

## Steps

Open terminal and run json-server --watch db.json.<br />
Open another terminal and install packages with npm install, and run ng serve. <br />
Navigate to `http://localhost:4200/`.<br />

## Mandatory technologies

https://angular.io/<br />
https://material.angular.io/<br />

### Register

Add a username, name, email and a password (needs at least 8 characters with numbers, symbols and letters).

### Login

Insert the username and the correct password.

### Main

Select the button deposit to add funds (Max: 50 euros).<br />
Select the button withdrawal to remove funds (Max: 50 euros).<br />

### Movements

Contains a list with users, a description of their actions, and the amount of funds that was added/removed.
