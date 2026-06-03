import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Sparkles, Mic, Send } from 'lucide-react-native';
import { useAppDispatch } from '../store/hooks';
import { setCurrentScreen } from '../store/appSlice';

const GLASS_STYLES = {
  card: "bg-[#1E1C18]/40 border border-[#D4AF37]/15",
};

export function ConciergeScreen() {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([
    { id: 1, text: "Good evening, Mr. Alexander. I am your Black Fleet Concierge. How may I elevate your evening?", isUser: false, type: 'text', location: null }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, isUser: true, type: 'text', location: null }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "I highly recommend Le Bernardin for an exceptional dining experience tonight. Shall I dispatch a driver to your location?", 
        isUser: false, 
        type: 'location',
        location: { name: "Le Bernardin", address: "155 W 51st St, New York, NY", rating: "4.9" }
      }]);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-[#0B0A08]"
    >
      <View className="px-6 py-4 border-b border-[#D4AF37]/10 flex-row items-center gap-3 bg-[#0B0A08]/90 mt-12">
        <View className="w-10 h-10 rounded-full bg-[#1E1C18] border border-[#D4AF37]/30 flex items-center justify-center relative">
          <Sparkles size={18} color="#D4AF37" />
          <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0B0A08]"></View>
        </View>
        <View>
          <Text className="text-[#F7F5F0] font-medium text-sm tracking-wide">Black Fleet Concierge</Text>
          <Text className="text-[#A39E93] text-[10px] uppercase tracking-widest">AI Assistant Online</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4" contentContainerStyle={{ gap: 24, paddingBottom: 100 }}>
        {messages.map((msg) => (
          <View key={msg.id} className={`flex-row ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <View className={`max-w-[85%] p-4 ${msg.isUser ? 'bg-[#D4AF37] rounded-2xl rounded-br-sm' : GLASS_STYLES.card + ' rounded-2xl rounded-bl-sm'}`}>
              <Text className={`text-sm font-medium leading-relaxed ${msg.isUser ? 'text-[#0B0A08]' : 'text-[#F7F5F0]'}`}>
                {msg.text}
              </Text>
              
              {msg.type === 'location' && msg.location && (
                <View className="mt-4 bg-[#0B0A08]/50 rounded-xl p-3 border border-[#D4AF37]/20">
                  <Text className="font-bold text-[#D4AF37] mb-1">{msg.location.name}</Text>
                  <Text className="text-xs text-[#A39E93] mb-3">{msg.location.address}</Text>
                  <TouchableOpacity 
                    onPress={() => dispatch(setCurrentScreen('booking'))} 
                    className="w-full py-2 bg-[#D4AF37] rounded-lg items-center"
                  >
                    <Text className="text-[#0B0A08] text-xs font-bold">BOOK RIDE HERE</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="px-6 py-4 pb-12 bg-[#0B0A08]">
        <View className="flex-row items-center gap-3 p-2 rounded-[2rem] bg-[#12100E] border border-white/5">
          <TouchableOpacity 
            onPress={() => setIsListening(!isListening)} 
            className={`w-10 h-10 rounded-[1.5rem] flex items-center justify-center ${isListening ? 'bg-red-500/20' : 'bg-[#221F1C]'}`}
          >
            <Mic size={18} color={isListening ? '#ef4444' : '#A39E93'} />
          </TouchableOpacity>
          <TextInput 
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            placeholder="Ask your concierge..." 
            placeholderTextColor="#A39E93"
            className="flex-1 bg-transparent text-sm text-[#F7F5F0]"
          />
          <TouchableOpacity 
            onPress={handleSend} 
            className={`w-10 h-10 rounded-[1.5rem] flex items-center justify-center ${input ? 'bg-[#D4AF37]' : 'bg-[#221F1C]'}`}
          >
            <Send size={16} color={input ? '#0B0A08' : '#A39E93'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
