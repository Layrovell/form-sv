const reName = /^[a-zA-Z\u00C0-\u00ff]+$/;
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reLogin = /^[0-9a-zA-Z]+$/;
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

function firstNameHandler(v) {
	const validFirstName = v;

	if (!v.length) return 'First Name cant be empty!';
	else if (!validFirstName) return 'Not valid!'
	else return;
}

function lastNameHandler(v) {
	const validLastName = v; //reName.test(fields.lastName);

	if (!v.length) return 'Last Name cant be empty!';
	else if (!validLastName) return 'Not valid!'
	else return;
}

function emailHandler(value) {
	const validEmail = reEmail.test(value);

	if (!value.length) return 'Email cant be empty!';
	else if (!validEmail) return 'Not valid!'
	else return;
}

function loginHandler(value) {
	const validLogin = reLogin.test(value);

	if (!value.length) return 'Login cant be empty!';
	else if (!validLogin) return 'Not valid!'
	else return;
}

function dateHandler(value) {
	const dayToday = new Date().toISOString().split('T')[0];
	let currentAge = Math.round(((new Date(dayToday).getTime() - new Date(value).getTime()) / 1000 / 60 / 60 / 24) / 365);

	if (!value.length) return 'Date cant be empty!';
	else if (currentAge < 16) return 'Age less than 16!'
	else return;
}

  function passwordHandler(value) {
    const validPassword = rePassword.test(value);

    if (!value.length) return 'Password cant be empty!';
    else if (!validPassword) return 'Not valid!'
    else if (value.trim().length < 6) return 'Password must be at least 6 chars long!';
    else return;
  }

  function repeatPasswordHandler(value, fields) {
    if (!value.length) 
			return 'repeat password!';
    else if (fields && fields.password !== value) 
			return 'Not correct!';
    else 
			return;
  }

export const inputs = [
		{ name: 'firstName', label: 'First name', playcholder: 'John', validate: firstNameHandler },
		{ name: 'lastName', label: 'Last name', playcholder: 'Doe', validate: lastNameHandler },
		{ name: 'email', label: 'Email', type: 'email', playcholder: 'JohnDpe@gmail.com', validate: emailHandler },
		{ name: 'login', label: 'Login', playcholder: 'JDoe', validate: loginHandler },
		{ name: 'date', label: 'Date', type: 'date', validate: dateHandler },
		{ name: 'password', label: 'Password', type: 'password', playcholder: 'Qwe123', validate: passwordHandler },
		{ name: 'repeatPassword', type: 'password', label: 'Repeat password', playcholder: 'John', validate: repeatPasswordHandler },
	];
    