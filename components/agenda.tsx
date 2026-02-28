// import isEmpty from 'lodash/isEmpty';
import { theme } from '@/constants/theme';
import React, { useCallback } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import testIDs from '../testIDs';

interface ItemProps {
  item: any;
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props;

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, [item]);

  if (Object.keys(item).length === 0) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={itemPressed}
      style={styles.item}
      //   testID={testIDs.agenda.ITEM}
    >
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button
          color={theme.colors.icon}
          title={'Info'}
          onPress={buttonPressed}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    flexDirection: 'row',
  },
  itemHourText: {
    color: theme.colors.textPrimary,
  },
  itemDurationText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
  itemTitleText: {
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.lg,
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.lg,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: theme.spacing.xl,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  emptyItemText: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
  },
});
