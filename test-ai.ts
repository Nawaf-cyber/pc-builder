import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('مفتاح GEMINI_API_KEY مفقود من ملف .env');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// استخدام النموذج الأحدث المدعوم
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function runTest() {
  console.log('جاري الاتصال بـ Gemini...');
  try {
    const result = await model.generateContent('اكتب كلمة "نجاح" فقط.');
    console.log('✅ النتيجة:', result.response.text());
  } catch (error) {
    console.error('❌ خطأ تفصيلي:', error);
  }
}

runTest();