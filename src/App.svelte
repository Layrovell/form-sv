<script>
	import Input1 from "./Component2.svelte";
	import { inputs } from './helpers.js';
	
	let fields = {firstName: '', lastName: '', email: '', login: '', date: '', password: '', repeatPassword: ''};
  let errors = {};
	
  let formMessage = '';
	let submitted = false;
	
  function handleSubmit() {
		console.error('fields', fields);
		let e = "";
		inputs.forEach(_ => {
			const v = fields[_.name];
			if (_.validate) {
				const vv = _.validate(v, fields);
				errors[_.name] = vv;
				if (vv != null)
						e += e.length ? '\n' + vv : vv;
			}
		});
		formMessage = e;
		if (e.length) {
			console.error(e);
		}
  }
	
</script>

<main>
  <form on:submit|preventDefault={(e) => handleSubmit(e)}>

		{#each inputs as { label, type, name, playcholder, validate }}
		  <label>{label}:
				<Input1  {type} bind:value={fields[name]} bind:error={errors[name]} {playcholder} {validate} allValues={fields}/>
			</label>
		{/each}
				
    <button on:click={() => submitted = true} type="submit">submit</button>
    <div>{formMessage}</div>
  </form>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
	
  form {
    max-width: 300px;
    margin: 10px auto;
    padding: 20px;
    border: 1px solid lightgray;
    position: relative;
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
	
	label {
		font-size: 14px;
		font-weight: bold;
		margin-top: 10px;
		text-align: left;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
