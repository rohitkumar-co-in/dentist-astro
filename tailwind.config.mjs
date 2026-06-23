export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        aqua: '#00B4D8',
        darkAqua: '#0077B6',
        lightAqua: '#90E0EF',
        paleAqua: '#CAF0F8',
        charcoal: '#2B2D42',
        clinicWhite: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px rgba(0, 119, 182, 0.12)',
        card: '0 12px 28px rgba(43, 45, 66, 0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
