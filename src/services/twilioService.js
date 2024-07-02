import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
    throw new Error('Twilio credentials are not set in the environment variables.');
}

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
    try {
        const result = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: to
        });
        console.log('Message sent successfully:', result.sid);
        return result.sid;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
