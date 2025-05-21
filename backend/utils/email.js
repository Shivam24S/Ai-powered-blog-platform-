import SibApiV3Sdk from "sib-api-v3-sdk";

const sendWelcomeEmail = async (email, name) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      sender: {
        name: "AI Powered Blog Platform",
        email: "forusediffrentkind@gmail.com",
      },
      to: [{ email, name }],
      subject: "👋 Welcome to AI Powered Blog Platform!",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #2c3e50;">Welcome to <span style="color: #007bff;">AI Blog Platform</span>, ${name}!</h2>

          <p style="font-size: 16px; color: #333;">We’re excited to have you on board. 🎉</p>

          <p style="font-size: 15px; color: #444;">Our AI-powered blog platform allows you to read, create, and summarize blog content with the help of smart AI tools.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yourappdomain.com" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Explore Now</a>
          </div>

          <p style="font-size: 14px; color: #666;">If you have any questions or feedback, just reply to this email. We're here to help!</p>

          <hr style="border: none; border-top: 1px solid #ccc;" />
          <p style="font-size: 12px; color: #999; text-align: center;">© 2025 AI Blog Platform. All rights reserved.</p>
        </div>
      `,

      replyTo: {
        email: "forusediffrentkind@gmail.com",
        name: "AI Powered Blog Platform Support",
      },
      headers: {
        "X-Mailin-custom": "custom_header_1:value_1|custom_header_2:value_2",
      },
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", result);
  } catch (error) {
    console.error("❌ Full error:", error?.response?.text || error);
  }
};

export default sendWelcomeEmail;
