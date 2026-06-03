import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin, Car } from 'lucide-react-native';
import { useAppDispatch } from '../store/hooks';
import { setCurrentScreen } from '../store/appSlice';

const GLASS_STYLES = {
  input: "bg-[#1A1816]/60 border border-white/10",
};

export function ActivityScreen() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  return (
    <View className="flex-1 bg-[#0B0A08] p-6 pt-16 pb-32 relative">
      <Text className="text-[#F7F5F0] text-2xl font-medium tracking-tight mb-4">Activity</Text>

      <View className={`p-1.5 rounded-full ${GLASS_STYLES.input} flex-row items-center justify-between relative`}>
         <View 
           className={`absolute top-1.5 bottom-1.5 w-[32%] bg-[#D4AF37] rounded-full`} 
           style={{
             left: activeTab === 'upcoming' ? '1.5%' : activeTab === 'completed' ? '34%' : '66.5%',
           }}
         />
         
         <TouchableOpacity onPress={() => setActiveTab('upcoming')} className="flex-1 py-2.5 z-10 items-center">
           <Text className={`text-xs font-semibold ${activeTab === 'upcoming' ? 'text-[#0B0A08]' : 'text-[#A39E93]'}`}>Upcoming</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setActiveTab('completed')} className="flex-1 py-2.5 z-10 items-center">
           <Text className={`text-xs font-semibold ${activeTab === 'completed' ? 'text-[#0B0A08]' : 'text-[#A39E93]'}`}>Completed</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setActiveTab('cancelled')} className="flex-1 py-2.5 z-10 items-center">
           <Text className={`text-xs font-semibold ${activeTab === 'cancelled' ? 'text-[#0B0A08]' : 'text-[#A39E93]'}`}>Cancelled</Text>
         </TouchableOpacity>
      </View>

      <View className="flex-1 flex-col items-center justify-center opacity-60 mt-10">
         <View className="w-20 h-20 rounded-full border border-[#D4AF37]/20 flex items-center justify-center mb-4 bg-[#1E1C18]">
            <MapPin size={32} color="#D4AF37" />
         </View>
         <Text className="text-[#F7F5F0] text-lg font-medium mb-1">No {activeTab} rides</Text>
         <Text className="text-[#A39E93] text-sm text-center px-4">
           You do not have any {activeTab} activity to display at this time.
         </Text>
      </View>

      <View className="absolute bottom-28 left-0 right-0 px-6 items-center">
        <TouchableOpacity 
          onPress={() => dispatch(setCurrentScreen('booking'))}
          className="px-8 py-4 rounded-full bg-[#D4AF37] flex-row items-center gap-2"
        >
          <Car size={20} color="#0B0A08" /> 
          <Text className="text-base font-bold tracking-wide text-[#0B0A08]">Book a Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
