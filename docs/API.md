# Kamus Kenyah Translator API Documentation

This document provides detailed information about the RESTful API endpoints available in the Kamus Kenyah Translator project. These endpoints allow interaction with the Kenyah-Indonesian dictionary, user favorites, audio pronunciations, and cultural notes.

## Base URL

All API endpoints are prefixed with the following base URL:

      https://api.kamuskenyah-translator.com


> **Note:** Replace the base URL with your local or staging environment URL (e.g., `http://localhost:3000`) during development.

## Authentication

Most endpoints require authentication via Google OAuth. Include the access token in the `Authorization` header as a Bearer token:

      Authorization: Bearer <your-access-token>


Unauthenticated requests will return a `401 Unauthorized` response.

## Endpoints

### 1. Translate Text
- **Endpoint:** `GET /api/translate`
- **Description:** Translates text between Kenyah and Indonesian.
- **Query Parameters:**
  - `text` (required): The text to translate (e.g., "selamat").
  - `source` (required): Source language (`kenyah` or `indonesian`).
  - `target` (required): Target language (`kenyah` or `indonesian`).
- **Example Request:**

      GET /api/translate?text=selamat&source=indonesian&target=kenyah

      
- **Example Response:**

   ```json
   {
      "status": "success",
      "data": {
         "original": "selamat",
         "translated": "salamat",
         "source": "indonesian",
         "target": "kenyah"
      }
   }

- **Error Response:**

      {
         "status": "error",
         "message": "Invalid source or target language"
      }

## 2. Search Dictionary

   • Endpoint: GET /api/search
   
   • Description: Searches the dictionary with fuzzy matching for  Kenyah or Indonesian words.

   • Query Parameters:

      • query (required): The search term (e.g., "rumah").
      • lang (optional): Language to search in (kenyah or indonesian, defaults to both).
      • limit (optional): Maximum number of results (default: 10).
   
   • Example Request:

      GET /api/search?query=rumah&lang=indonesian&limit=5

• Example Response:

      {
         "status": "success",
         "data": [
            {
               "word": "rumah",
               "translation": "uma",
               "language": "indonesian"
            },
            {
               "word": "rumah adat",
               "translation": "uma adat",
               "language": "indonesian"
            }
         ]
      }   

## 3. Save to Favorites

• Endpoint: POST /api/favorites

• Description: Saves a translation to the authenticated user's favorites.

• Request Body:

      {
         "word": "selamat",
         "translation": "salamat",
         "source": "indonesian",
         "target": "kenyah"
      }

• Example Response:

      {
         "status": "success",
         "message": "Translation saved to favorites",
         "data": {
            "id": "12345",
            "word": "selamat",
            "translation": "salamat"
         }
      }

• Error Response (Unauthorized):

      {
         "status": "error",
         "message": "Authentication required"
      }

## 4. Retrieve Audio Pronunciation

• Endpoint: GET /api/audio/:word

• Description: Retrieves the audio file for a word’s pronunciation.

• Parameters:
   
      • :word (required): The word to fetch audio for (e.g., "salamat").

• Example Request:

      GET /api/audio/salamat

• Example Response: Binary audio file (e.g., MP3 format).

• Error Response:

      {
         "status": "error",
         "message": "Audio not found for word: salamat"
      }

## 5. Get Cultural Notes

• Endpoint: GET /api/cultural-notes/:word

• Description: Retrieves cultural context and usage examples for a specific word.

• Parameters:

      • :word (required): The word to fetch notes for (e.g., "uma").

• Example Request:

      GET /api/cultural-notes/uma

• Example Response:

      {
         "status": "success",
         "data": {
            "word": "uma",
            "notes": "Uma refers to a traditional Kenyah house, often elevated on stilts.",
            "examples": [
               "Uma adat is a customary house used for ceremonies."
            ]
         }
      }

## Rate Limiting

• Maximum 100 requests per minute per IP address.

• Exceeding the limit returns a 429 Too Many Requests response.

## Error Codes

• 400 Bad Request: Invalid parameters or request format.

• 401 Unauthorized: Missing or invalid authentication.

• 404 Not Found: Resource not available.

• 429 Too Many Requests: Rate limit exceeded.

• 500 Internal Server Error: Server-side issue.

## Testing the API

You can test the API using tools like Postman or cURL. Example cURL command:

      curl -H "Authorization: Bearer <your-token>" "https://api.kamuskenyah-translator.com/api/translate?text=selamat&source=indonesian&target=kenyah"


## Future Enhancements

• Support for additional Kenyah dialects.

• Batch translation endpoint.

• API versioning (e.g., /v1/api/translate).

For questions or feedback, please open an issue on our [GitHub repository.](https://github.com/AlpianPPLG/KamusKenyah-Translator).
