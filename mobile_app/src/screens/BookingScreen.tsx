import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { ArrowLeft, Car, Users, Banknote, Calendar, Clock, Star, MessageSquare, Phone } from 'lucide-react-native';
import { useAppDispatch } from '../store/hooks';
import { setCurrentScreen } from '../store/appSlice';

const GLASS_STYLES = {
  card: "bg-[#1E1C18]/40 border border-[#D4AF37]/15",
  heavy: "bg-[#0B0A08]/80 border-t border-[#D4AF37]/20",
};

const GOLD_GRADIENT = "bg-[#D4AF37]";

const { height } = Dimensions.get('window');

export function BookingScreen() {
  const dispatch = useAppDispatch();
  const [rideState, setRideState] = useState<'selecting' | 'loading' | 'live'>('selecting');
  const [islandExpanded, setIslandExpanded] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const liveAnim = React.useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: rideState === 'selecting' ? 0 : height,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    if (rideState === 'live') {
      Animated.timing(liveAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(liveAnim, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [rideState]);

  const handleConfirm = () => {
    setRideState('loading');
    setTimeout(() => {
      setRideState('live');
      setIslandExpanded(true);
      setTimeout(() => setIslandExpanded(false), 4500);
    }, 2500);
  };

  return (
    <View className="flex-1 relative bg-[#0B0A08]">
      <DynamicIsland 
        rideState={rideState} 
        expanded={islandExpanded} 
        onToggle={() => rideState === 'live' && setIslandExpanded(!islandExpanded)} 
      />

      <View className="absolute inset-0 opacity-40 bg-black">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800' }} 
          className="w-full h-full opacity-50"
          style={{ resizeMode: 'cover' }}
        />
      </View>

      <TouchableOpacity 
        onPress={() => dispatch(setCurrentScreen('home'))} 
        className={`absolute top-14 left-4 w-10 h-10 rounded-full ${GLASS_STYLES.card} flex items-center justify-center z-10 bg-[#1E1C18]`}
      >
        <ArrowLeft size={20} color="#F7F5F0" />
      </TouchableOpacity>

      {rideState === 'selecting' && (
        <View className={`absolute top-28 left-4 right-4 rounded-2xl p-4 ${GLASS_STYLES.card} flex-col gap-4 z-10 bg-[#1E1C18]`}>
           <View className="flex-row items-center gap-3">
              <View className="w-2 h-2 rounded-full bg-[#F7F5F0]"></View>
              <View className="flex-1 border-b border-[#A39E93]/20 pb-2">
                <Text className="text-[#F7F5F0] text-sm">The Ritz-Carlton, 10th Ave</Text>
              </View>
           </View>
           <View className="flex-row items-center gap-3 mt-2">
              <View className="w-2 h-2 rounded-full bg-[#D4AF37]"></View>
              <View className="flex-1">
                <Text className="text-[#F7F5F0] text-sm">JFK International Airport</Text>
              </View>
           </View>
        </View>
      )}

      {/* Bottom Sheet: Selecting Vehicle */}
      <Animated.View 
        style={{ transform: [{ translateY: slideAnim }] }}
        className={`absolute bottom-0 w-full rounded-t-[2.5rem] pt-6 px-4 pb-12 ${GLASS_STYLES.heavy} bg-[#0B0A08] shadow-lg z-20`}
      >
        <View className="flex-col gap-2 mb-4 bg-[#14120F] rounded-[1.5rem] p-2 border border-[#A39E93]/10">
          <CarOption name="Hatchback" seats="4" time="3 min" price="$13.00" active={false} />
          <CarOption name="Sedan" seats="4" time="2 min" price="$15.00" active={true} />
          <CarOption name="XUV" seats="7" time="4 min" price="$18.72" active={false} />
        </View>

        <View className="bg-[#14120F] rounded-[1.5rem] p-4 mb-6 border border-[#A39E93]/10">
          <Text className="text-[#F7F5F0] text-sm font-medium mb-4 tracking-wide">Select your rental hours</Text>
          <View className="flex-row gap-4 justify-between px-4">
            <RentalHourOption hours="1" active={false} />
            <RentalHourOption hours="4" active={true} />
            <RentalHourOption hours="8" active={false} />
          </View>
        </View>

        <View className="flex-row justify-around items-center mb-6 px-2">
          <ActionIcon icon={<Banknote />} label="Cash" active={true} />
          <ActionIcon icon={<Calendar />} label="Schedule" active={false} />
          <ActionIcon icon={<Clock />} label="Rentals" active={false} />
        </View>

        <TouchableOpacity 
          onPress={handleConfirm} 
          className="py-4 rounded-2xl bg-[#D4AF37] items-center mx-2 mb-8"
        >
          <Text className="text-lg font-bold tracking-wide text-[#0B0A08]">Book Now</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Sheet: Live Tracking */}
      <Animated.View 
        style={{ transform: [{ translateY: liveAnim }] }}
        className={`absolute bottom-0 w-full rounded-t-[2.5rem] pt-8 px-6 pb-12 ${GLASS_STYLES.heavy} bg-[#0B0A08] z-30`}
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-[#F7F5F0] text-2xl font-semibold mb-1">Anoop Vardhana</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-[#D4AF37] font-medium tracking-wider">SFP8989P</Text>
              <Text className="text-[#A39E93] text-sm">• Honda Vezel 1.5X</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Star size={14} color="#D4AF37" fill="#D4AF37" /> 
              <Text className="text-[#F7F5F0] text-sm ml-1">4.9 <Text className="text-[#A39E93]">(1,240 trips)</Text></Text>
            </View>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }} 
            className="w-16 h-16 rounded-full border-2 border-[#D4AF37]" 
          />
        </View>

        <View className="flex-row gap-4 mb-6">
          <TouchableOpacity className="flex-1 py-3 rounded-2xl bg-[#1E1C18] border border-[#A39E93]/20 flex-row items-center justify-center gap-2">
            <MessageSquare size={18} color="#D4AF37" />
            <Text className="text-[#F7F5F0]">Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 rounded-2xl bg-[#1E1C18] border border-[#A39E93]/20 flex-row items-center justify-center gap-2">
            <Phone size={18} color="#D4AF37" />
            <Text className="text-[#F7F5F0]">Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setRideState('selecting')} className="w-full py-4 items-center mb-6">
          <Text className="text-[#A39E93] font-medium tracking-wide">Cancel Ride</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function DynamicIsland({ rideState, expanded, onToggle }: any) {
  const isLive = rideState === 'live';
  const isExpanded = expanded && isLive;
  const isCompact = !expanded && (isLive || rideState === 'loading');
  const isLoading = rideState === 'loading';

  if (rideState === 'selecting') return null;

  return (
    <TouchableOpacity 
      onPress={onToggle}
      className={`absolute top-14 self-center bg-black rounded-[2.5rem] border border-white/10 z-[100] overflow-hidden flex-col shadow-lg
        ${isLoading ? 'w-[160px] h-[36px]' : isExpanded ? 'w-[350px] h-[165px]' : 'w-[200px] h-[36px]'}`}
    >
      {!isExpanded && (
        <View className="absolute inset-0 px-3 flex-row justify-between items-center h-full">
           <View className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
             <Text className="text-black font-bold text-[11px]">B</Text>
           </View>
           <View className="flex-row items-center gap-2">
              <View className="w-1.5 h-1.5 rounded-full bg-[#2E8B57]"></View>
              <Text className="text-[#2E8B57] font-semibold text-xs tracking-wide">{isLoading ? 'Requesting...' : '7 min'}</Text>
           </View>
        </View>
      )}

      {isExpanded && (
        <View className="px-5 py-4 w-full h-full flex-col justify-between">
          <View className="flex-row justify-between items-start">
            <View className="w-11 h-11 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Text className="text-black font-bold text-xl">B</Text>
            </View>
            <View className="flex-row items-center">
               <View className="bg-[#14120F] rounded-full p-1 border border-white/10 z-10 -mr-3">
                 <Car size={24} color="#F7F5F0" />
               </View>
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }} 
                 className="w-11 h-11 rounded-full border-2 border-black z-20" 
               />
            </View>
          </View>
          
          <View className="flex-row justify-between items-end mt-1">
            <View>
              <Text className="text-white font-semibold text-[17px] mb-0.5">Arriving in 7 min</Text>
              <Text className="text-[#A39E93] text-xs font-medium">123 Main Street</Text>
            </View>
            <View className="items-end">
              <Text className="text-[#F7F5F0] font-bold text-[17px] mb-0.5 uppercase tracking-wide">ABC4420</Text>
              <Text className="text-[#2E8B57] text-xs font-medium">Beige Toyota Camry</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

function CarOption({ name, seats, time, price, active }: any) {
  return (
    <TouchableOpacity className={`p-4 rounded-[1.25rem] flex-row items-center justify-between ${active ? 'bg-[#1E1C18]/60 border border-[#D4AF37]/20' : 'bg-transparent border border-transparent'}`}>
      <View className="flex-row items-center gap-4">
        <View className="w-14 h-8 flex items-center justify-center">
          <Car size={36} color={active ? '#D4AF37' : '#F7F5F0'} />
        </View>
        <View>
          <View className="flex-row items-center gap-2 mb-0.5">
            <Text className="font-medium text-[#F7F5F0] text-base">{name}</Text>
            <View className="flex-row items-center">
              <Users size={12} color="#A39E93" /> 
              <Text className="text-[#A39E93] text-xs font-medium ml-1">{seats}</Text>
            </View>
          </View>
          <Text className="text-[#A39E93] text-[11px]">12:35pm • {time} away</Text>
        </View>
      </View>
      <Text className="text-[#F7F5F0] font-semibold text-lg">{price}</Text>
    </TouchableOpacity>
  );
}

function RentalHourOption({ hours, active }: any) {
  return (
    <TouchableOpacity className="flex-row items-center gap-2">
       <View className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#D4AF37]' : 'border-[#A39E93]/40 border-dashed'}`}>
         <Text className={`text-sm font-semibold ${active ? 'text-[#D4AF37]' : 'text-[#A39E93]'}`}>{hours}</Text>
       </View>
       <Text className={`text-[13px] font-medium ${active ? 'text-[#F7F5F0]' : 'text-[#A39E93]'}`}>Hours</Text>
    </TouchableOpacity>
  );
}

function ActionIcon({ icon, label, active }: any) {
  return (
    <TouchableOpacity className="flex-col items-center gap-2.5">
      <View className={`w-12 h-12 rounded-full flex items-center justify-center border ${active ? 'bg-[#D4AF37] border-transparent' : 'bg-[#14120F] border-[#A39E93]/20'}`}>
         {React.cloneElement(icon, { size: 22, color: active ? '#0B0A08' : '#F7F5F0' })}
      </View>
      <Text className={`text-[10px] font-bold tracking-wide ${active ? 'text-[#D4AF37]' : 'text-[#A39E93]'}`}>{label}</Text>
    </TouchableOpacity>
  );
}
