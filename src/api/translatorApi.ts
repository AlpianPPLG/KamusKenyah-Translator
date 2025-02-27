const API_URL = "https://api.jsonbin.io/v3/b/67af31cee41b4d34e48dc2e8";
const ACCESS_KEY =
  "$2a$10$KKJf2vVU9DHFXCEdIGLFNeDOk8ILh4O7N8chEd7jsQAfSaKwUsxMC";

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
