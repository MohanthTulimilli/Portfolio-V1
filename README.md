# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Contact form – thank-you email to submitter

When someone submits the contact form, you get their message via Formspree. They also receive an automatic thank-you email (e.g. “Thanks for your message, I’ll get back to you soon”) sent via [Resend](https://resend.com).

To enable the thank-you email:

1. Create an account at [resend.com](https://resend.com) and get an API key.
2. Copy `.env.example` to `.env` and set `RESEND_API_KEY=re_xxxx`.
3. Deploy to **Vercel** (the `/api` folder is used as serverless functions). In the Vercel project settings, add the same env var `RESEND_API_KEY`.
4. Optional: In Resend, verify your domain and set `FROM_EMAIL` in `.env` / Vercel (e.g. `Mohanth <hello@yourdomain.com>`). Otherwise emails send from `onboarding@resend.dev` (Resend’s test sender).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
