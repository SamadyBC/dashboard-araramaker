/*

RUN THIS FILE BEFORE RUNNING THE SERVER

Author: Raul Rosá
Created on: Tuesday, 16/04/2019

Objectives:
	This file is meant to be used for setting the inicial database configurations, such as tables and relations between them.

	Head to the terminal in this folder, with Node.js installed, and type: node setDatabase.js
	The file will them set your database and make it ready to use.

*/

const sql = require('./db.js');
const fs = require('fs');
const crypto = require('crypto');

fs.readFile('./database/dbScript.sql', 'utf8', function(err, contents){
	if(err) return console.log('Error reading database file');

	fs.writeFile('./araradatabase.db', '', () => {
		console.log('Previous database information erased.');
	})

	sql.exec(contents);


	let salt = crypto.randomBytes(16).toString('hex');

	let admin = {
		usuario: 'admin',
		email: 'Araramaker@gmail.com',
		cpf: '',
		salt: salt,
		hash: crypto.pbkdf2Sync('admin', salt, 10000, 512, 'sha512').toString('hex')
	}

	sql.run("INSERT INTO Users(name, email, cpf, hash, salt, permission) VALUES(?, ?, ?, ?, ?, ?)", [
		admin.usuario.toLowerCase(),
		admin.email.toLowerCase(),
		admin.cpf,
		admin.hash,
		admin.salt,
		1
	]);

	sql.run("INSERT INTO Schedules(weekDay, start_time, end_time, open) VALUES "+
		"('monday', 8, 12, 0), ('monday', 13, 18, 0), ('monday', 19, 22, 0), "+
		"('tuesday', 8, 12, 0), ('tuesday', 13, 18, 0), ('tuesday', 19, 22, 0), "+
		"('wednesday', 8, 12, 0), ('wednesday', 13, 18, 0), ('wednesday', 19, 22, 0), "+
		"('thursday', 8, 12, 0), ('thursday', 13, 18, 0), ('thursday', 19, 22, 0), "+
		"('friday', 8, 12, 0), ('friday', 13, 18, 0), ('friday', 19, 22, 0), "+
		"('saturday', 8, 12, 0), ('saturday', 13, 18, 0), ('saturday', 19, 22, 0), "+
		"('sunday', 8, 12, 0), ('sunday', 13, 18, 0), ('sunday', 19, 22, 0)"
	);
});