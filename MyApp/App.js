import 'react-native-gesture-handler'; // 제스처 처리 핸들러를 위한 라이브러리
import React from 'react';
import CalendarScreen from './CalendarScreen'; // 외부 캘린더 컴포넌트 import
import { NavigationContainer } from '@react-navigation/native'; // 네비게이션 컨테이너
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // 하단 탭 네비게이션 생성
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 아이콘 컴포넌트

// 각 탭의 아이콘을 맵핑하기 위한 객체
const ICONS = {
  Home: { focused: 'home', default: 'home-outline' },
  Calendar: { focused: 'calendar', default: 'calendar-outline' },
  Library: { focused: 'library', default: 'library-outline' },
  'My Page': { focused: 'person', default: 'person-outline' },
};

// 공통으로 적용할 탭 네비게이션 옵션
const defaultScreenOptions = {
  headerShown: false, // 상단 헤더 숨김
  tabBarActiveTintColor: 'black', // 활성화된 탭 아이콘 색상
  tabBarInactiveTintColor: 'gray', // 비활성화된 탭 아이콘 색상
};

// 공통 화면 레이아웃 컴포넌트
const Screen = ({ name }) => (
  <View style={styles.container}>
    <Text>{name}</Text> {/* 전달받은 화면 이름 출력 */}
  </View>
);

// Bottom Tab Navigator 생성
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* 네비게이션 컨테이너 내부에 탭 네비게이터 배치 */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          ...defaultScreenOptions, // 공통 옵션 적용
          tabBarIcon: ({ focused, color, size }) => {
            // 아이콘 이름 선택
            const iconName = focused
              ? ICONS[route.name].focused
              : ICONS[route.name].default;
            // Ionicons 컴포넌트를 사용하여 아이콘 렌더링
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* 각 화면 정의 */}
        <Tab.Screen name="Home">{() => <Screen name="Home" />}</Tab.Screen>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Library">{() => <Screen name="Library" />}</Tab.Screen>
        <Tab.Screen name="My Page">{() => <Screen name="My Page" />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지
    justifyContent: 'center', // 세로 방향 중앙 정렬
    alignItems: 'center', // 가로 방향 중앙 정렬
    backgroundColor: '#FFFFFF', // 배경색 흰색 설정
  },
});
