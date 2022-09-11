import { formBody } from '$lib/FormHelper';
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_KEY } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	auth: {
		user: EMAIL,
		pass: EMAIL_KEY
	}
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }: any) => {
		const body = formBody(await request.formData());

		const message = await transporter.sendMail(
			{
				from: EMAIL,
				to: EMAIL,
				subject: `${body.subject}`,
				text: `${body.message}\n\nSent from ${body.name} with return address ${body.email}\n\nSent from portfolio contact form.`
			},
			function (err, info) {
				if (err) {
					return { success: false };
				} else {
					return { success: true };
				}
			}
		);
	}
};
