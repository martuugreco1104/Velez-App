/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velez: {
          navy: '#001D4A',             // Azul noche del Amalfitani (Headers y contenedores de prestigio)
          blue: '#0055A4',             // Azul Italia / Francia tradicional (Acción primaria y CTAs)
          primary: '#0055A4',          // Alias primario
          dark: '#001D4A',             // Alias noche
          surface: '#F4F7FB',          // Blanco cemento/luz del Amalfitani (Fondo general)
          silver: '#E2E8F0',           // Plata y brillo institucional
          white: '#FFFFFF',            // Blanco puro Fortinero
          'tricolor-green': '#0A7E43', // Verde institucional de la bandera fundacional
          success: '#0A7E43',          // Alias éxito / al día
          warning: '#EA580C',          // Naranja advertencia (nunca amarillo)
          danger: '#DC2626',           // Rojo deuda / impago
        }
      },
      fontFamily: {
        sans: ['Gotham', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'velez-glow': '0 8px 24px -4px rgba(0, 85, 164, 0.25)',
        'nav-bar': '0 -4px 24px -2px rgba(11, 34, 64, 0.07)',
        'card-soft': '0 4px 20px -4px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 28px -6px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
