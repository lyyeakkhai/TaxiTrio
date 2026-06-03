import '../global.css';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

export default function RootLayout() {
  return (
    <ClerkProvider 
      publishableKey={publishableKey} 
      tokenCache={tokenCache}
      appearance={{
        variables: {
          colorPrimary: '#D4AF37',
          colorBackground: '#0B0A08',
          colorText: '#F7F5F0',
          colorTextSecondary: '#A39E93',
          colorInputBackground: '#1A1816',
          colorInputText: '#F7F5F0',
          colorDanger: '#ef4444',
          colorSuccess: '#22c55e',
          colorWarning: '#f59e0b',
          borderRadius: '1rem', // Fully rounded inputs to match the rest of the app
        },
        layout: {
          socialButtonsVariant: 'iconButton',
          socialButtonsPlacement: 'bottom',
        },
        elements: {
          card: 'bg-[#0B0A08]/80 border border-[#D4AF37]/20 shadow-2xl',
          formButtonPrimary: 'bg-[#D4AF37] text-[#0B0A08] font-bold text-lg',
          formFieldInput: 'bg-[#1A1816]/60 border border-white/10 focus-within:border-[#D4AF37]/50 text-white',
          formFieldLabel: 'text-[#A39E93]',
          headerTitle: 'text-2xl font-bold tracking-wide text-[#F7F5F0]',
          headerSubtitle: 'text-[#A39E93] text-sm',
          footerActionLink: 'text-[#D4AF37] font-semibold',
          dividerText: 'text-[#A39E93]',
          dividerLine: 'bg-white/10',
          identityPreview: 'bg-[#1A1816] border border-white/10 text-white',
          identityPreviewEditButtonIcon: 'text-[#D4AF37]',
        }
      }}
    >
      <Provider store={store}>
        <Slot />
      </Provider>
    </ClerkProvider>
  );
}
