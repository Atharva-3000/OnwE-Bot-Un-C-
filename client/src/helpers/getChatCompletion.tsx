import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_API_KEY, dangerouslyAllowBrowser: true });

async function getChatCompletion(input:string) {
  const chatCompletion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      model: "mixtral-8x7b-32768",
    })
    .then((chatCompletion) => chatCompletion.choices[0]?.message?.content || "");

  return chatCompletion;
}

export default getChatCompletion;