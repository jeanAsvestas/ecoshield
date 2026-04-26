import { theme } from '@/constants/theme';
import { isValidKey } from '@/utils/helper-functions';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// ─── Types ───────────────────────────────────────────────────────────────────
interface CalendarComponentProps {
  onDateSelect?: (date: string) => void;
}

interface DayInfo {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

type WeekRow = DayInfo[];

// ─── Constants ───────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_NAMES_GR = {
  January: 'Ιανουάριος',
  February: 'Φεβρουάριος',
  March: 'Μάρτιος',
  April: 'Απρίλιος',
  May: 'Μάιος',
  June: 'Ιούνιος',
  July: 'Ιούλιος',
  August: 'Αύγουστος',
  September: 'Σεπτέμβριος',
  October: 'Οκτώβριος',
  November: 'Νοέμβριος',
  December: 'Δεκέμβριος',
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_LABELS_GR = {
  Mon: 'Δε',
  Tue: 'Τρ',
  Wed: 'Τε',
  Thu: 'Πε',
  Fri: 'Πα',
  Sat: 'Σα',
  Sun: 'Κυ',
};
const ROW_HEIGHT = 44;
const TIMING_CONFIG = { duration: 250, easing: Easing.out(Easing.cubic) };

// ─── Date Helpers ────────────────────────────────────────────────────────────
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Returns 0-6 where 0 = Monday, 6 = Sunday */
function getFirstDayOfWeek(year: number, month: number): number {
  const jsDay = new Date(year, month, 1).getDay(); // 0 = Sun
  return jsDay === 0 ? 6 : jsDay - 1;
}

function formatDate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function getWeeksOfMonth(year: number, month: number): WeekRow[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOfWeek(year, month);

  // Previous month info for leading days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // Next month info for trailing days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const weeks: WeekRow[] = [];
  let currentWeek: WeekRow = [];

  // Fill leading days from previous month
  for (let i = firstDayOffset - 1; i >= 0; i--) {
    currentWeek.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
    });
  }

  // Fill current month days
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push({ day, month, year, isCurrentMonth: true });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing days from next month
  if (currentWeek.length > 0) {
    let nextDay = 1;
    while (currentWeek.length < 7) {
      currentWeek.push({
        day: nextDay++,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
      });
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

function getWeekIndexForDay(weeks: WeekRow[], day: number): number {
  const idx = weeks.findIndex((week) =>
    week.some((d) => d.day === day && d.isCurrentMonth)
  );
  return idx === -1 ? 0 : idx;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CalendarComponent({
  onDateSelect,
}: CalendarComponentProps) {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const todayStr = formatDate(todayYear, todayMonth, todayDay);

  // ── State ────────────────────────────────────────────────────────────────
  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [isExpanded, setIsExpanded] = useState(false);

  // ── Shared values ────────────────────────────────────────────────────────
  const progress = useSharedValue(0); // 0 = week, 1 = month
  const dragStart = useSharedValue(0);

  // ── Derived data ─────────────────────────────────────────────────────────
  const weeks = useMemo(
    () => getWeeksOfMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );
  const totalWeeks = weeks.length;

  const isCurrentMonth =
    currentYear === todayYear && currentMonth === todayMonth;

  const activeWeekIndex = useMemo(() => {
    const [sy, sm, sd] = selectedDate.split('-').map(Number);
    // If the selected date lives in the displayed month, show that week
    if (sy === currentYear && sm - 1 === currentMonth) {
      return getWeekIndexForDay(weeks, sd);
    }
    // Current month → show today's week
    if (isCurrentMonth) {
      return getWeekIndexForDay(weeks, todayDay);
    }
    // Other month → first week
    return 0;
  }, [
    weeks,
    selectedDate,
    currentYear,
    currentMonth,
    isCurrentMonth,
    todayDay,
  ]);

  const todayWeekIndex = isCurrentMonth
    ? getWeekIndexForDay(weeks, todayDay)
    : -1;

  // ── Animated styles ──────────────────────────────────────────────────────
  const containerAnimStyle = useAnimatedStyle(() => ({
    height: ROW_HEIGHT + progress.value * (totalWeeks - 1) * ROW_HEIGHT,
    overflow: 'hidden' as const,
  }));

  const contentAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -activeWeekIndex * ROW_HEIGHT * (1 - progress.value) },
    ],
  }));

  // ── Handlers ─────────────────────────────────────────────────────────────
  const toggleExpanded = useCallback(() => {
    const next = !isExpanded;
    setIsExpanded(next);
    progress.value = withTiming(next ? 1 : 0, TIMING_CONFIG);
  }, [isExpanded, progress]);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const handleDayPress = useCallback(
    (dayInfo: DayInfo) => {
      if (!dayInfo.isCurrentMonth) {
        setCurrentYear(dayInfo.year);
        setCurrentMonth(dayInfo.month);
      }
      const dateStr = formatDate(dayInfo.year, dayInfo.month, dayInfo.day);
      setSelectedDate(dateStr);
      onDateSelect?.(dateStr);
    },
    [onDateSelect]
  );

  /** Move the visible week forward or backward by 7 days (week-mode only). */
  const navigateWeek = useCallback(
    (direction: 1 | -1) => {
      const [sy, sm, sd] = selectedDate.split('-').map(Number);
      const d = new Date(sy, sm - 1, sd + 7 * direction);
      const newYear = d.getFullYear();
      const newMonth = d.getMonth();
      const newDay = d.getDate();

      // If we crossed into a different month, update the calendar view
      if (newYear !== currentYear || newMonth !== currentMonth) {
        setCurrentYear(newYear);
        setCurrentMonth(newMonth);
      }

      const dateStr = formatDate(newYear, newMonth, newDay);
      setSelectedDate(dateStr);
      onDateSelect?.(dateStr);
    },
    [selectedDate, currentYear, currentMonth, onDateSelect]
  );

  // ── Gestures (handle area) ──────────────────────────────────────────────
  const panGesture = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onBegin(() => {
      dragStart.value = progress.value;
    })
    .onUpdate((e) => {
      const maxDrag = (totalWeeks - 1) * ROW_HEIGHT;
      const next = dragStart.value + e.translationY / maxDrag;
      progress.value = Math.min(1, Math.max(0, next));
    })
    .onEnd(() => {
      const shouldExpand = progress.value > 0.5;
      progress.value = withTiming(shouldExpand ? 1 : 0, TIMING_CONFIG);
      runOnJS(setIsExpanded)(shouldExpand);
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(toggleExpanded)();
  });

  const handleGesture = Gesture.Exclusive(panGesture, tapGesture);

  // ── Horizontal swipe on week rows (week-mode only) ──────────────────────
  const weekSwipeGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-15, 15])
    .enabled(!isExpanded)
    .onEnd((e) => {
      if (Math.abs(e.translationX) > 30) {
        const direction = e.translationX < 0 ? 1 : -1; // swipe left → next week
        runOnJS(navigateWeek)(direction as 1 | -1);
      }
    });

  // ── Render helpers ───────────────────────────────────────────────────────
  const renderDay = (dayInfo: DayInfo, weekIdx: number, dayIdx: number) => {
    const dateStr = formatDate(dayInfo.year, dayInfo.month, dayInfo.day);
    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedDate;

    return (
      <Pressable
        key={`day-${weekIdx}-${dayIdx}`}
        style={styles.dayCell}
        onPress={() => handleDayPress(dayInfo)}
      >
        <View
          style={[
            styles.dayCircle,
            isSelected && styles.selectedCircle,
            isToday && !isSelected && styles.todayCircle,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              !dayInfo.isCurrentMonth && styles.otherMonthText,
              isSelected && styles.selectedText,
              isToday && !isSelected && styles.todayText,
            ]}
          >
            {dayInfo.day}
          </Text>
        </View>
      </Pressable>
    );
  };

  // ── JSX ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.card}>
      {/* Month Header */}
      <View style={styles.header}>
        <Pressable onPress={goToPrevMonth} style={styles.navBtn} hitSlop={12}>
          <ChevronLeft size={22} color={theme.colors.icon} />
        </Pressable>

        <Text style={styles.monthTitle}>
          {isValidKey(MONTH_NAMES[currentMonth], MONTH_NAMES_GR)
            ? MONTH_NAMES_GR[MONTH_NAMES[currentMonth]]
            : MONTH_NAMES[currentMonth]}{' '}
          {currentYear}
        </Text>

        <Pressable onPress={goToNextMonth} style={styles.navBtn} hitSlop={12}>
          <ChevronRight size={22} color={theme.colors.icon} />
        </Pressable>
      </View>

      {/* Day labels */}
      <View style={styles.dayLabelsRow}>
        {DAY_LABELS.map((label) => (
          <View key={label} style={styles.dayLabelCell}>
            <Text style={styles.dayLabelText}>
              {isValidKey(label, DAY_LABELS_GR) ? DAY_LABELS_GR[label] : label}
            </Text>
          </View>
        ))}
      </View>

      {/* Week rows (animated container — swipeable in week-mode) */}
      <GestureDetector gesture={weekSwipeGesture}>
        <Animated.View style={containerAnimStyle}>
          <Animated.View style={contentAnimStyle}>
            {weeks.map((week, wIdx) => (
              <View
                key={`week-${wIdx}`}
                style={[
                  styles.weekRow,
                  wIdx === todayWeekIndex && styles.activeWeekRow,
                ]}
              >
                {week.map((day, dIdx) => renderDay(day, wIdx, dIdx))}
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </GestureDetector>

      {/* Pull handle */}
      <GestureDetector gesture={handleGesture}>
        <Animated.View style={styles.handleArea}>
          <View style={styles.handleLine} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
    ...theme.shadow.md,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  navBtn: {
    padding: 8,
  },
  monthTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
  },

  /* Day labels */
  dayLabelsRow: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  dayLabelCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayLabelText: {
    fontSize: 13,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textMuted,
  },

  /* Week rows */
  weekRow: {
    flexDirection: 'row',
    height: ROW_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  activeWeekRow: {
    backgroundColor: theme.colors.calendarActiveWeek,
  },

  /* Day cells */
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: ROW_HEIGHT,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    backgroundColor: theme.colors.selected,
  },
  todayCircle: {
    borderWidth: 1.5,
    borderColor: theme.colors.calendarToday,
  },
  dayText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  selectedText: {
    color: theme.colors.selectedText,
    fontWeight: theme.fontWeight.bold,
  },
  todayText: {
    color: theme.colors.calendarTodayText,
    fontWeight: theme.fontWeight.bold,
  },
  otherMonthText: {
    color: theme.colors.calendarOtherMonth,
  },

  /* Pull handle */
  handleArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  handleLine: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.calendarHandle,
  },
});
