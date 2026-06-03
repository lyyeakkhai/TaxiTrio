import { useAuth, useUser, useClerk, useUserProfileModal } from '@clerk/expo'
import { AuthView, UserButton } from '@clerk/expo/native'
import { View, ActivityIndicator } from 'react-native'
import { useAppSelector } from '../store/hooks'
import { BottomNav } from '../components/BottomNav'
import { HomeScreen } from '../screens/HomeScreen'
import { BookingScreen } from '../screens/BookingScreen'
import { ActivityScreen } from '../screens/ActivityScreen'
import { ConciergeScreen } from '../screens/ConciergeScreen'
import { ProfileScreen } from '../screens/ProfileScreen'

export default function MainScreen() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false })
  const currentScreen = useAppSelector((state) => state.app.currentScreen);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0B0A08]">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    )
  }

  if (!isSignedIn) {
    return <AuthView mode="signInOrUp" />
  }

  return (
    <View className="flex-1 bg-[#0B0A08] relative">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'booking' && <BookingScreen />}
      {currentScreen === 'activity' && <ActivityScreen />}
      {currentScreen === 'concierge' && <ConciergeScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}

      {currentScreen !== 'booking' && <BottomNav />}
    </View>
  )
}

