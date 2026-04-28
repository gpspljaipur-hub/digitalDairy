import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
import MarkAttendance from '../Screens/MarkAttendance';
import AddHomework from '../Screens/AddHomework';
import PostHomework from '../Screens/Posthomework';
import HomeworkDetails from '../Screens/HomeworkDetails';
import ReminderHomework from '../Screens/ReminderHomework';
import EditHomework from '../Screens/EditHomework';

export type RootStackParamList = {
  Dashboard: undefined;
  MarkAttendance: undefined;
  AddHomework: undefined;
  PostHomework: { homework?: any };
  HomeworkDetails: undefined;
  ReminderHomework: undefined;
  EditHomework: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
      <Stack.Screen name="AddHomework" component={AddHomework} />
      <Stack.Screen name="PostHomework" component={PostHomework} />
      <Stack.Screen name="HomeworkDetails" component={HomeworkDetails} />
      <Stack.Screen name="ReminderHomework" component={ReminderHomework} />
      <Stack.Screen name="EditHomework" component={EditHomework} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
