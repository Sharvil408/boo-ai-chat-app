/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- THIS LINE IS CRUCIAL!
  ],
  theme: {
    extend: {
      // Add your custom iOS colors here
      colors: {
        'ios-system-background': '#F2F2F7',
        'ios-system-grouped-background': '#F8F8F8',
        'ios-system-fill': '#FFFFFF',
        'ios-system-fill-light': '#F9F9F9',
        'ios-system-fill-medium': '#EFEFF4',
        'ios-system-fill-translucent': 'rgba(255, 255, 255, 0.8)',
        'ios-system-fill-translucent-medium': 'rgba(255, 255, 255, 0.6)',
        'ios-system-fill-translucent-dark': 'rgba(0, 0, 0, 0.7)',
        'ios-label': '#000000',
        'ios-secondary-label': '#6C6C70',
        'ios-tertiary-label': '#8E8E93',
        'ios-separator': '#E5E5EA',
        'ios-system-blue': '#007AFF',
        'ios-system-blue-dark': '#006EE6',
        'ios-blue-light': '#A2D2FF',
        'ios-purple-light': '#C7BFFF',
        'ios-pink-light': '#FFB3D9',
        'ios-system-yellow-light': '#FFF7E0',
        'ios-system-yellow-dark': '#B35F00',
        'ios-system-yellow-border': '#F8D588',
        'ios-system-blue-light': '#E6F2FF',
        'ios-system-blue-dark': '#0056B3',
        'ios-system-blue-border': '#A2D2FF',
        'ios-code-green': '#008000',
      },
      // Add your custom iOS box shadows here
      boxShadow: {
        'ios-header-light': '0 0.5px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.08)',
        'ios-card-light': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'inner-ios-light': 'inset 0 0.5px 1px rgba(0, 0, 0, 0.03)',
        'ios-subtle-light': '0 0.5px 1px rgba(0, 0, 0, 0.03)',
        'ios-bubble-light': '0 0.5px 1px rgba(0, 0, 0, 0.05)',
        'ios-image-light': '0 1px 4px rgba(0, 0, 0, 0.08)',
        'ios-button-light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'ios-modal-light': '0 10px 30px rgba(0, 0, 0, 0.15)',
        'ios-toast': '0 5px 15px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left-ios': {
          from: { transform: 'translateX(-5px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right-ios': {
          from: { transform: 'translateX(5px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'slide-in-up-toast': {
          from: { transform: 'translate(-50%, 20px)', opacity: '0' },
          to: { transform: 'translate(-50%, 0)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'slide-in-up': 'slide-in-up 0.3s ease-out forwards',
        'slide-in-left-ios': 'slide-in-left-ios 0.4s ease-out forwards',
        'slide-in-right-ios': 'slide-in-right-ios 0.4s ease-out forwards',
        'blob': 'blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9)',
        'slide-in-up-toast': 'slide-in-up-toast 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}