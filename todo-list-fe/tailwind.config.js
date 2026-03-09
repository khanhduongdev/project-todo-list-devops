/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        priority: {
          urgent: '#ef4444',    // red-500
          important: '#f59e0b', // amber-500
          normal: '#3b82f6',    // blue-500
        }
      }
    },
  },
  plugins: [],
}
