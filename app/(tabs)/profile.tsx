import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogout = () => {
    // TODO: wire up logout logic
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Profile</ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">Όνομα</ThemedText>
          <ThemedText>Γιώργος Παπαδόπουλος</ThemedText>

          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Ιδιότητα
          </ThemedText>
          <ThemedText>Τεχνικός</ThemedText>
        </ThemedView>

        <Pressable
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: colors.tint }]}
        >
          <ThemedText style={styles.logoutText}>Αποσύνδεση</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  sectionTitle: {
    marginTop: 12,
  },
  logoutButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#000000',
  },
});
