// pages/api/subscribe.js
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

export default async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    return res.status(201).json({ error: '' });
  } catch (error) {
    if (error.response && error.response.body) {
      const responseBody = error.response.body;
      if (responseBody.title === "Member Exists") {
        return res.status(400).json({ error: "This email is already subscribed to the list." });
      } else if (responseBody.title === "Invalid Resource") {
        return res.status(400).json({ error: responseBody.detail });
      }
      return res.status(500).json({ error: responseBody.detail || "An error occurred" });
    }
    return res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};