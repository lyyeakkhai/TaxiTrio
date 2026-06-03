import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Star, Search, Clock, Home, Briefcase, Car, MapPin, ChevronRight } from 'lucide-react-native';
import { useAppDispatch } from '../store/hooks';
import { setCurrentScreen } from '../store/appSlice';

const GLASS_STYLES = {
  card: "bg-[#1E1C18]/40 border border-[#D4AF37]/15",
  heavy: "bg-[#0B0A08]/80 border-t border-[#D4AF37]/20",
  input: "bg-[#1A1816]/60 border border-white/10",
};

const GOLD_GRADIENT = "bg-[#D4AF37]"; // Simplified for RN

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const onNavigate = (screen: any) => dispatch(setCurrentScreen(screen));

  return (
    <ScrollView className="flex-1 bg-[#0B0A08]" contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Subtle Map Background */}
      <View className="absolute top-0 left-0 right-0 h-[300px] opacity-40">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800' }}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        {/* Simple gradient overlay instead of maskImage */}
        <View className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0A08]" />
      </View>

      <View className="relative z-10 p-6 flex-col gap-7 mt-8">
        
        {/* Header Profile Section */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-4">
            <View className="relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }} 
                className="w-12 h-12 rounded-full border border-[#D4AF37]/50" 
              />
              <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0B0A08] rounded-full flex items-center justify-center">
                <Star size={10} color="#D4AF37" fill="#D4AF37" />
              </View>
            </View>
            <View>
              <Text className="text-[#A39E93] text-[11px] uppercase tracking-widest font-medium mb-0.5">Welcome Back</Text>
              <Text className="text-[#F7F5F0] text-xl font-semibold tracking-wide">Mr. Alexander</Text>
            </View>
          </View>
          <TouchableOpacity className={`w-10 h-10 rounded-full ${GLASS_STYLES.card} flex items-center justify-center relative`}>
            <Bell size={18} color="#D4AF37" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0A08]"></View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Ride Card */}
        <UpcomingRideCard onNavigate={onNavigate} />

        {/* Floating Action Card */}
        <View className={`rounded-[2rem] p-5 shadow-2xl ${GLASS_STYLES.heavy} border border-[#D4AF37]/10`}>
          <TouchableOpacity 
            onPress={() => onNavigate('booking')}
            className="p-4 rounded-full bg-[#12100E] border border-white/5 flex-row items-center gap-4"
          >
            <Search color="#D4AF37" size={20} />
            <View className="flex-1">
              <Text className="text-[#F7F5F0] text-sm font-medium">Where to?</Text>
            </View>
            <View className="w-8 h-8 rounded-full bg-[#1A1816] flex items-center justify-center">
              <Clock color="#A39E93" size={14} />
            </View>
          </TouchableOpacity>

          <View className="flex-row gap-4 mt-5 px-3">
            <QuickAction icon={<Home size={18} color="#A39E93" />} title="Home" subtitle="12 km" />
            <View className="w-px h-10 bg-white/10 self-center"></View>
            <QuickAction icon={<Briefcase size={18} color="#A39E93" />} title="Work" subtitle="4.5 km" />
          </View>
        </View>

        {/* Premium Fleet Horizontal Scroll */}
        <View>
          <View className="flex-row justify-between items-end mb-4 px-1">
            <Text className="text-[#F7F5F0] text-lg font-medium tracking-wide">Premium Fleet</Text>
            <Text className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">View All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6" contentContainerStyle={{ gap: 16, paddingRight: 48 }}>
            <FleetCard name="Black Sedan" eta="3 min" price="from $45" active={true} />
            <FleetCard name="Luxury SUV" eta="7 min" price="from $65" active={false} />
            <FleetCard name="First Class" eta="12 min" price="from $120" active={false} />
          </ScrollView>
        </View>

        {/* Curated Experiences */}
        <View className="mt-4">
          <View className="flex-row justify-between items-end mb-4 px-1">
            <Text className="text-[#F7F5F0] text-lg font-medium tracking-wide">Curated Experiences</Text>
            <Text className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">Explore All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6" contentContainerStyle={{ gap: 16, paddingRight: 48 }}>
            <RecommendationCard 
              title="Le Bernardin" 
              category="Fine Dining" 
              imageUrl="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop" 
            />
            <RecommendationCard 
              title="The Plaza Hotel" 
              category="Luxury Stay" 
              imageUrl="https://images.unsplash.com/photo-1566733971017-f6a46e832b95?w=400&h=300&fit=crop" 
            />
            <RecommendationCard 
              title="MoMA Exclusive" 
              category="Art & Culture" 
              imageUrl="https://images.unsplash.com/photo-1582561424760-0d2dcbfdc3e9?w=400&h=300&fit=crop" 
            />
          </ScrollView>
        </View>

        {/* Recent Locations */}
        <View className="mt-4">
          <Text className="text-[#F7F5F0] text-lg font-medium tracking-wide mb-3 px-1">Recent Locations</Text>
          <View className={`rounded-[1.5rem] p-2 flex-col ${GLASS_STYLES.card} border border-white/5`}>
             <RecentLocation title="The Ritz-Carlton" address="10th Avenue, New York" />
             <View className="h-px w-full bg-white/5 my-1 rounded-full"></View>
             <RecentLocation title="JFK International Airport" address="Terminal 4, Queens" />
             <View className="h-px w-full bg-white/5 my-1 rounded-full"></View>
             <RecentLocation title="Le Bernardin" address="155 W 51st St, New York" />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

function QuickAction({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <TouchableOpacity className="flex-row items-center gap-3 flex-1">
      <View className="w-10 h-10 rounded-full bg-[#1A1816] flex items-center justify-center border border-white/5">
        {icon}
      </View>
      <View>
        <Text className="text-[#F7F5F0] text-[13px] font-semibold">{title}</Text>
        <Text className="text-[#A39E93] text-[10px] tracking-wide mt-0.5">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

function FleetCard({ name, eta, price, active }: { name: string, eta: string, price: string, active: boolean }) {
  return (
    <TouchableOpacity className={`w-[150px] p-4 rounded-[1.5rem] flex-col gap-4 ${active ? 'bg-[#1A1816] border border-[#D4AF37]/40' : GLASS_STYLES.card}`}>
       <View className="flex-row justify-between items-start">
         <View className={`p-2.5 rounded-full ${active ? GOLD_GRADIENT : 'bg-black/50'}`}>
           <Car size={20} color={active ? '#0B0A08' : '#D4AF37'} />
         </View>
         <View className={`px-2.5 py-1 rounded-full ${active ? 'bg-[#D4AF37]/10' : 'bg-black/40'}`}>
           <Text className={`text-[10px] font-medium ${active ? 'text-[#D4AF37]' : 'text-[#A39E93]'}`}>{eta}</Text>
         </View>
       </View>
       <View className="mt-2">
         <Text className="text-[#F7F5F0] text-sm font-semibold mb-1">{name}</Text>
         <Text className="text-[#A39E93] text-xs font-medium">{price}</Text>
       </View>
    </TouchableOpacity>
  );
}

function RecentLocation({ title, address }: { title: string, address: string }) {
  return (
    <TouchableOpacity className="flex-row items-center gap-4 p-3 rounded-xl">
      <View className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center border border-white/5">
        <MapPin size={16} color="#A39E93" />
      </View>
      <View>
        <Text className="text-[#F7F5F0] text-sm font-medium">{title}</Text>
        <Text className="text-[#A39E93] text-[11px] mt-1">{address}</Text>
      </View>
    </TouchableOpacity>
  );
}

function UpcomingRideCard({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <TouchableOpacity onPress={() => onNavigate('booking')} className={`rounded-[1.5rem] p-5 ${GLASS_STYLES.card} border-l-[3px] border-l-[#D4AF37] relative overflow-hidden`}>
      <View className="flex-row justify-between items-center mb-4">
         <View className="flex-row items-center gap-2.5">
            <View className="w-2 h-2 rounded-full bg-[#D4AF37]"></View>
            <Text className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Upcoming • 7:00 PM</Text>
         </View>
         <View className="bg-[#0B0A08]/60 rounded-full px-3 py-1.5 flex-row items-center gap-1.5 border border-white/5">
            <Car size={12} color="#A39E93"/>
            <Text className="text-white text-[10px] font-medium tracking-wide">Black Sedan</Text>
         </View>
      </View>
      
      <View className="flex-row gap-4 items-center">
         <View className="flex-col items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-[#F7F5F0]"></View>
            <View className="w-px h-6 bg-white/20 my-1"></View>
            <View className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></View>
         </View>
         <View className="flex-1 justify-between h-[42px]">
            <Text className="text-[#F7F5F0] text-sm font-medium">The Ritz-Carlton, 10th Ave</Text>
            <Text className="text-[#F7F5F0] text-sm font-medium mt-1">JFK International Airport</Text>
         </View>
         <View className="w-8 h-8 rounded-full bg-[#1A1816] flex items-center justify-center border border-white/5">
            <ChevronRight size={16} color="#A39E93" />
         </View>
      </View>
    </TouchableOpacity>
  );
}

function RecommendationCard({ title, category, imageUrl }: { title: string, category: string, imageUrl: string }) {
  return (
    <TouchableOpacity className="w-[180px] h-[220px] rounded-[1.5rem] relative overflow-hidden border border-white/5">
      <Image source={{ uri: imageUrl }} className="absolute inset-0 w-full h-full" style={{ resizeMode: 'cover' }} />
      <View className="absolute inset-0 bg-black/40" />
      
      <View className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
        <MapPin size={12} color="#fff" />
      </View>

      <View className="absolute bottom-4 left-4 pr-4">
         <Text className="text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">{category}</Text>
         <Text className="text-[#F7F5F0] text-sm font-semibold leading-tight">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
