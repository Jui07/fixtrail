/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bench: {
          paper: '#F7F5F0',
          ink: '#1C2321',
          border: '#E5E2D9',
          muted: '#525E59',
          card: '#FFFFFF',
          dark: '#181A1B'
        },
        teal: {
          DEFAULT: '#0F766E',
          light: '#F0FDFA',
          hover: '#115E59',
          border: '#99F6E4'
        },
        risk: {
          safe: '#15803D',
          safebg: '#DCFCE7',
          safeborder: '#86EFAC',
          careful: '#B45309',
          carefulbg: '#FEF3C7',
          carefulborder: '#FDE68A',
          advanced: '#B91C1C',
          advancedbg: '#FEE2E2',
          advancedborder: '#FCA5A5'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      borderRadius: {
        'bench': '11px'
      },
      boxShadow: {
        'bench': '0 1px 3px rgba(28, 35, 33, 0.05), 0 4px 12px rgba(28, 35, 33, 0.03)'
      }
    },
  },
  plugins: [],
}
