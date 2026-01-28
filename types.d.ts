// types.d.ts
// Additional type declarations for the project

import { TextStyle, ViewStyle } from 'react-native';

declare module 'react-native-calendars' {
  export interface DateData {
    year: number;
    month: number;
    day: number;
    timestamp: number;
    dateString: string;
  }

  export interface MarkedDates {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      selectedColor?: string;
      selectedTextColor?: string;
      dotColor?: string;
      activeOpacity?: number;
      disabled?: boolean;
      disableTouchEvent?: boolean;
      customStyles?: {
        container?: ViewStyle;
        text?: TextStyle;
      };
    };
  }

  export interface CalendarTheme {
    backgroundColor?: string;
    calendarBackground?: string;
    textSectionTitleColor?: string;
    selectedDayBackgroundColor?: string;
    selectedDayTextColor?: string;
    todayTextColor?: string;
    dayTextColor?: string;
    textDisabledColor?: string;
    dotColor?: string;
    selectedDotColor?: string;
    arrowColor?: string;
    monthTextColor?: string;
    indicatorColor?: string;
    textDayFontFamily?: string;
    textMonthFontFamily?: string;
    textDayHeaderFontFamily?: string;
    textDayFontWeight?: string;
    textMonthFontWeight?: string;
    textDayHeaderFontWeight?: string;
    textDayFontSize?: number;
    textMonthFontSize?: number;
    textDayHeaderFontSize?: number;
  }

  export interface CalendarProps {
    current?: string;
    minDate?: string;
    maxDate?: string;
    onDayPress?: (date: DateData) => void;
    onDayLongPress?: (date: DateData) => void;
    onMonthChange?: (date: DateData) => void;
    hideArrows?: boolean;
    hideExtraDays?: boolean;
    disableMonthChange?: boolean;
    firstDay?: number;
    hideDayNames?: boolean;
    showWeekNumbers?: boolean;
    onPressArrowLeft?: (subtractMonth: () => void) => void;
    onPressArrowRight?: (addMonth: () => void) => void;
    disableArrowLeft?: boolean;
    disableArrowRight?: boolean;
    disableAllTouchEventsForDisabledDays?: boolean;
    markedDates?: MarkedDates;
    theme?: CalendarTheme;
    style?: ViewStyle;
    enableSwipeMonths?: boolean;
  }

  export class Calendar extends React.Component<CalendarProps> {}
}