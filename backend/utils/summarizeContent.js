import axios from "axios";
import HttpError from "../middlewares/errorHandler.js";

async function summarizeContent(content) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        inputs: content,
        parameters: { max_length: 100, min_length: 40, do_sample: false },
      },
      {
        headers: {
          Authorization: `Bearer ${
            process.env.AI_KEY || "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"
          }`,
        },
      }
    );

    const summary = response.data[0]?.summary_text;

    if (!summary) {
      throw new HttpError("failed to create summary", 400);
    }

    return summary;
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
}

export default summarizeContent;
