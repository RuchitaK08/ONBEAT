import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 120px rgba(79, 70, 229, 0.18)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at top, rgba(79, 70, 229, 0.20), transparent 48%)'
      }
    }
  },
  plugins: []
};

export default config;
