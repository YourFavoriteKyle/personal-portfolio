import { formBody } from '$lib/FormHelper';
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_KEY } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: EMAIL,
		pass: EMAIL_KEY
	}
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }: any) => {
		const body = formBody(await request.formData());

		const message = await transporter.sendMail({
			from: EMAIL,
			to: EMAIL,
			subject: `${body.subject}`,
			text: `${body.message}\n\nSent from ${body.name} with return address ${body.email}\n\nSent from portfolio contact form.`
		});
		if (message.accepted) {
			return { success: true, message: message.response };
		}
		if (message.rejected) {
			return { success: false, message: message.response };
		}
		return { success: false, message: 'Unexpected error or response.' };
	}
};
