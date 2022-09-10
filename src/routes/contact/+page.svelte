<script lang="ts">
	import Homepage from '../+page.svelte';

	function addRequired(event: Event) {
		const element = <HTMLInputElement>event.target;

		if (element.required) {
			element.classList.add('required');
		}
	}
</script>

<Homepage />

<h1 class="font-bold my-12">Let's Connect!</h1>

<div class="w-full block relative">
	<form class="flex flex-col space-y-8">
		<div class="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between">
			<div class="grow md:mr-5" animation-type="animate__fadeInUp" animation-delay="250ms">
				<input
					on:focusout={addRequired}
					class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
					placeholder=""
					id="name-input"
					type="text"
					required
				/>
				<label class="dark:text-primary-light text-primary-dark" for="name-input">Name</label>
				<span />
			</div>
			<div class="grow" animation-type="animate__fadeInUp" animation-delay="500ms">
				<input
					on:focusout={addRequired}
					class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
					placeholder=""
					id="email-input"
					type="email"
					required
				/>
				<label class="dark:text-primary-light text-primary-dark" for="email-input">Email</label>
				<span />
			</div>
		</div>
		<div animation-type="animate__fadeInUp" animation-delay="750ms">
			<input
				on:focusout={addRequired}
				class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
				placeholder=""
				id="subject-input"
				type="text"
				required
			/>
			<label class="dark:text-primary-light text-primary-dark" for="subject-input">Subject</label>
			<span />
		</div>
		<div animation-type="animate__fadeInUp" animation-delay="1000ms">
			<textarea
				on:focusout={addRequired}
				class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
				placeholder=""
				id="message-input"
				type="text"
				required
			/>
			<label class="dark:text-primary-light text-primary-dark" for="message-input">Message</label>
			<span />
		</div>
		<div animation-type="animate__fadeInUp" animation-delay="1250ms">
			<button
				class="submit-button dark:text-primary-dark text-primary-light hover:text-primary-dark"
				type="submit"
			>
				Commence Digital Delivery!
				<span class="hover" />
				<span class="idle dark:bg-primary-light bg-primary-dark" />
			</button>
		</div>
	</form>
</div>

<style>
	.submit-button {
		position: relative;
		height: 50px;
		padding: 0 20px;
		transition: 0.3s;
	}
	.submit-button,
	.submit-button > span {
		border-radius: 5px;
	}
	.submit-button > span {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
	}
	.submit-button > .idle {
		width: 100%;
		z-index: -2;
	}
	.submit-button > .hover {
		width: 0;
		background: linear-gradient(to right, #e16c46, #f0a776);
		transition: 0.3s;
		z-index: -1;
	}
	.submit-button:hover > .hover {
		width: 100%;
		transition: 0.3s;
	}
	.input-field {
		background: transparent;
		width: 100%;
		height: 50px;
		font-size: 16px;
		padding: 0 20px;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		outline: none;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	textarea.input-field {
		min-height: 150px;
		padding: 20px;
	}
	textarea.input-field ~ span {
		bottom: 10px;
	}
	.input-field ~ span {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
	}
	.input-field ~ span:before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 100%;
		background: linear-gradient(to right, #e16c46, #e98b5c);
		transition: 0.3s;
	}
	.input-field ~ span:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: auto;
		right: 0;
		width: 0;
		height: 100%;
		background: linear-gradient(to right, #e98b5c, #f0a776);
		transition: 0.3s;
	}
	.input-field ~ label {
		position: absolute;
		left: 0;
		width: 100%;
		top: 9px;
		transition: 0.3s;
		z-index: -1;
		letter-spacing: 0.5px;
	}
	.input-field:focus ~ span:before,
	.input-field:focus ~ span:after {
		width: 50%;
		transition: 0.3s;
	}
	.input-field:focus ~ label {
		top: -16px;
		font-size: 13px;
		color: #e16c46;
		transition: 0.3s;
	}
	.input-field:valid ~ label {
		top: -16px;
		font-size: 13px;
		transition: 0.3s;
	}
	:global(.input-field.required:invalid) ~ span:before {
		background: linear-gradient(to right, #ad0014, #d11d2c);
	}
	:global(.input-field.required:invalid) ~ span:after {
		background: linear-gradient(to right, #d11d2c, #f64646);
	}
	:global(.input-field.required:invalid) ~ span:before,
	:global(.input-field.required:invalid) ~ span:after {
		width: 50%;
		transition: 0.3s;
	}
	:global(.input-field.required:invalid) ~ label {
		top: -16px;
		font-size: 13px;
		color: #d11d2c;
		transition: 0.3s;
	}
</style>
