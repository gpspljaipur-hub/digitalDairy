import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screens/Teacher/Dashboard';
import MarkAttendance from '../Screens/Teacher/MarkAttendance';
import AddHomework from '../Screens/Teacher/AddHomework';
import PostHomework from '../Screens/Teacher/Posthomework';
import HomeworkDetails from '../Screens/Teacher/HomeworkDetails';
import ReminderHomework from '../Screens/Teacher/ReminderHomework';
import EditHomework from '../Screens/Teacher/EditHomework';
import CreateNotice from '../Screens/Teacher/CreateNotice';
import SendNotice from '../Screens/Teacher/SendNotice'
import ViewAllNotice from '../Screens/Teacher/ViewAllNotice'
import UPloadMarks from '../Screens/Teacher/UPloadMarks';
import SaveMarks from '../Screens/Teacher/SaveMarks';
import ViewMarkSheet from '../Screens/Teacher/ViewMarkSheet';
import Notification from '../Screens/Teacher/Notification';
import Splash from '../Screens/Auth/Splash';
import LanguageSelection from '../Screens/Auth/LanguageSelection';
import WelcomeScreen from '../Screens/Auth/WelcomeScreen';
import StudentRegister from '../Screens/Auth/StudentRegister';
import Welcomeback from '../Screens/Auth/Welcomeback';
import ParentRegister from '../Screens/Auth/ParentRegister';
import OTPVerification from '../Screens/Auth/OTPVerification';
import OfflineMode from '../Screens/Auth/OfflineMode';
import CheckingConnection from '../Screens/Auth/CheckingConnection';
import OfflineDashboard from '../Screens/Teacher/OfflineDashboard';
export type RootStackParamList = {
  Dashboard: undefined;
  MarkAttendance: undefined;
  AddHomework: undefined;
  PostHomework: { homework?: any };
  HomeworkDetails: undefined;
  ReminderHomework: undefined;
  EditHomework: undefined;
  CreateNotice: undefined;
  SendNotice: undefined;
  ViewAllNotice: undefined;
  UPloadMarks: undefined;
  SaveMarks: undefined;
  ViewMarkSheet: undefined;
  Splash: undefined;
  LanguageSelection: undefined;
  WelcomeScreen: undefined;
  StudentRegister: undefined;
  Welcomeback: undefined;
  ParentRegister: undefined;
  OTPVerification: undefined;
  Notification: undefined;
  OfflineMode: undefined;
  CheckingConnection: undefined;
  OfflineDashboard: undefined;
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
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
      <Stack.Screen name="AddHomework" component={AddHomework} />
      <Stack.Screen name="PostHomework" component={PostHomework} />
      <Stack.Screen name="HomeworkDetails" component={HomeworkDetails} />
      <Stack.Screen name="ReminderHomework" component={ReminderHomework} />
      <Stack.Screen name="EditHomework" component={EditHomework} />
      <Stack.Screen name="CreateNotice" component={CreateNotice} />
      <Stack.Screen name="SendNotice" component={SendNotice} />
      <Stack.Screen name="ViewAllNotice" component={ViewAllNotice} />
      <Stack.Screen name="UPloadMarks" component={UPloadMarks} />
      <Stack.Screen name="SaveMarks" component={SaveMarks} />
      <Stack.Screen name="ViewMarkSheet" component={ViewMarkSheet} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="StudentRegister" component={StudentRegister} />
      <Stack.Screen name="ParentRegister" component={ParentRegister} />
      <Stack.Screen name="Welcomeback" component={Welcomeback} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="OfflineMode" component={OfflineMode} />
      <Stack.Screen name="CheckingConnection" component={CheckingConnection} />
      <Stack.Screen name="OfflineDashboard" component={OfflineDashboard} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
