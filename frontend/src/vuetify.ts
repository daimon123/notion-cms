import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

// Vuetify 테마 및 기본값 설정
export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#005CAF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#F5F7FA',
          surface: '#FFFFFF',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#5CBBF6',
          accent: '#64B5F6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#121212',
          surface: '#1E1E1E',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      variant: 'elevated',
      rounded: 'lg',
    },
    VCard: {
      rounded: 'lg',
      elevation: 1,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
});
