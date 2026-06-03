import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Map, Wallet, User } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentScreen, ScreenType } from '../store/appSlice';

export function BottomNav() {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector((state) => state.app.currentScreen);

  return (
    <View className="absolute bottom-6 left-5 right-5 h-[72px] bg-[#0E0C0A] rounded-full flex-row justify-around items-center border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 px-2">
      <NavButton 
        icon={Home} 
        label="Home" 
        active={currentScreen === 'home' || currentScreen === 'booking'} 
        onClick={() => dispatch(setCurrentScreen('home'))} 
      />
      <NavButton 
        icon={Map} 
        label="Trips" 
        active={currentScreen === 'activity'} 
        onClick={() => dispatch(setCurrentScreen('activity'))} 
      />
      <NavButton 
        icon={Wallet} 
        label="Wallet" 
        active={currentScreen === 'concierge'} 
        onClick={() => dispatch(setCurrentScreen('concierge'))} 
      />
      <NavButton 
        icon={User} 
        label="Profile" 
        active={currentScreen === 'profile'} 
        onClick={() => dispatch(setCurrentScreen('profile'))} 
      />
    </View>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onClick} 
      className="items-center justify-center gap-1 w-16"
      activeOpacity={0.7}
    >
      <View className="transition-all duration-300">
        <Icon 
          size={24} 
          strokeWidth={active ? 2.5 : 2}
          color={active ? '#D4AF37' : '#A39E93'}
          fill={active ? 'currentColor' : 'none'}
        />
      </View>
      <Text className={`text-[11px] font-medium tracking-wide ${active ? 'text-[#D4AF37]' : 'text-[#A39E93]'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
