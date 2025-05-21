import SibApiV3Sdk from "sib-api-v3-sdk";

const sendEmail = async (email, name, template, subject) => {
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
      subject: subject,
      htmlContent: template,

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

export default sendEmail;
