# Koinx

A modern, high-performance web application built with the TanStack ecosystem, React 19, and Vite. This project leverages Server-Side Rendering (SSR) and powerful routing capabilities to deliver a seamless user experience, styled with Tailwind CSS v4 and accessible Radix UI components.

## 🚀 Tech Stack

This project is built using a cutting-edge modern frontend stack:

* **Framework:** [React 19](https://react.dev/)
* **Routing & SSR:** [TanStack Start](https://tanstack.com/start/latest) & [TanStack Router](https://tanstack.com/router/latest)
* **Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
* **Build Tool:** [Vite](https://vitejs.dev/) with [Nitro](https://nitro.unjs.io/) and Cloudflare integrations
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & `tailwind-merge`
* **UI Components:** [Radix UI](https://www.radix-ui.com/) Primitives (Accordion, Dialog, Select, Tabs, etc.) + `lucide-react` for icons
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📦 Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** (v18 or higher recommended)
* **Bun** (This project uses Bun, as indicated by the `bun.lockb` and `bunfig.toml` configuration)

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd koinx
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will be available at http://localhost:3000 (or the port specified by Vite).*
# 📜 Available Scripts

The following npm scripts are defined in the `package.json`:

- **npm run dev** – Starts the Vite development server.
- **npm run build** – Compiles and bundles the application for production.
- **npm run build:dev** – Builds the application in development mode.
- **npm run preview** – Boots up a local web server to preview the production build.
- **npm run lint** – Runs ESLint to analyze the code for potential errors.
- **npm run format** – Uses Prettier to format the codebase.

---

# 🧱 Key Features & Libraries

- **Accessible UI**: Radix UI primitives ensure accessibility and customization.
- **Complex UI Elements**:  
  - `embla-carousel-react` for carousels  
  - `recharts` for data visualization  
  - `react-resizable-panels` for dynamic layouts
- **Date Handling**:  
  - `date-fns` for robust date manipulation  
  - `react-day-picker` for calendar interfaces
- **Edge-Ready**: Configured with `@cloudflare/vite-plugin` and **Nitro**, ready for deployment to Cloudflare Pages or Workers.

---

# 🧑‍💻 Code Quality

This project maintains strict code quality standards using:

- **ESLint v9** with React Hooks and React Refresh plugins
- **Prettier** for consistent code styling
- **TypeScript** for static type checking

---

### Built with ❤️ using **TanStack Start** & **React**
