
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartAnalysis = async (description: string) => {
  if (!process.env.API_KEY) return null;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte pedido de serviço e sugira um orçamento médio e a urgência técnica real. Descrição: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedBudget: { type: Type.NUMBER, description: "Valor sugerido em Reais" },
            technicalUrgency: { type: Type.STRING, description: "Baixa, Média ou Alta" },
            justification: { type: Type.STRING, description: "Breve explicação do porquê" }
          },
          required: ["estimatedBudget", "technicalUrgency", "justification"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
