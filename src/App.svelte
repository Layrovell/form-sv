<script>
  export let name;
  let fields = {firstName: '', lastName: '', email: '', login: '', date: '', password: '', repeatPassword: ''};
  let errors = {firstName: '', lastName: '', email: '', login: '', date: '', password: '', repeatPassword: ''};
  let formMessage = '';
  let valid = false;
  let res = '';

  const reName = /^[a-zA-Z\u00C0-\u00ff]+$/;
  const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ageLimit = 16;
  const reLogin = /^[0-9a-zA-Z]+$/;
  const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  const limitChars = 6;
  const dayToday = new Date().toISOString().split('T')[0];

  let currentAge = new Date(dayToday).getTime() - new Date(fields.date).getTime();
  // / 1000 / 60 / 60 / 24;
  // currentAge = Math.round(currentAge / 365);

  function handleSubmit() {
    valid = true;

    firstNameHandler();
    lastNameHandler();
    emailHandler();
    loginHandler();
    dateHandler();
    passwordHandler();
    repeatPasswordHandler();

    console.log('-----------------');
    console.log('dayToday: ', dayToday);
    console.log('currtAge: ', currentAge);
    console.log('-----------------');

    if (valid) {
      console.log('valid', fields);
      formMessage = 'form is valid!'
      res = JSON.stringify(fields,undefined, 2);
    } else {
      console.log('not valid');
      formMessage = 'form not valid =('
    }
  }

  function firstNameHandler() {
    const validFirstName = reName.test(fields.firstName);

    if (!fields.firstName.length) {
      valid = false;
      errors.firstName = 'First Name cant be empty!';
    } else if (!validFirstName) {
      valid = false;
      errors.firstName = 'Not valid!'
    } else {
      errors.firstName = '';
    }
  }

  function lastNameHandler() {
    const validLastName = reName.test(fields.lastName);

    if (!fields.lastName.length) {
      valid = false;
      errors.lastName = 'Last Name cant be empty!';
    } else if (!validLastName) {
      valid = false;
      errors.lastName = 'Not valid!'
    } else {
      errors.lastName = '';
    }
  }

  function emailHandler() {
    const validEmail = reEmail.test(fields.email);
    if (!fields.email.length) {
      valid = false;
      errors.email = 'Email cant be empty!';
    } else if (!validEmail) {
      valid = false;
      errors.email = 'Not valid!'
    } else {
      errors.email = '';
    }
  }

  function loginHandler() {
    const validLogin = reLogin.test(fields.login);

    if (!fields.login.length) {
      valid = false;
      errors.login = 'Login cant be empty!';
    } else if (!validLogin) {
      valid = false;
      errors.login = 'Not valid!'
    } else {
      errors.login = '';
    }
  }

  function dateHandler() {
    if (!fields.date.length) {
      valid = false;
      errors.date = 'Date cant be empty!';
    } else if (currentAge < ageLimit) {
      valid = false;
      errors.date = 'Age less than 16!'
    } else {
      errors.date = '';
    }
  }

  function passwordHandler() {
    const validPassword = rePassword.test(fields.password);

    if (!fields.password.length) {
      valid = false;
      errors.password = 'Password cant be empty!';
    } else if (!validPassword) {
      valid = false;
      errors.password = 'Not valid!'
    } else if (fields.password.trim().length < limitChars) {
      valid = false;
      errors.password = 'Password must be at least 6 chars long!';
    } else {
      errors.password = '';
    }
  }

  function repeatPasswordHandler() {
    if (!fields.repeatPassword.length) {
      valid = false;
      errors.repeatPassword = 'repeat password!';
    } else if (fields.password !== fields.repeatPassword) {
      valid = false;
      errors.repeatPassword = 'Not correct!'
    } else {
      errors.repeatPassword = '';
    }

    if (valid) {
      console.log('valid', fields);
    } else {
      console.log('not valid');
    }
  }

</script>

<main>
  <h1>Hello {name}!</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      First Name:
      <input
        bind:value={fields.firstName}
        on:input={(e)=>fields.firstName=e.target.value}
        on:blur={(e) => firstNameHandler(e)}
        placeholder="John"
      />
    </label>
    <div class="errors">{errors.firstName}</div>

    <label>
      Last Name:
      <input
        bind:value={fields.lastName}
        on:input={(e)=>fields.lastName=e.target.value}
        on:blur={(e) => lastNameHandler(e)}
        placeholder="Doe"
      />
    </label>
    <div class="errors">{errors.lastName}</div>

    <label>
      Email:
      <input
        bind:value={fields.email}
        on:input={(e)=>fields.email=e.target.value}
        on:blur={(e) => emailHandler(e)}
        placeholder="JDoe@gmail.com"
      />
    </label>
    <div class="errors">{errors.email}</div>

    <label>
      Login:
      <input
        bind:value={fields.login}
        on:input={(e)=>fields.login=e.target.value}
        on:blur={(e) => loginHandler(e)}
        placeholder="JDoe"
      />
    </label>
    <div class="errors">{errors.login}</div>

    <label>
      Date:
      <input
        bind:value={fields.date}
        on:input={(e)=>fields.date=e.target.value}
        on:blur={(e) => dateHandler(e)}
        type='date'
      />
    </label>
    <div class="errors">{errors.date}</div>

    <label>
      Password:
      <input
        bind:value={fields.password}
        on:input={(e)=>fields.password=e.target.value}
        on:blur={(e) => passwordHandler(e)}
        placeholder="qwerty123"
      />
    </label>
    <div class="errors">{errors.password}</div>

    <label>
      Repeat Password:
      <input
        bind:value={fields.repeatPassword}
        on:input={(e)=>fields.repeatPassword=e.target.value}
        on:blur={(e) => repeatPasswordHandler(e)}
        placeholder="qwerty123"
      />
    </label>
    <div class="errors">{errors.repeatPassword}</div>

    <button type="submit">submit</button>
    <div>{formMessage}</div>
  </form>

  <div class='result'>
    <pre>
      {res}
    </pre>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  form {
    max-width: 300px;
    margin: 10px auto;
    padding: 20px;
    border: 1px solid lightgray;
    position: relative;
  }

  input {
    padding: 10px;
    width: 100%;
    border: 1px solid lightgray;
    height: 35px;
    margin: 5px 0 0;
  }

  input::placeholder {
    color: #c3b8b8;
    font-size: 12px;
  }

  label {
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    text-align: left;
  }

  button {
    cursor: pointer;
    outline: none;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    margin: 10px 0;
    font-size: 12px;
    transition: all ease-in-out 0.4s;
    text-transform: uppercase;
    margin-top: 20px;
  }

  button:hover {
    background-color: rgb(58, 57, 57);
  }

.errors {
  color: red;
  font-size: 0.6em;
  position: absolute;
  right: 20px;
  font-weight: bold;
}

.result {
		width: 300px;
    text-align: left;
    margin: 0 auto;
	}

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }


</style>
