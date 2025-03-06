# CONTRIBUTING.md


## Contributing to Kamus Kenyah Translator

Thank you for your interest in contributing to the Kamus Kenyah Translator! This project thrives on community support to preserve and promote the Kenyah language. We welcome contributions from developers, linguists, native speakers, and enthusiasts alike.

## How to Contribute

We especially need help with the following areas:

- Adding more Kenyah words, phrases, and translations.
- Improving translation accuracy and expanding the dictionary.
- Recording high-quality audio pronunciations by native speakers.
- Adding cultural context and usage examples to dictionary entries.
- Enhancing the user interface and experience across platforms.

### Contribution Process

1. **Fork the Repository**
   - Click the "Fork" button on the [GitHub repository](https://github.com/AlpianPPLG/KamusKenyah-Translator) to create a copy under your account.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/<your-username>/KamusKenyah-Translator.git
   cd KamusKenyah-Translator

3 Create a Feature Branch

• Use a descriptive branch name related to your contribution:

      git checkout -b feature/add-new-words

4 Make Changes

• Follow the coding style and conventions used in the project (e.g., Prettier for formatting).

• Update documentation (e.g., README.md, API.md) if your changes affect them.

• Test your changes locally:

      npm install
      npm start

5 Commit Your Changes

• Write clear, concise commit messages:

      git commit -m "Add 50 new Kenyah words to dictionary"

6 Push to Your Fork

      git push origin feature/add-new-words

7 Open a Pull Request (PR)

      • Go to the original repository and click "New Pull Request."

      • Select your branch and provide a detailed description of your changes.

      • Link any related issues (e.g., "Fixes #123").

8 Review Process

      • Maintainers will review your PR, provide feedback, and request changes if needed.

      • Respond to feedback and update your PR as necessary.

### Guidelines

• Code Quality:

    • Write clean, modular, and well-documented code.

    • Follow existing patterns in the React Native/Node.js codebase.

    • Ensure your code passes linting (npm run lint).

• Database Contributions:

      • For new words, update the words table in Supabase with translations.

      • For audio files, upload to the storage bucket and link in the audio_files table.

      • Add cultural notes to the cultural_notes table where applicable.

• Audio Recordings:

      • Use high-quality recording equipment (e.g., 44.1kHz, MP3 format).
         
      • Ensure pronunciations are by native Kenyah speakers or verified by experts.

• Testing:

    • Test your changes locally before submitting.

    • Include unit tests for new features where possible (npm run test).

• Commit Messages:

      • Use present tense (e.g., "Add feature" not "Added feature")

      • Reference issues or PRs where relevant (e.g., "Fix #45").

### Prerequisites

      • Tools: Node.js, npm, Git.

      • Environment Setup: Copy .env.example to .env and fill in Supabase/Google OAuth credentials.

      • Knowledge: Familiarity with React Native, Node.js, or Supabase is helpful but not required.

### Getting Help

      • Check the README.md for installation and usage details.

      • Open an issue on GitHub for questions or bugs.

      • Join our community (TBD: link to Discord or forum if available).

### Code of Conduct

We aim to foster an inclusive and respectful community. Please:

      • Be kind and considerate in all interactions.
 
      • Avoid offensive language or behavior.
 
      • Respect differing opinions and experiences.

### Recognition

Contributors are acknowledged in the README.md under "Acknowledgements." Your efforts help preserve the Kenyah language for future generations!

### License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for helping us build this valuable resource!