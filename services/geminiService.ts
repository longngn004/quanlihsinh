
import { GoogleGenAI } from "@google/genai";
import type { Note } from '../types';

// IMPORTANT: This is a client-side application.
// In a real-world scenario, the API key should be handled on a secure backend server.
// For this project, we assume the API key is available as an environment variable.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'mock-key' });

export const summarizeStudentNotes = async (notes: Note[]): Promise<string> => {
  if (!apiKey) {
    return Promise.resolve("Chức năng AI đã bị vô hiệu hóa vì không tìm thấy API key. Vui lòng cấu hình biến môi trường API_KEY.");
  }
  
  const model = 'gemini-2.5-flash';

  const notesContent = notes.map(note => `- Bí danh "${note.alias}": ${note.content}`).join('\n');

  const prompt = `
    Bạn là một chuyên gia tâm lý học đường. Dưới đây là các ghi chú ẩn danh từ học sinh. 
    Hãy phân tích và tóm tắt các chủ đề chính và các mối quan tâm tiềm ẩn từ những ghi chú này. 
    Tập trung vào các vấn đề như áp lực học tập, mối quan hệ xã hội, sức khỏe tinh thần và các điểm tích cực.
    KHÔNG được tiết lộ danh tính hoặc trích dẫn trực tiếp. Cung cấp bản tóm tắt dưới dạng các gạch đầu dòng bằng tiếng Việt.

    Dữ liệu ghi chú:
    ${notesContent}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Đã xảy ra lỗi khi gọi Gemini API: ${error.message}. Hãy kiểm tra API key và kết nối mạng của bạn.`;
    }
    return "Đã xảy ra lỗi không xác định khi gọi Gemini API.";
  }
};
