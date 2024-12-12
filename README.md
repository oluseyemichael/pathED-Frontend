# Frontend for PathED

This repository contains the frontend implementation for the All-in-One Self-Learning Platform. Built with React.js and Vite, it provides a responsive and user-friendly interface for accessing courses, quizzes, and progress tracking.

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic Content Rendering**: Displays courses, modules, and quizzes dynamically from the backend API.
- **User Authentication**: Integration with backend authentication for secure login and registration.
- **Progress Tracking**: Visual representation of user progress across courses and modules.
- **Interactive Quizzes**: Embedded quizzes with immediate feedback.

## Prerequisites

Ensure the following tools are installed before running the project:

- Node.js (v16+)
- npm or yarn
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oluseyemichael/pathED-Frontend.git
   cd pathED
   ```

2. Install dependencies:
   ```bash
   npm install
   # Or if using yarn
   yarn install
   ```

3. Configure the environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   # Or if using yarn
   yarn dev
   ```

   The application will be accessible at `http://localhost:3000` by default.

## Project Structure

- **src/components**: Reusable UI components (e.g., buttons, forms, modals).
- **src/pages**: Page-level components (e.g., Dashboard, LearningPath, Quiz).
- **src/services**: API integration logic (e.g., `api.js` for Axios requests).
- **src/styles**: Global and modular CSS/Tailwind styles.
- **src/routes**: App routing configuration.

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint to check for coding style issues.

## Integration with Backend

This frontend interacts with the backend via RESTful APIs. Ensure the backend is running and accessible at the URL specified in `VITE_API_BASE_URL`.

## Key Pages

- **Landing Page**: Overview of the platform with course previews.
- **Dashboard**: Displays user-specific data, enrolled courses, and progress.
- **Learning Path**: Shows modules in a selected course with video and blog resources.
- **Quiz Page**: Interactive quizzes with real-time feedback.

## Deployment

To deploy the application, follow these steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to a hosting service such as Vercel, Netlify, or your preferred platform.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

For issues or feature requests, please open an issue on the [GitHub repository](https://github.com/oluseyemichael/pathED-Frontend).
