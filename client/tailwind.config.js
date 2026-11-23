/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#101B35',
          blue: '#2563EB',
          teal: '#14B8A6',
          cyan: '#38BDF8',
          dark: '#0A0F1E'
        },
        bg: {
          main: '#F5F8FC',
          card: '#FFFFFF',
          bench: '#EDF2F7'
        },
        ink: {
          main: '#172033',
          muted: '#64748B',
          light: '#94A3B8'
        },
        border: {
          subtle: '#E2E8F0',
          focus: '#93C5FD'
        },
        status: {
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace']
      },
      borderRadius: {
        'card': '14px',
        'subtle': '10px'
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(16, 27, 53, 0.05), 0 1px 2px -1px rgba(16, 27, 53, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(16, 27, 53, 0.08), 0 8px 10px -6px rgba(16, 27, 53, 0.04)',
        'elevated': '0 20px 25px -5px rgba(16, 27, 53, 0.1), 0 8px 10px -6px rgba(16, 27, 53, 0.08)'
      }
    },
  },
  plugins: [],
};
