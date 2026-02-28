import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { theme } from '@/constants/theme';

export default function ProfileScreen() {
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

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
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
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    marginTop: theme.spacing.md,
  },
  logoutButton: {
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  logoutText: {
    color: theme.colors.textInverse,
  },
});
