import React from 'react';
import { View, Text } from 'react-native';

export function AuthScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-[#0B0A08]">
      <Text className="text-[#D4AF37] text-2xl font-bold mb-2">TaxiTrio</Text>
      <Text className="text-[#A39E93] text-sm">Please use the iOS or Android app to sign in.</Text>
    </View>
  );
}
