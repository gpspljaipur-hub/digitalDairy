import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import FontsSize from '../../comman/FontsSize'
import { useNavigation } from '@react-navigation/native'
import useStrings from '../../comman/useStrings'

const Schedule = () => {
    const strings = useStrings()
    const navigation = useNavigation<any>()
    const scheduleData = [
        {
            id: '1',
            subject: 'Mathematics',
            time: '08:00 AM - 09:00 AM',
            teacher: 'Mr. Rajesh Sharma',
            room: 'Room 101',
            status: 'Completed',
            icon: '📐',
            color: '#E3F2FD',
            border: '#2196F3'
        },
        {
            id: '2',
            subject: 'Physics',
            time: '09:15 AM - 10:15 AM',
            teacher: 'Dr. Anita Verma',
            room: 'Physics Lab 2',
            status: 'Ongoing',
            icon: '⚛️',
            color: '#FFF3E0',
            border: '#FF9800'
        },
        {
            id: '3',
            subject: 'English Literature',
            time: '10:30 AM - 11:30 AM',
            teacher: 'Mrs. Priya Singh',
            room: 'Room 204',
            status: 'Upcoming',
            icon: '📚',
            color: '#F3E5F5',
            border: '#9C27B0'
        },
        {
            id: '4',
            subject: 'Break Time',
            time: '11:30 AM - 12:00 PM',
            teacher: 'Cafeteria',
            room: 'Ground Floor',
            status: 'Upcoming',
            icon: '🍱',
            color: '#E8F5E9',
            border: '#4CAF50'
        },
        {
            id: '5',
            subject: 'History',
            time: '12:00 PM - 01:00 PM',
            teacher: 'Mr. Vikram Aditya',
            room: 'Room 105',
            status: 'Upcoming',
            icon: '📜',
            color: '#FFEBEE',
            border: '#F44336'
        },
        {
            id: '6',
            subject: 'Physical Education',
            time: '01:15 PM - 02:15 PM',
            teacher: 'Mr. Sunil Gavaskar',
            room: 'Main Ground',
            status: 'Upcoming',
            icon: '⚽',
            color: '#E0F2F1',
            border: '#009688'
        }
    ]

    const renderScheduleItem = ({ item }: { item: any }) => (
        <View style={styles.scheduleCard}>
            <View style={[styles.statusIndicator, { backgroundColor: item.border }]} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={[styles.iconBg, { backgroundColor: item.color }]}>
                        <Text style={styles.itemEmoji}>{item.icon}</Text>
                    </View>
                    <View style={styles.subjectInfo}>
                        <Text style={styles.subjectText}>{item.subject}</Text>
                        <View style={styles.timeRow}>
                            <Text style={styles.clockEmoji}>🕒</Text>
                            <Text style={styles.timeText}>{item.time}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: item.status === 'Ongoing' ? '#E8F5E9' : '#F1F5F9' }]}>
                        <Text style={[styles.statusText, { color: item.status === 'Ongoing' ? '#2E7D32' : '#64748B' }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                    <View style={styles.footerInfo}>
                        <Text style={styles.footerLabel}>{strings.teacherLabel}</Text>
                        <Text style={styles.footerValue}>{item.teacher}</Text>
                    </View>
                    <View style={styles.footerInfo}>
                        <Text style={styles.footerLabel}>{strings.locationLabel}</Text>
                        <Text style={styles.footerValue}>{item.room}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <ScreenWrapper style={styles.container}>
            <Header
                title={strings.classSchedule}
                showBack={true}
                onBack={() => navigation.goBack()}
                showNotification={true}
            />



            <FlatList
                data={scheduleData}
                renderItem={renderScheduleItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>{strings.todaysRoutine}</Text>
                        <Text style={styles.listSubtitle}>{scheduleData.length} {strings.classesScheduled}</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    calendarSection: {
        backgroundColor: Colors.white,
        paddingVertical: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        marginBottom: 10,
    },
    monthRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    monthText: {
        fontSize: FontsSize.size18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    filterBtn: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    filterText: {
        fontSize: FontsSize.size12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.primary,
    },
    daysScroll: {
        paddingHorizontal: 15,
    },
    dayCard: {
        width: 60,
        height: 85,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    selectedDayCard: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        elevation: 5,
    },
    dayText: {
        fontSize: FontsSize.size12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    selectedDayText: {
        color: 'rgba(255,255,255,0.8)',
    },
    dateText: {
        fontSize: FontsSize.size18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    selectedDateText: {
        color: Colors.white,
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.white,
        marginTop: 6,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    listHeader: {
        marginBottom: 20,
    },
    listTitle: {
        fontSize: FontsSize.size20,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    listSubtitle: {
        fontSize: FontsSize.size13,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    scheduleCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        marginBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statusIndicator: {
        width: 6,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBg: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemEmoji: {
        fontSize: 24,
    },
    subjectInfo: {
        flex: 1,
    },
    subjectText: {
        fontSize: FontsSize.size16,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 4,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clockEmoji: {
        fontSize: 12,
        marginRight: 4,
    },
    timeText: {
        fontSize: FontsSize.size12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 10,
        fontFamily: Fonts.LexendBold,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 15,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerInfo: {
        flex: 1,
    },
    footerLabel: {
        fontSize: 10,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    footerValue: {
        fontSize: FontsSize.size13,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    }
})