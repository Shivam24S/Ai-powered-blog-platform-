import dotenv from "dotenv";
dotenv.config({ path: "./.dev.env" });

import axios from "axios";
import HttpError from "../middlewares/errorHandler.js";

async function summarizeContent(content) {
  try {
    // currently not working previously working
    // const response = await axios.post(
    //   "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    //   {
    //     inputs: content,
    //     parameters: { max_length: 100, min_length: 40, do_sample: false },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.AI_KEY}`,
    //     },
    //   }
    // );

    // currently working

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
        inputs: content,
        parameters: { max_length: 150, min_length: 30, do_sample: false },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_KEY}`,
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

// switching model if one of not works
// import dotenv from "dotenv";
// dotenv.config({ path: "./.dev.env" });

// import axios from "axios";
// import HttpError from "../middlewares/errorHandler.js";

// const headers = {
//   Authorization: `Bearer ${process.env.AI_KEY}`,
// };

// async function summarizeContent(content) {
//   const models = ["facebook/bart-large-cnn", "sshleifer/distilbart-cnn-12-6"];

//   for (const model of models) {
//     const url = `https://api-inference.huggingface.co/models/${model}`;
//     try {
//       const response = await axios.post(
//         url,
//         {
//           inputs: content,
//           parameters: { max_length: 150, min_length: 30, do_sample: false },
//         },
//         { headers }
//       );

//       const summary = response.data[0]?.summary_text;

//       if (summary) {
//         return summary;
//       }
//     } catch (err) {
//       console.warn(
//         `Model ${model} failed with status ${err.response?.status || "unknown"}`
//       );
//     }
//   }

//   throw new HttpError("All summarization models failed", 500);
// }

// export default summarizeContent;
