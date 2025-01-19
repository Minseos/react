import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 각 스크린 정의
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
    </View>
  );
}

function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text>Library</Text>
    </View>
  );
}

function MyPageScreen() {
  return (
    <View style={styles.container}>
      <Text>My Page</Text>
    </View>
  );
}

// Bottom Tab Navigator 생성
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, //헤더 숨기기 설정
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Library') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'My Page') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Ionicons 아이콘 반환
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',   //클릭 시 활성화된 아이콘 색상을 검정색으로 설정
          tabBarInactiveTintColor: 'gray',  // 비활성화된 아이콘 색상은 회색
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="My Page" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
