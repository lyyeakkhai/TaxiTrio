import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, ActivityIndicator } from 'react-native';
import { useOAuth } from '@clerk/expo';
import { Car } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

// Warm up the browser on Android to improve performance
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export function AuthScreen() {
  useWarmUpBrowser();
  const [isLoading, setIsLoading] = React.useState(false);

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });

  const onSelectAuth = useCallback(async (strategy: 'google' | 'apple') => {
    try {
      setIsLoading(true);
      const startOAuthFlow = strategy === 'google' ? startGoogleOAuthFlow : startAppleOAuthFlow;
      
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    } finally {
      setIsLoading(false);
    }
  }, [startGoogleOAuthFlow, startAppleOAuthFlow]);

  return (
    <View className="flex-1 bg-[#0B0A08] px-6 justify-center">
      {/* Background Element */}
      <View className="absolute inset-0 opacity-20">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800' }}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        <View className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] to-transparent" />
      </View>

      <View className="z-10 items-center mb-12">
        <View className="w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <Car size={40} color="#0B0A08" strokeWidth={1.5} />
        </View>
        <Text className="text-[#F7F5F0] text-4xl font-bold tracking-wider mb-2">TaxiTrio</Text>
        <Text className="text-[#A39E93] text-base text-center">Elevate your journey with our premium fleet.</Text>
      </View>

      <View className="z-10 flex-col gap-4">
        <TouchableOpacity 
          disabled={isLoading}
          onPress={() => onSelectAuth('google')}
          className="w-full py-4 rounded-2xl bg-[#1E1C18] border border-white/10 flex-row items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          {isLoading ? <ActivityIndicator color="#F7F5F0" /> : (
            <>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} className="w-5 h-5" />
              <Text className="text-[#F7F5F0] font-semibold text-lg">Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        {Platform.OS !== 'android' && (
          <TouchableOpacity 
            disabled={isLoading}
            onPress={() => onSelectAuth('apple')}
            className="w-full py-4 rounded-2xl bg-[#F7F5F0] flex-row items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            {isLoading ? <ActivityIndicator color="#0B0A08" /> : (
              <>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }} className="w-5 h-5" />
                <Text className="text-[#0B0A08] font-semibold text-lg">Continue with Apple</Text>
              </>
            )}
          </TouchableOpacity>
        )}
        
        <View className="flex-row items-center my-4 opacity-50">
          <View className="flex-1 h-px bg-[#A39E93]" />
          <Text className="px-4 text-[#A39E93] font-medium">OR</Text>
          <View className="flex-1 h-px bg-[#A39E93]" />
        </View>

        <TouchableOpacity className="w-full py-4 rounded-2xl bg-[#D4AF37] flex-row items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98] transition-transform">
          <Text className="text-[#0B0A08] font-bold text-lg">Sign In with Email</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-[#A39E93] text-xs text-center mt-12 z-10 opacity-60">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
}
