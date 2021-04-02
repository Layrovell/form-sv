<script>
	export let label;
	export let value;
	export let type;
	export let error = '';
	export let playcholder;
	export let validate;
	
	export let allValues = null;
	
	const onBlur = (e) => {
		if (validate === null) 
				return;
		error = validate(value, allValues);
	};
</script>

	{#if type === "date"}
		<input type="date" bind:value={value}	on:blur={onBlur} placeholder={playcholder}/>
	{:else if type === 'password'}
		<input type="password" bind:value={value} on:blur={onBlur} placeholder={playcholder}/>
	{:else if type === 'email'}
		<input type="email" bind:value={value} on:blur={onBlur} placeholder={playcholder}	/>
	{:else}
		<input bind:value={value} on:blur={onBlur} placeholder={playcholder}/>
	{/if}
{#if error}
	<div class="errors">{error}</div>
{/if}

<style>
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

	.errors {
		color: red;
		font-size: 0.6em;
		position: absolute;
		right: 20px;
		font-weight: bold;
	}
</style>
