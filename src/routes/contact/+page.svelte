<script lang="ts">
	import Homepage from '../+page.svelte';

	async function handleSubmit(event: Event) {
		const target = <HTMLFormElement>event.target;
		const formData = new FormData(target);
		const submit = await fetch(target.action, {
			method: 'POST',
			body: formData
		});

		/** @type {import('@sveltejs/kit').ActionResult} */
		const response = await submit.json();
	}
</script>

<div>
	<h1 class="font-bold my-12">Post Title</h1>

	<p class="mb-8">
		<a href="https://minimalissimo.shop/product/minimalist-writer-ii" target="_blank"
			>https://minimalissimo.shop/product/minimalist-writer-ii</a
		>
		by <a href="https://manuelmoreale.com/">Manuel Moreale</a>.
	</p>

	<p class="mb-8">
		Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a> adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus
		vel facilisis volutpat. Vitae aliquet nec ullamcorper sit. Nullam eget felis eget nunc lobortis mattis
		aliquam. In est ante in nibh mauris. Egestas congue quisque egestas diam in. Facilisi nullam vehicula
		ipsum a arcu. Nec nam aliquam sem et tortor consequat. Eget mi proin sed libero enim sed faucibus
		turpis in. Hac habitasse platea dictumst quisque. In aliquam sem fringilla ut. Gravida rutrum quisque
		non tellus orci ac auctor augue mauris. Accumsan lacus vel facilisis volutpat est velit egestas dui
		id. At tempor commodo ullamcorper a. Volutpat commodo sed egestas egestas fringilla. Vitae congue
		eu consequat ac.
	</p>
</div>

<h1 class="font-bold my-12">Let's Connect!</h1>

<div class="w-full block relative">
	<form
		class="flex flex-col space-y-8"
		method="POST"
		enctype="multipart/form-data"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between">
			<div
				class="grow md:mr-5 opacity-0"
				animation-type="animate__fadeInUp"
				animation-delay="250ms"
			>
				<input
					class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
					placeholder=" "
					id="name-input"
					type="text"
					name="name"
					required
				/>
				<label class="dark:text-primary-light text-primary-dark" for="name-input">Name</label>
				<span />
			</div>
			<div class="grow opacity-0" animation-type="animate__fadeInUp" animation-delay="500ms">
				<input
					class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
					placeholder=" "
					id="email-input"
					type="email"
					name="email"
					required
				/>
				<label class="dark:text-primary-light text-primary-dark" for="email-input">Email</label>
				<span />
			</div>
		</div>
		<div class="opacity-0" animation-type="animate__fadeInUp" animation-delay="750ms">
			<input
				class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
				placeholder=" "
				id="subject-input"
				type="text"
				name="subject"
				required
			/>
			<label class="dark:text-primary-light text-primary-dark" for="subject-input">Subject</label>
			<span />
		</div>
		<div class="opacity-0" animation-type="animate__fadeInUp" animation-delay="1000ms">
			<textarea
				class="input-field dark:text-primary-light text-primary-dark dark:border-primary-light border-primary-dark"
				placeholder=" "
				id="message-input"
				type="text"
				name="message"
				required
			/>
			<label class="dark:text-primary-light text-primary-dark" for="message-input">Message</label>
			<span />
		</div>
		<div class="opacity-0" animation-type="animate__fadeInUp" animation-delay="1250ms">
			<button
				class="submit-button dark:text-primary-dark text-primary-light hover:text-primary-dark"
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
	.input-field:not(:placeholder-shown) ~ span:before {
		background: linear-gradient(to right, #ad0014, #d11d2c);
	}
	.input-field:not(:placeholder-shown) ~ span:after {
		background: linear-gradient(to right, #d11d2c, #f64646);
	}
	.input-field:not(:placeholder-shown) ~ span:before,
	.input-field:not(:placeholder-shown) ~ span:after {
		width: 50%;
		transition: 0.3s;
	}
	.input-field:not(:placeholder-shown) ~ label {
		top: -16px;
		font-size: 13px;
		color: #d11d2c;
		transition: 0.3s;
	}
	.input-field:valid ~ span:before {
		background: inherit;
	}
	.input-field:valid ~ span:after {
		background: inherit;
	}
	.input-field:valid ~ label {
		top: -16px;
		font-size: 13px;
		color: inherit;
		transition: 0.3s;
	}
	.input-field:focus ~ span:before {
		background: linear-gradient(to right, #e16c46, #e98b5c);
	}
	.input-field:focus ~ span:after {
		background: linear-gradient(to right, #e98b5c, #f0a776);
	}
	.input-field:focus ~ label {
		top: -16px;
		font-size: 13px;
		color: #e16c46;
		transition: 0.3s;
	}
</style>
