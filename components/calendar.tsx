import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from 'react-native-calendars';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Height constants
const WEEK_HEIGHT: number = 120;
const MONTH_HEIGHT: number = 350;

interface ExpandableCalendarCompProps {
  onDateSelect?: (date: string) => void;
}

interface GestureContext {
  startHeight: number;
}

const ExpandableCalendarComp: React.FC<ExpandableCalendarCompProps> = ({
  onDateSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Animated value for calendar height
  const height = useSharedValue<number>(WEEK_HEIGHT);

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded);
    height.value = withSpring(isExpanded ? WEEK_HEIGHT : MONTH_HEIGHT, {
      damping: 20,
      stiffness: 90,
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
    })
    .onUpdate((event) => {
      'worklet';
      const context = event as unknown as { startHeight?: number };

      if (context.startHeight === undefined) {
        context.startHeight = height.value;
      }

      // Calculate new height based on drag
      const newHeight = context.startHeight + event.translationY;

      // Clamp between week and month height
      if (newHeight >= WEEK_HEIGHT && newHeight <= MONTH_HEIGHT) {
        height.value = newHeight;
      }
    })
    .onEnd((event) => {
      'worklet';
      // Determine if we should expand or collapse based on velocity and position
      const threshold = (WEEK_HEIGHT + MONTH_HEIGHT) / 2;
      const shouldExpand = height.value > threshold || event.velocityY > 500;

      height.value = withSpring(shouldExpand ? MONTH_HEIGHT : WEEK_HEIGHT, {
        damping: 20,
        stiffness: 90,
      });

      runOnJS(setIsExpanded)(shouldExpand);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const handleDayPress = (day: DateData): void => {
    setSelectedDate(day.dateString);
    onDateSelect?.(day.dateString);
  };

  // Get current week dates for week view
  const getCurrentWeekDates = (): string[] => {
    const current: Date = new Date(selectedDate);
    const week: string[] = [];

    // Get Sunday of current week
    const first: number = current.getDate() - current.getDay();

    for (let i = 0; i < 7; i++) {
      const date: Date = new Date(current);
      date.setDate(first + i);
      week.push(date.toISOString().split('T')[0]);
    }

    return week;
  };

  const weekDates: string[] = getCurrentWeekDates();
  const markedDates: {
    [key: string]: {
      selected: boolean;
      selectedColor: string;
      selectedTextColor: string;
    };
  } = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#2196F3',
      selectedTextColor: '#FFFFFF',
    },
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.calendarContainer, animatedStyle]}>
          <CalendarProvider date={selectedDate}>
            <ExpandableCalendar
              //   initialPosition={'open'}
              current={selectedDate}
              onDayPress={handleDayPress}
              markedDates={markedDates}
              theme={{
                todayTextColor: '#2196F3',
                selectedDayBackgroundColor: '#2196F3',
                selectedDayTextColor: '#FFFFFF',
                arrowColor: '#2196F3',
                monthTextColor: '#333',
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              style={styles.calendar}
              hideExtraDays={!isExpanded}
            />
          </CalendarProvider>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  calendarContainer: {
    width: width,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  calendar: {
    width: width,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#BDBDBD',
    borderRadius: 2,
    marginBottom: 5,
  },
  dragText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '600',
  },
});

export default ExpandableCalendarComp;
