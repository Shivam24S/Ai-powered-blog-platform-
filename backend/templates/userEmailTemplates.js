export const welcomeEmailTemplate = (name) => {
  return `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #2c3e50;">Welcome to <span style="color: #007bff;">AI Blog Platform</span>, ${name}!</h2>

          <p style="font-size: 16px; color: #333;">We’re excited to have you on board. 🎉</p>

          <p style="font-size: 15px; color: #444;">Our AI-powered blog platform allows you to read, create, and summarize blog content with the help of smart AI tools.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://quickreadsai.netlify.app/blogs" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Explore Now</a>
          </div>

          <p style="font-size: 14px; color: #666;">If you have any questions or feedback, just reply to this email. We're here to help!</p>

          <hr style="border: none; border-top: 1px solid #ccc;" />
          <p style="font-size: 12px; color: #999; text-align: center;">© 2025 AI-powered Blog Platform. All rights reserved.</p>
        </div>`;
};

export const profileUpdateTemplate = (name) => {
  return `  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #fffbe6;">
    <h2 style="text-align: center; color: #ff9900;">
      Hi ${name}, your profile was updated!
    </h2>
    <p style="font-size: 16px; color: #333;">
      We wanted to let you know that your profile information was successfully
      updated.
    </p>
    <p style="font-size: 15px; color: #444;">
      If you didn’t make this change, please reply this email or contact our
      support team immediately.
    </p>
    <hr style="border: none; border-top: 1px solid #ccc;" />
    <p style="font-size: 12px; color: #999; text-align: center;">
      © 2025 AI-powered Blog Platform. All rights reserved.
    </p>
  </div>`;
};

export const accountDeletionEmailTemplate = (name) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffe6e6;">
      <h2 style="text-align: center; color: #e74c3c;">Goodbye, ${name}</h2>
      <p style="font-size: 16px; color: #333;">We're sorry to see you go. Your account has been successfully deleted from AI-powered Blog Platform.</p>
      <p style="font-size: 15px; color: #444;">If this was a mistake, please contact us immediately and we’ll do our best to help you recover it.</p>
      <hr style="border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 12px; color: #999; text-align: center;">© 2025 AI-powered Blog Platform. Thank you for being a part of our community.</p>
    </div>`;
};
