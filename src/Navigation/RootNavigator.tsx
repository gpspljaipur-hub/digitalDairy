import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
import MarkAttendance from '../Screens/MarkAttendance';
import AddHomework from '../Screens/AddHomework';
import PostHomework from '../Screens/Posthomework';
import HomeworkDetails from '../Screens/HomeworkDetails';
import ReminderHomework from '../Screens/ReminderHomework';
import EditHomework from '../Screens/EditHomework';
import CreateNotice from '../Screens/CreateNotice';
import SendNotice from '../Screens/SendNotice'
import ViewAllNotice from '../Screens/ViewAllNotice'
import UPloadMarks from '../Screens/UPloadMarks';
import SaveMarks from '../Screens/SaveMarks';
import ViewMarkSheet from '../Screens/ViewMarkSheet';
import Splash from '../Screens/Parent/Splash';
import LanguageSelection from '../Screens/Parent/LanguageSelection';
import WelcomeScreen from '../Screens/Parent/WelcomeScreen';
import StudentRegister from '../Screens/Parent/StudentRegister';
import Welcomeback from '../Screens/Parent/Welcomeback';
import ParentRegister from '../Screens/Parent/ParentRegister';
import OTPVerification from '../Screens/Parent/OTPVerification';
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


    </Stack.Navigator>
  );
};

export default RootNavigator;
