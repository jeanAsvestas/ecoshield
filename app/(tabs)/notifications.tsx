import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { theme } from '@/constants/theme';

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  meta: string;
  severity: 'urgent' | 'info' | 'success';
  unread?: boolean;
};

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Επείγον: Επιβεβαιωμένη δραστηριότητα τρωκτικών',
    detail:
      'Εργασία #2481 στη Λεωφ. Κηφισίας. Ο πελάτης αναφέρει κοπράνια στο αποθετήριο. Απαιτείται εξοπλισμός προστασίας.',
    meta: 'Ανατέθηκε σε εσάς · 10 λεπτά πριν',
    severity: 'urgent',
    unread: true,
  },
  {
    id: '2',
    title: 'Ενημέρωση προγράμματος: Επιθεώρηση κατσαρίδων μετατοπίστηκε',
    detail:
      'Εργασία #2510 μετακινήθηκε στις 14:30. Κωδικός πρόσβασης προστέθηκε στη γραφική εργασία.',
    meta: 'Γραφείο λειτουργιών · 35 λεπτά πριν',
    severity: 'info',
    unread: true,
  },
  {
    id: '3',
    title: 'Εξαρτήματα έτοιμα για παραλαβή',
    detail:
      '2x σταθμούς δολώματος και 1x εφαρμογέα γέλης έτοιμα στο κέντρο διανομής.',
    meta: 'Αποθήκη · 1 ώρα πριν',
    severity: 'success',
  },
  {
    id: '4',
    title: 'Σημείωση πελάτη προστέθηκε',
    detail:
      'Παρακαλώ καλέστε κατά την άφιξη. Σκύλος στις εγκαταστάσεις, η πύλη είναι κλειδωμένη.',
    meta: 'Εργασία #2459 · 2 ώρες πριν',
    severity: 'info',
  },
  {
    id: '5',
    title: 'Επιθεώρηση ολοκληρώθηκε',
    detail:
      'Εργασία #2433 σημειώθηκε ως ολοκληρωμένη. Αναφορά φωτογραφίας μεταφορτώθηκε.',
    meta: 'Σύστημα · Χθες',
    severity: 'success',
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedView style={styles.header}>
          <View style={styles.titleRow}>
            <ThemedText type="title">Ειδοποιήσεις</ThemedText>
            <ThemedView
              style={[
                styles.badge,
                { backgroundColor: theme.colors.primary, flexShrink: 0 },
              ]}
            >
              <ThemedText style={styles.badgeText}>2 new</ThemedText>
            </ThemedView>
          </View>
          <ThemedText>
            Ενημερώσεις για τις ενεργές σας εργασίες και διαδρομές
          </ThemedText>
        </ThemedView>

        {notifications.map((item) => (
          <ThemedView
            key={item.id}
            style={[
              styles.card,
              item.unread ? styles.cardUnread : null,
              { borderColor: theme.colors.primary },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              </View>
              <ThemedView
                style={[
                  styles.pill,
                  styles.pillShrink,
                  { backgroundColor: severityColor(item.severity) },
                ]}
              >
                <ThemedText style={styles.pillText}>{item.severity}</ThemedText>
              </ThemedView>
            </View>
            <ThemedText>{item.detail}</ThemedText>
            <ThemedText style={styles.meta}>{item.meta}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function severityColor(level: NotificationItem['severity']) {
  if (level === 'urgent') {
    return theme.colors.errorDark;
  }
  if (level === 'success') {
    return theme.colors.successDark;
  }
  return theme.colors.info;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: 'column',
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.sm,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  cardUnread: {
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pillShrink: {
    flexShrink: 0,
  },
  pillText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xs,
    textTransform: 'uppercase',
  },
  meta: {
    opacity: 0.7,
    fontSize: 12,
  },
});
