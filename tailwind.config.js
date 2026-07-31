/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0A0A0A',
        'bg-light': '#E5E5E0',
        'bg-card': '#F0F0EB',
        'accent-teal': '#5C8D9C',
        'accent-orange': '#D95B2D',
        'accent-green': '#1A452B',
        'accent-purple': '#5A3FFF',
        'text-muted': '#888888',
        'text-muted-light': '#6B6B6B',
        'text-off-white': '#C8C8C8',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        classy: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      zIndex: {
        'canvas': '0',
        'content': '10',
        'cursor': '40',
        'nav': '50',
        'overlay': '100',
      },
      borderRadius: {
        'section': '60px',
        'card': '20px',
        'pillar': '16px',
        'pill': '999px',
      },
    },
  },
  plugins: [],
}
