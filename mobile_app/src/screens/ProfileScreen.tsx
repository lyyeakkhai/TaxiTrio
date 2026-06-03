import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Star, CreditCard, History, Settings, ChevronRight } from 'lucide-react-native';

const GLASS_STYLES = {
  card: "bg-[#1E1C18]/40 border border-[#D4AF37]/15",
};

export function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-[#0B0A08]" contentContainerStyle={{ padding: 24, paddingTop: 64, paddingBottom: 120 }}>
      <Text className="text-[#F7F5F0] text-2xl font-medium tracking-tight mb-6">My Profile</Text>
      
      <View className={`p-6 rounded-[2rem] ${GLASS_STYLES.card} flex-col items-center`}>
        <View className="w-24 h-24 rounded-full border-[3px] border-[#D4AF37] p-1 mb-4 relative shadow-lg">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }} 
            className="w-full h-full rounded-full bg-neutral-800" 
          />
          <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#D4AF37] border-2 border-[#0B0A08]">
            <Star size={14} color="#0B0A08" fill="#0B0A08" />
          </View>
        </View>
        <Text className="text-[#F7F5F0] text-xl font-medium text-center">Alexander Wright</Text>
        <Text className="text-[#D4AF37] text-sm mt-1 uppercase tracking-widest font-medium text-center">Gold Member</Text>
        
        <View className="flex-row mt-6 pt-6 border-t border-[#A39E93]/20 w-full justify-around">
          <View className="items-center">
            <Text className="text-[#F7F5F0] text-xl font-semibold">142</Text>
            <Text className="text-[#A39E93] text-xs uppercase tracking-wider mt-1">Rides</Text>
          </View>
          <View className="items-center">
            <Text className="text-[#F7F5F0] text-xl font-semibold">4.98</Text>
            <Text className="text-[#A39E93] text-xs uppercase tracking-wider mt-1">Rating</Text>
          </View>
        </View>
      </View>

      <View className="flex-col gap-3 mt-8">
        <MenuItem icon={<CreditCard />} title="Payment Methods" subtitle="Visa ending in 4242" />
        <MenuItem icon={<History />} title="Ride History" subtitle="View past trips & invoices" />
        <MenuItem icon={<Settings />} title="Account Settings" subtitle="Privacy, notifications" />
      </View>
    </ScrollView>
  );
}

function MenuItem({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <TouchableOpacity className={`p-4 rounded-2xl ${GLASS_STYLES.card} flex-row items-center gap-4`}>
      <View className="w-10 h-10 rounded-full bg-[#0B0A08]/50 flex items-center justify-center">
        {React.cloneElement(icon, { size: 20, color: '#D4AF37' })}
      </View>
      <View className="flex-1">
        <Text className="text-[#F7F5F0] font-medium text-sm">{title}</Text>
        <Text className="text-[#A39E93] text-xs mt-0.5">{subtitle}</Text>
      </View>
      <ChevronRight size={18} color="#A39E93" />
    </TouchableOpacity>
  );
}
