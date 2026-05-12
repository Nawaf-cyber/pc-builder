import 'dotenv/config';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('مفتاح GEMINI_API_KEY مفقود');
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      const models = data.models.map((m: any) => m.name);
      console.log("النماذج المتاحة لمفتاحك:");
      console.log(models.filter((m: string) => m.includes('gemini')));
    } else {
      console.log("استجابة غير متوقعة:", data);
    }
  } catch (error) {
    console.error("خطأ في الاتصال:", error);
  }
}

listModels();