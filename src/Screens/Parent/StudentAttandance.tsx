import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import ParentBottom from '../../Component/ParentBottom'
import { useNavigation } from '@react-navigation/native'

const StudentAttandance = () => {
    const navigation = useNavigation<any>();
    // Dummy data for calendar
    const calendarDays = [
        { day: '25', type: 'prev' }, { day: '26', type: 'prev' }, { day: '27', type: 'prev' }, { day: '28', type: 'prev' }, { day: '29', type: 'prev' }, { day: '30', type: 'prev' }, { day: '1', type: 'holiday' },
        { day: '2', type: 'present' }, { day: '3', type: 'present' }, { day: '4', type: 'present' }, { day: '5', type: 'absent' }, { day: '6', type: 'present' }, { day: '7', type: 'holiday' }, { day: '8', type: 'holiday' },
        { day: '9', type: 'present' }, { day: '10', type: 'present' }, { day: '11', type: 'present' }, { day: '12', type: 'present' }, { day: '13', type: 'present' }, { day: '14', type: 'holiday' }, { day: '15', type: 'holiday' },
        { day: '16', type: 'present' }, { day: '17', type: 'present' }, { day: '18', type: 'present' }, { day: '19', type: 'absent' }, { day: '20', type: 'present' }, { day: '21', type: 'holiday' }, { day: '22', type: 'holiday' },
        { day: '23', type: 'present' }, { day: '24', type: 'present' }, { day: '25', type: 'present' }, { day: '26', type: 'present' }, { day: '27', type: 'present' }, { day: '28', type: 'holiday' }, { day: '29', type: 'holiday' },
    ]

    const absenteeRemarks = [
        { date: '5', fullDate: 'Oct 5, 2023', reason: 'Medical Appointment (Certificate Submitted)' },
        { date: '19', fullDate: 'Oct 19, 2023', reason: 'Severe Weather Conditions' },
    ]

    const renderCalendarDay = (item: any, index: number) => {
        let bgColor = '#FFF'
        let textColor = '#000'
        let opacity = 1

        if (item.type === 'present') bgColor = '#007D34', textColor = '#FFF'
        else if (item.type === 'absent') bgColor = '#D32F2F', textColor = '#FFF'
        else if (item.type === 'holiday') bgColor = '#E3F2FD', textColor = '#64748B'
        else if (item.type === 'prev') textColor = '#CBD5E1', opacity = 0.5

        return (
            <View key={index} style={[styles.dayCell, { backgroundColor: bgColor, opacity }]}>
                <Text style={[styles.dayText, { color: textColor }]}>{item.day}</Text>
            </View>
        )
    }

    return (
        <ScreenWrapper scroll={false}>
            <Header
                title="Student Attendance"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Attendance Period */}
                <View style={styles.periodCard}>
                    <Text style={styles.periodLabel}>Attendance Period</Text>
                    <Text style={styles.periodValue}>October 2023</Text>
                </View>

                {/* Summary Row */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCard}>
                        <View style={styles.presentIconCircle}>
                            <Text style={styles.checkmarkIcon}>✓</Text>
                        </View>
                        <Text style={styles.summaryNumber}>18</Text>
                        <Text style={styles.summaryLabel}>Present</Text>
                    </View>
                    <View style={styles.summaryCard}>
                        <View style={styles.absentIconCircle}>
                            <Text style={styles.crossIcon}>✕</Text>
                        </View>
                        <Text style={styles.summaryNumber}>02</Text>
                        <Text style={styles.summaryLabel}>Absent</Text>
                    </View>
                </View>

                {/* Total Days Card */}
                <View style={styles.totalDaysCard}>
                    <View>
                        <Text style={styles.totalDaysLabel}>Total School Days</Text>
                        <Text style={styles.totalDaysValue}>20 Days</Text>
                    </View>
                    <View style={styles.rateBadge}>
                        <Text style={styles.rateText}>90% Rate</Text>
                    </View>
                </View>

                {/* Calendar Section */}
                <View style={styles.calendarContainer}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity><Text style={styles.navArrow}>‹</Text></TouchableOpacity>
                        <Text style={styles.monthTitle}>October 2023</Text>
                        <TouchableOpacity><Text style={styles.navArrow}>›</Text></TouchableOpacity>
                    </View>

                    <View style={styles.weekDaysRow}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                            <Text key={i} style={styles.weekDayText}>{d}</Text>
                        ))}
                    </View>

                    <View style={styles.calendarGrid}>
                        {calendarDays.map((item, index) => renderCalendarDay(item, index))}
                    </View>

                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: '#007D34' }]} />
                            <Text style={styles.legendText}>Present</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: '#D32F2F' }]} />
                            <Text style={styles.legendText}>Absent</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: '#E3F2FD' }]} />
                            <Text style={styles.legendText}>Holiday</Text>
                        </View>
                    </View>
                </View>

                {/* Absentee Remarks */}
                <Text style={styles.sectionTitle}>Absentee Remarks</Text>
                {absenteeRemarks.map((remark, index) => (
                    <View key={index} style={styles.remarkCard}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateBoxText}>{remark.date}</Text>
                        </View>
                        <View style={styles.remarkContent}>
                            <Text style={styles.remarkDateText}>{remark.fullDate}</Text>
                            <Text style={styles.remarkReasonText}>Reason: {remark.reason}</Text>
                        </View>
                    </View>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    )
}

export default StudentAttandance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    periodCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#EEF2F6',
    },
    periodLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    periodValue: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginTop: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    summaryCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        width: '48%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEF2F6',
    },
    presentIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#007D34',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    absentIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#D32F2F',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkmarkIcon: {
        color: '#007D34',
        fontSize: 16,
        fontWeight: 'bold',
    },
    crossIcon: {
        color: '#D32F2F',
        fontSize: 16,
        fontWeight: 'bold',
    },
    summaryNumber: {
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    summaryLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    totalDaysCard: {
        backgroundColor: '#0056B3',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalDaysLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    totalDaysValue: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    rateBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    rateText: {
        color: Colors.white,
        fontFamily: Fonts.Lexend_SemiBold,
        fontSize: 14,
    },
    calendarContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#EEF2F6',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingBottom: 15,
        marginHorizontal: -15,
    },
    navArrow: {
        fontSize: 24,
        color: Colors.primary,
        paddingHorizontal: 30,
    },
    monthTitle: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    weekDaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    weekDayText: {
        width: '13%',
        textAlign: 'center',
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dayCell: {
        width: '13%',
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        borderRadius: 6,
    },
    dayText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    legendBox: {
        width: 14,
        height: 14,
        borderRadius: 3,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 15,
    },
    remarkCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EEF2F6',
        alignItems: 'center',
    },
    dateBox: {
        width: 45,
        height: 45,
        backgroundColor: '#FFE4E6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    dateBoxText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#E11D48',
    },
    remarkContent: {
        flex: 1,
    },
    remarkDateText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    remarkReasonText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
        marginTop: 2,
    },
})
