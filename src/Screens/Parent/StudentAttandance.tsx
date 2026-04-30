import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import moment from 'moment'

const StudentAttandance = () => {
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const [currentDate, setCurrentDate] = useState(new Date())
    const [attendanceData, setAttendanceData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAttendanceData()
    }, [currentDate])

    const fetchAttendanceData = async () => {
        setLoading(true)
        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

        // Extract studentId from parent state (depends on your Redux structure)
        const studentId = parent?.data?.studentId || parent?.studentId;

        const payload = {
            studentId: studentId,
            month: monthNames[currentDate.getMonth()],
            year: currentDate.getFullYear()
        }

        try {
            const res = await Auth_ApiRequest(ApiUrl.AttendanceStudentMonthly, payload)
            console.log('Attendance Data Response:', res)
            if (res && !res.error) {
                setAttendanceData(res)
            }
        } catch (error) {
            console.error('Fetch Attendance Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adjust for Monday start (M=0, T=1... S=6)
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            days.push({ day: (prevMonthLastDay - i).toString(), type: 'prev' });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const record = attendanceData?.records?.find((r: any) => moment(r.date).format('YYYY-MM-DD') === dateStr);

            let type = 'none';
            if (record) {
                type = record.status.toLowerCase(); // 'present' or 'absent'
            } else if (new Date(year, month, i).getDay() === 0 || new Date(year, month, i).getDay() === 6) {
                type = 'holiday';
            }

            days.push({ day: i.toString(), type: type });
        }

        return days;
    }, [currentDate, attendanceData])

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

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setCurrentDate(newDate);
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
                    <Text style={styles.periodValue}>{moment(currentDate).format('MMMM YYYY')}</Text>
                </View>

                {/* Summary Row */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCard}>
                        <View style={styles.presentIconCircle}>
                            <Text style={styles.checkmarkIcon}>✓</Text>
                        </View>
                        <Text style={styles.summaryNumber}>{attendanceData?.totalPresent || 0}</Text>
                        <Text style={styles.summaryLabel}>Present</Text>
                    </View>
                    <View style={styles.summaryCard}>
                        <View style={styles.absentIconCircle}>
                            <Text style={styles.crossIcon}>✕</Text>
                        </View>
                        <Text style={styles.summaryNumber}>{attendanceData?.totalAbsent || 0}</Text>
                        <Text style={styles.summaryLabel}>Absent</Text>
                    </View>
                </View>

                {/* Total Days Card */}
                <View style={styles.totalDaysCard}>
                    <View>
                        <Text style={styles.totalDaysLabel}>Total School Days</Text>
                        <Text style={styles.totalDaysValue}>{attendanceData?.totalDays || 0} Days</Text>
                    </View>
                    <View style={styles.rateBadge}>
                        <Text style={styles.rateText}>
                            {attendanceData?.totalDays > 0
                                ? Math.round((attendanceData.totalPresent / attendanceData.totalDays) * 100)
                                : 0}% Rate
                        </Text>
                    </View>
                </View>

                {/* Calendar Section */}
                <View style={styles.calendarContainer}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={() => changeMonth(-1)}>
                            <Text style={styles.navArrow}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>{moment(currentDate).format('MMMM YYYY')}</Text>
                        <TouchableOpacity onPress={() => changeMonth(1)}>
                            <Text style={styles.navArrow}>›</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </View>
                    ) : (
                        <>
                            <View style={styles.weekDaysRow}>
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                    <Text key={i} style={styles.weekDayText}>{d}</Text>
                                ))}
                            </View>

                            <View style={styles.calendarGrid}>
                                {calendarDays.map((item, index) => renderCalendarDay(item, index))}
                            </View>
                        </>
                    )}

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
                {attendanceData?.records?.filter((r: any) => r.status.toLowerCase() === 'absent').length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Absentee Remarks</Text>
                        {attendanceData.records
                            .filter((r: any) => r.status.toLowerCase() === 'absent')
                            .map((remark: any, index: number) => (
                                <View key={index} style={styles.remarkCard}>
                                    <View style={styles.dateBox}>
                                        <Text style={styles.dateBoxText}>{moment(remark.date).format('D')}</Text>
                                    </View>
                                    <View style={styles.remarkContent}>
                                        <Text style={styles.remarkDateText}>{moment(remark.date).format('MMM D, YYYY')}</Text>
                                        <Text style={styles.remarkReasonText}>Status: Absent</Text>
                                    </View>
                                </View>
                            ))}
                    </>
                )}
            </ScrollView>
        </ScreenWrapper>
    )
}

export default StudentAttandance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    periodCard: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    periodLabel: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    periodValue: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',

    },
    presentIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    absentIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkmarkIcon: {
        color: '#4CAF50',
        fontSize: 18,
        fontWeight: 'bold',
    },
    crossIcon: {
        color: '#F44336',
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryNumber: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    summaryLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
    },
    totalDaysCard: {
        backgroundColor: '#1E293B',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    totalDaysLabel: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        marginBottom: 4,
    },
    totalDaysValue: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    rateBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    rateText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
    },
    calendarContainer: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 20,
        marginBottom: 25,

    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    navArrow: {
        fontSize: 28,
        color: '#64748B',
        paddingHorizontal: 10,
    },
    weekDaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    weekDayText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        width: 36,
        textAlign: 'center',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    dayCell: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
    },
    dayText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendBox: {
        width: 12,
        height: 12,
        borderRadius: 3,
    },
    legendText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 15,
    },
    remarkCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    dateBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    dateBoxText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    remarkContent: {
        flex: 1,
    },
    remarkDateText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    remarkReasonText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 2,
    },
})
