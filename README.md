# French Color Fun

Create a very simple, kid-friendly French colour-matching web app.

GAMEPLAY

- Show one large colour card in the centre.

- The card should rise slowly into view with a smooth, playful animation.

- After it appears, show 3 answer buttons below it.

- Each button contains one lowercase French colour word:

  bleu, vert, rouge, orange, jaune, noir

- Display each word in the colour it names.

- Include one correct answer and two randomly selected incorrect answers.

- Randomize the order of the three choices.

CORRECT ANSWER

- Play a short, fun celebration animation with colourful stars, sparkles, or confetti.

- Briefly highlight the correct button.

- Automatically begin the next question immediately after the animation.

- Avoid showing extra messages or requiring a “next” button.

INCORRECT ANSWER

- Briefly shake or gently flash the selected button.

- Record the incorrect choice.

- Keep the same question visible so the student can try again.

SCORE

Place a small score counter in the top-right corner showing:

✓ correct number

✗ incorrect number

total number of choices made

DESIGN

- No title, instructions, menus, login, or unnecessary text.

- Use a clean white or very pale background.

- Use large rounded cards and buttons.

- Make it cheerful and accessible without looking cluttered or babyish.

- Use Helvetica or Arial.

- Make it work well on Chromebooks and tablets.

- Do not use external images or sound files.

- Use only simple CSS animations.

- Keep the codebase extremely small, clean, and easy to edit after exporting to GitHub.

- Do not add a database, authentication, backend, settings page, or extra features.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://couleur-m.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60046b7d-49a2-418d-9a2f-0d323b28cb14).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
