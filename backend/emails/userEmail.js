import HttpError from "../middlewares/errorHandler.js";
import sendEmail from "../utils/email.js";
import {
  welcomeEmailTemplate,
  profileUpdateTemplate,
  accountDeletionEmailTemplate,
} from "../templates/userEmailTemplates.js";

export async function welcomeEmail(email, name) {
  try {
    const template = welcomeEmailTemplate(name);

    const emailResponse = await sendEmail(
      email,
      name,
      template,
      "🎉 Welcome to AI-powered Blog Platform!"
    );

    if (emailResponse?.messageId) {
      console.log("welcome  email sent successfully");
    } else {
      console.log("failed to send welcome  email");
    }
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
}

export async function userProfileUpdate(email, name) {
  try {
    const template = profileUpdateTemplate(name);

    const emailResponse = await sendEmail(
      email,
      name,
      template,
      "✏️ You Just Updated Your Profile on AI Blog Platform"
    );
    if (emailResponse?.messageId) {
      console.log("user updated email sent successfully");
    } else {
      console.log("failed to send user profile update email");
    }
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
}

export async function accountDeletionEmail(email, name) {
  try {
    const template = accountDeletionEmailTemplate(name);

    const emailResponse = await sendEmail(
      email,
      name,
      template,
      "🗑️ We're Sorry to See You Go - Account Deleted"
    );

    if (emailResponse.messageId) {
      console.log("user account deletion email sent successfully");
    } else {
      console.log("failed to send user profile deletion email");
    }
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
}
