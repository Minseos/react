import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// 캘린더 컴포넌트
export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const getLastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // 현재 월의 모든 날짜 계산
  const getDaysInMonth = (date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);
    const days = [];

    // 이전 달의 마지막 며칠
    const startDay = firstDay.getDay(); // 요일 (0: 일요일, 1: 월요일, ...)
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(date.getFullYear(), date.getMonth(), -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // 현재 월의 날짜
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(date.getFullYear(), date.getMonth(), i), isCurrentMonth: true });
    }

    // 다음 달의 시작 며칠
    const endDay = lastDay.getDay();
    for (let i = 1; i < 7 - endDay; i++) {
      const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  // 이전 달
  const handlePreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  // 다음 달
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  // 날짜 선택
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // 날짜 포맷팅 (YYYY-MM-DD)
  const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <View style={styles.container}>
      {/* 상단 월 이동 컨트롤 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.month}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 요일 헤더 */}
      <View style={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Text
            key={day}
            style={[
              styles.weekday,
              index === 0 && styles.sunday,  // Sun은 빨간색
              index === 6 && styles.saturday, // Sat은 파란색
            ]}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* 날짜 렌더링 */}
      <FlatList
        data={days}
        numColumns={7}
        keyExtractor={(item) => formatDate(item.date)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayContainer,
              item.isCurrentMonth ? styles.currentMonth : styles.otherMonth,
              selectedDate &&
              formatDate(selectedDate) === formatDate(item.date) && styles.selectedDay,
              formatDate(today) === formatDate(item.date) && styles.today,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 50, // 캘린더 상단에 여백
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 24,
    color: 'skyblue',
  },
  month: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sunday: {
    color: 'red',
  },
  saturday: {
    color: 'blue',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    padding: 10,
    borderRadius: 50,
  },
  currentMonth: {
    backgroundColor: '#FFFFFF',
  },
  otherMonth: {
    backgroundColor: '#F5F5F5',
  },
  dayText: {
    fontSize: 16,
    color: 'black',
  },
  otherMonthText: {
    color: '#B0B0B0',
  },
  selectedDay: {
    backgroundColor: '#ADD8E6',
  },
  today: {
    borderWidth: 2,
    borderColor: '#0000FF',
  },
});