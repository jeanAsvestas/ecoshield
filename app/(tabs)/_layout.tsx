import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { theme } from '@/constants/theme';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { OpaqueColorValue } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={require('@/assets/images/logo1.webp')}
              style={{
                width: 28,
                height: 28,
                opacity: focused ? 1 : 0.5,
              }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }: { color: string | OpaqueColorValue }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'ΓΠ',
          tabBarIcon: ({ color }: { color: string | OpaqueColorValue }) => (
            <Entypo name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Ειδοποιήσεις',
          tabBarIcon: ({ color }: { color: string | OpaqueColorValue }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="test2"
        options={{
          title: 'Test',
          tabBarIcon: ({ color }: { color: string | OpaqueColorValue }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
