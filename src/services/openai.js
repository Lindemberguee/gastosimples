const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analisarNota(buffer) {
  const base64 = buffer.toString("base64");
  const dataUrl = `data:image/png;base64,${base64}`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {
          role: "system",
          content: "Você é um extrator de dados de notas fiscais. Sempre responda com JSON válido."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extraia os dados da nota fiscal abaixo."
            },
            {
              type: "image_url",
              image_url: { url: dataUrl }
            }
          ]
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "nota_fiscal",
          schema: {
            type: "object",
            properties: {
              estabelecimento: { type: "string" },
              data: { type: "string" },
              cnpj: { type: "string" },
              total: { type: "number" },
              categoria: { type: "string" },
              formaPagamento: { type: "string" },
              itens: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    nome: { type: "string" },
                    quantidade: { type: "number" },
                    valor: { type: "number" }
                  },
                  required: ["nome", "valor"]
                }
              }
            },
            required: ["estabelecimento", "total"]
          }
        }
      }
    });

    console.log("Resposta da OpenAI:", response.choices[0].message.content);

    return JSON.parse(response.choices[0].message.content);

  } catch (err) {
    console.error("ERRO NA OPENAI:", err);
    return { error: err.message };
  }
}

module.exports = { analisarNota };
