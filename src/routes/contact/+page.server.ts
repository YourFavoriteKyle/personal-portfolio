import { formBody } from '$lib/FormHelper';
import { error } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }: any) => {
		const values = await request.formData();
		const body = formBody(values);

		return { success: true };
	}
};
