import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Colors } from '../../comman/Colors'
import useStrings from '../../comman/useStrings'
import Fonts from '../../comman/fonts'
import FontsSize from '../../comman/FontsSize'
import HWSize from '../../comman/HWSize'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTab from '../../Component/Bottom'
import Header from '../../comman/Header'
import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {
    const navigation = useNavigation<any>();
    const Strings = useStrings()
    const { teacher } = useSelector((state: any) => state.user);
    console.log('teacher', teacher);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            <Header title={Strings.dashboardTitle} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Greeting Section */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingText}>{Strings.greeting} {teacher?.name || 'Teacher'} </Text>
                    <Text style={styles.subtitleText}>{Strings.subtitle} {teacher?.subject}</Text>
                </View>

                {/* Quick Actions Grid */}
                <View style={styles.gridContainer}>
                    <QuickActionCard icon="👤" label={Strings.attendance} onPress={() => navigation.navigate('MarkAttendance')} />
                    <QuickActionCard icon="📝" label={Strings.homework} onPress={() => navigation.navigate('AddHomework')} />
                    <QuickActionCard icon="📢" label={Strings.notice} onPress={() => navigation.navigate('CreateNotice')} />
                    <QuickActionCard icon="📤" label={Strings.marks} onPress={() => navigation.navigate('UPloadMarks')} />
                </View>

                {/* Schedule Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{Strings.todaySchedule}</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>{Strings.viewAll}</Text>
                    </TouchableOpacity>
                </View>

                <ScheduleCard
                    time="09:00"
                    period="AM"
                    subject="Mathematics"
                    details="Grade 10-B • Room 204"
                />
                <ScheduleCard
                    time="11:30"
                    period="AM"
                    subject="Physics Practical"
                    details="Grade 12-A • Lab 1"
                />

                {/* Pending Tasks Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{Strings.pendingTasks}</Text>
                </View>

                <View style={styles.tasksContainer}>
                    <TaskItem
                        label="Approve leave for 3 students"
                        isUrgent={true}
                        isLast={false}
                    />
                    <TaskItem
                        label="Submit Unit Test 1 marks"
                        isUrgent={false}
                        isLast={true}
                    />
                </View>
            </ScrollView>

            <BottomTab activeTab="HOME" />
        </SafeAreaView>
    )
}

const QuickActionCard = ({ icon, label, onPress }: { icon: string, label: string, onPress?: () => void }) => (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={onPress}>
        <View style={styles.iconBg}>
            <Text style={styles.actionIcon}>{icon}</Text>
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
)

const ScheduleCard = ({ time, period, subject, details }: any) => (
    <TouchableOpacity style={styles.scheduleCard} activeOpacity={0.8}>
        <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
            <Text style={styles.periodText}>{period}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.scheduleInfo}>
            <Text style={styles.subjectText}>{subject}</Text>
            <Text style={styles.detailsText}>{details}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
)

const TaskItem = ({ label, isUrgent, isLast }: any) => {
    const Strings = useStrings();
    return (
        <TouchableOpacity style={[styles.taskItem, isLast && { borderBottomWidth: 0 }]} activeOpacity={0.7}>
            <View style={styles.checkbox} />
            <View style={styles.taskContent}>
                <Text style={styles.taskLabel}>{label}</Text>
                {isUrgent && (
                    <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>{Strings.urgent}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    greetingSection: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greetingText: {
        fontSize: 28,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        letterSpacing: -0.5,
    },
    subtitleText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#666666',
        marginTop: 4,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: HWSize.W_Width20,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        width: '47%',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 3,
        shadowColor: '#6E5CE8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    iconBg: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#EEF0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    actionIcon: {
        fontSize: 22,
        color: Colors.primary,
    },
    actionLabel: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
        lineHeight: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: HWSize.W_Width20,
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    viewAllText: {
        fontSize: 14,
        color: Colors.primary,
        fontFamily: Fonts.Lexend_Medium,
    },
    scheduleCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginHorizontal: HWSize.W_Width20,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
    },
    timeContainer: {
        alignItems: 'center',
        width: 60,
    },
    timeText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    periodText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#666',
        marginTop: 2,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 16,
    },
    scheduleInfo: {
        flex: 1,
    },
    subjectText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
    },
    detailsText: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: Fonts.Lexend_Regular,
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: '#94A3B8',
        marginLeft: 8,
    },
    tasksContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: HWSize.W_Width20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 20,
        overflow: 'hidden',
    },
    taskItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.primary,
        marginRight: 16,
    },
    taskContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskLabel: {
        fontSize: 15,
        color: '#334155',
        fontFamily: Fonts.Lexend_Medium,
        flex: 1,
    },
    urgentBadge: {
        backgroundColor: '#FFF1F2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    urgentText: {
        fontSize: 10,
        fontFamily: Fonts.LexendBold,
        color: '#E11D48',
    },
})
