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
import Teacher_Profile from '../Screens/Teacher/Teacher_Profile';
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
import ParentDashboard from '../Screens/Parent/ParentsDashboard';
import StudentAttandance from '../Screens/Parent/StudentAttandance';
import Homework_Screen from '../Screens/Parent/Homework_Screen';
import NoticeScreen from '../Screens/Parent/NoticeScreen';
import Result from '../Screens/Parent/Result';
import LeaveApplication from '../Screens/Parent/LeaveApplication';
import LeaveSubmit from '../Screens/Parent/LeaveSubmit';
import LeaveHistory from '../Screens/Parent/LeaveHistory';
import Complaint from '../Screens/Parent/Complaint';
import SubmitComplaint from '../Screens/Parent/SubmitComplaint';
import ViewMyComplaint from '../Screens/Parent/ViewMyComplaint';
import Chat_Screen from '../Screens/Parent/Chat_Screen';
import Academic_Calander from '../Screens/Parent/Academic_Calander';
import AnnuvalSPortsDay from '../Screens/Parent/AnnuvalSPortsDay';
import WinterVacation from '../Screens/Parent/WinterVacation';
import Profile from '../Screens/Parent/Profile';
import ParentDetails from '../Screens/Parent/ParentDetails';
import EditProfile from '../Screens/Parent/EditProfile';
import FAQScreen from '../Screens/Parent/FAQScreen';
import Schedule from '../Screens/Parent/Schedule';
import View_Homework from '../Screens/Parent/View_Homework';





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
  ParentDashboard: undefined;
  StudentAttandance: undefined;
  Homework_Screen: undefined;
  NoticeScreen: undefined;
  Result: undefined;
  LeaveApplication: undefined;
  LeaveSubmit: undefined;
  LeaveHistory: undefined;
  Complaint: undefined;
  SubmitComplaint: { category: string, date: string };
  ViewMyComplaint: undefined;
  Chat_Screen: undefined;
  Academic_Calander: undefined;
  AnnuvalSPortsDay: undefined;
  WinterVacation: undefined;
  Profile: undefined;
  ParentDetails: undefined;
  EditProfile: undefined;
  FAQScreen: undefined;
  Teacher_Profile: undefined;
  Schedule: undefined;
  View_Homework: undefined;
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
      <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
      <Stack.Screen name="StudentAttandance" component={StudentAttandance} />
      <Stack.Screen name="Homework_Screen" component={Homework_Screen} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="LeaveApplication" component={LeaveApplication} />
      <Stack.Screen name="LeaveSubmit" component={LeaveSubmit} />
      <Stack.Screen name="LeaveHistory" component={LeaveHistory} />
      <Stack.Screen name="Complaint" component={Complaint} />
      <Stack.Screen name="SubmitComplaint" component={SubmitComplaint} />
      <Stack.Screen name="ViewMyComplaint" component={ViewMyComplaint} />
      <Stack.Screen name="Chat_Screen" component={Chat_Screen} />
      <Stack.Screen name="Academic_Calander" component={Academic_Calander} />
      <Stack.Screen name="AnnuvalSPortsDay" component={AnnuvalSPortsDay} />
      <Stack.Screen name="WinterVacation" component={WinterVacation} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ParentDetails" component={ParentDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen name="Teacher_Profile" component={Teacher_Profile} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="View_Homework" component={View_Homework} />
    </Stack.Navigator>






  );
};

export default RootNavigator;
