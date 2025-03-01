//! KETIKA APLIKASI INI SUDAH BEKEMBANG SANGAT JAUH MAKA translatorApi.ts(Yang Asli) AKAN DI IGNORE, DAN YANG DI PUSH DI GITHUB HANYALAH translatorApi_Example.ts

const API_URL = "YOUR_API_URL"; // Replace with your actual API URL
const ACCESS_KEY = "YOUR_ACCESS_KEY"; // Replace with your actual access key

export const fetchTranslationData = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Access-Key": ACCESS_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch translation data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
};
