import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// 월 이동 컨트롤 컴포넌트
const MonthControl = ({ currentDate, onPrevious, onNext }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onPrevious}>
      <Text style={styles.arrow}>{'<'}</Text>
    </TouchableOpacity>
    <Text style={styles.month}>
      {currentDate.toLocaleString('default', { month: 'long' })}{' '}
      {currentDate.getFullYear()}
    </Text>
    <TouchableOpacity onPress={onNext}>
      <Text style={styles.arrow}>{'>'}</Text>
    </TouchableOpacity>
  </View>
);

// 요일 헤더 컴포넌트
const WeekdayHeader = () => (
  <View style={styles.weekdays}>
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
      <Text
        key={day}
        style={[
          styles.weekday,
          index === 0 && styles.sunday, // 일요일은 빨간색
          index === 6 && styles.saturday, // 토요일은 파란색
        ]}
      >
        {day}
      </Text>
    ))}
  </View>
);

// 캘린더 메인 컴포넌트
export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);
  const getLastDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // 이전/다음 달 날짜 생성
  const generateExtraDays = (start, end, monthOffset) => {
    const extraDays = [];
    for (let i = start; i < end; i++) {
      extraDays.push({
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + monthOffset,
          i
        ),
        isCurrentMonth: false,
      });
    }
    return extraDays;
  };

  // 현재 월의 모든 날짜 계산
  const getDaysInMonth = (date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);

    // 이전 달 날짜
    const prevDays = generateExtraDays(
      -firstDay.getDay() + 1,
      1,
      0
    );

    // 현재 월 날짜
    const currentDays = Array.from({ length: lastDay.getDate() }, (_, i) => ({
      date: new Date(date.getFullYear(), date.getMonth(), i + 1),
      isCurrentMonth: true,
    }));

    // 다음 달 날짜
    const nextDays = generateExtraDays(
      1,
      7 - lastDay.getDay(),
      1
    );

    return [...prevDays, ...currentDays, ...nextDays];
  };

  // 이전 달로 이동
  const handlePreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  // 날짜 선택 핸들러
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // 날짜 포맷팅 (YYYY-MM-DD)
  const formatDate = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  // 날짜 리스트에 포맷팅된 날짜 추가
  const formattedDays = days.map((day) => ({
    ...day,
    formattedDate: formatDate(day.date),
  }));

  return (
    <View style={styles.container}>
      {/* 상단 월 이동 컨트롤 */}
      <MonthControl
        currentDate={currentDate}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
      />

      {/* 요일 헤더 */}
      <WeekdayHeader />

      {/* 날짜 리스트 */}
      <FlatList
        data={formattedDays}
        numColumns={7}
        keyExtractor={(item) => item.formattedDate}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayContainer,
              item.isCurrentMonth ? styles.currentMonth : styles.otherMonth,
              selectedDate &&
                selectedDate.toISOString() === item.date.toISOString() &&
                styles.selectedDay,
              today.toISOString() === item.date.toISOString() && styles.today,
            ]}
            onPress={() => handleSelectDate(item.date)}
          >
            <Text
              style={[
                styles.dayText,
                !item.isCurrentMonth && styles.otherMonthText,
              ]}
            >
              {item.date.getDate()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// 스타일 정의
const baseText = {
  fontSize: 16,
  textAlign: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    ...baseText,
    fontSize: 24,
    color: 'skyblue',
  },
  month: {
    ...baseText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  weekday: {
    ...baseText,
    fontWeight: 'bold',
  },
  sunday: { color: 'red' },
  saturday: { color: 'blue' },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    padding: 10,
    borderRadius: 50,
  },
  currentMonth: { backgroundColor: '#FFFFFF' },
  otherMonth: { backgroundColor: '#F5F5F5' },
  dayText: { ...baseText, color: 'black' },
  otherMonthText: { color: '#B0B0B0' },
  selectedDay: { backgroundColor: '#ADD8E6' },
  today: { borderWidth: 2, borderColor: '#0000FF' },
});
