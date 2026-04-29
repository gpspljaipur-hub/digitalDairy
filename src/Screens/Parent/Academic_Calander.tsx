import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const Academic_Calander = () => {
    const navigation = useNavigation<any>();
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = getDaysInMonth(month, year);
        const prevMonthDays = getDaysInMonth(month - 1, year);

        const daysArray: any[] = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            daysArray.push({ day: prevMonthDays - i, currentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let type = null;
            if (month === 3) {
                if (i === 10 || i === 14) type = 'holiday';
                if (i === 22) type = 'event';
                if (i >= 25 && i <= 30) type = 'exam';
            }
            daysArray.push({ day: i, currentMonth: true, type });
        }

        const totalCells = 42;
        const remainingCells = totalCells - daysArray.length;
        for (let i = 1; i <= remainingCells; i++) {
            daysArray.push({ day: i, currentMonth: false });
        }

        return daysArray;
    }, [currentDate]);

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setCurrentDate(newDate);
    };

    const upcomingEvents = [
        { date: '10', month: 'APR', title: 'Good Friday', location: 'Public Holiday', color: '#E8F5E9', textColor: '#4CAF50' },
        { date: '14', month: 'APR', title: 'Ambedkar Jayanti', location: 'Public Holiday', color: '#E8F5E9', textColor: '#4CAF50' },
        { date: '22', month: 'APR', title: 'Earth Day Celebration', location: 'School Assembly Hall', color: '#E3F2FD', textColor: '#2196F3' },
        { date: '25', month: 'APR', title: 'Final Term Exams', location: 'Examination Hall', color: '#FFEBEE', textColor: '#F44336' }
    ];

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuBtn}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Academic Calendar</Text>
                <View style={styles.profileContainer}>
                    <View style={styles.profileBox}>
                        <Text style={styles.profileEmoji}>👨‍💼</Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                {/* Calendar Card */}
                <View style={styles.calendarCard}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
                            <Text style={styles.navArrow}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </Text>
                        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
                            <Text style={styles.navArrow}>›</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.daysHeader}>
                        {days.map((d, index) => (
                            <Text key={index} style={styles.dayLabel}>{d}</Text>
                        ))}
                    </View>

                    <View style={styles.calendarGrid}>
                        {calendarDays.map((item, index) => {
                            let boxStyle = null;
                            let textStyle = item.currentMonth ? styles.currentMonthText : styles.otherMonthText;
                            let dotStyle = null;

                            if (item.type === 'holiday') {
                                boxStyle = styles.holidayBox;
                                textStyle = styles.holidayText;
                                dotStyle = styles.holidayDot;
                            } else if (item.type === 'event') {
                                boxStyle = styles.eventBox;
                                textStyle = styles.eventText;
                                dotStyle = styles.eventDot;
                            } else if (item.type === 'exam') {
                                boxStyle = styles.examBox;
                                textStyle = styles.examText;
                            }

                            return (
                                <View key={index} style={styles.dayCell}>
                                    <View style={[styles.highlightContainer, boxStyle]}>
                                        <Text style={[styles.dayText, textStyle]}>{item.day}</Text>
                                        {dotStyle && <View style={[styles.dot, dotStyle]} />}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Calendar Legend */}
                <View style={styles.legendCard}>
                    <Text style={styles.legendTitle}>Calendar Legend</Text>

                    <View style={styles.legendItem}>
                        <View style={[styles.legendIndicator, { backgroundColor: '#69F0AE' }]} />
                        <Text style={styles.legendText}>Public Holiday</Text>
                    </View>

                    <View style={styles.legendItem}>
                        <View style={[styles.legendIndicator, { backgroundColor: '#0D47A1' }]} />
                        <Text style={styles.legendText}>School Event</Text>
                    </View>

                    <View style={styles.legendItem}>
                        <View style={[styles.legendIndicator, { backgroundColor: '#FFD7D7' }]} />
                        <Text style={styles.legendText}>Examinations</Text>
                    </View>
                </View>

                {/* Upcoming Events Section */}
                <Text style={styles.upcomingTitle}>Upcoming Events</Text>

                {upcomingEvents.map((event, index) => (
                    <TouchableOpacity key={index} style={styles.eventCard} activeOpacity={0.7}>
                        <View style={[styles.dateBox, { backgroundColor: event.color }]}>
                            <Text style={[styles.dateMonth, { color: event.textColor }]}>{event.month}</Text>
                            <Text style={[styles.dateDay, { color: event.textColor }]}>{event.date}</Text>
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventCardTitle}>{event.title}</Text>
                            <Text style={styles.eventLocation}>{event.location}</Text>
                        </View>
                        <View style={styles.chevronContainer}>
                            <Text style={styles.chevronIcon}>›</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScreenWrapper>
    );
};

export default Academic_Calander;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F9FF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuBtn: {
        padding: 5,
    },
    menuIcon: {
        fontSize: 26,
        color: '#2163E8',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#2163E8',
    },
    profileContainer: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#2D343C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileEmoji: {
        fontSize: 20,
    },
    content: {
        padding: 15,
    },
    calendarCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F3F7FF',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,
    },
    navBtn: {
        padding: 5,
    },
    navArrow: {
        fontSize: 24,
        color: '#1A237E',
        fontFamily: Fonts.LexendBold,
    },
    monthTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1A237E',
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dayLabel: {
        width: '14.28%',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#9E9E9E',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    dayCell: {
        width: '14.28%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    highlightContainer: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    dayText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
    },
    currentMonthText: {
        color: '#212121',
    },
    otherMonthText: {
        color: '#E0E0E0',
    },
    holidayBox: {
        backgroundColor: '#69F0AE',
    },
    holidayText: {
        color: '#004D40',
        fontFamily: Fonts.LexendBold,
    },
    eventBox: {
        backgroundColor: '#0D47A1',
    },
    eventText: {
        color: '#FFFFFF',
        fontFamily: Fonts.LexendBold,
    },
    examBox: {
        backgroundColor: '#FFD7D7',
    },
    examText: {
        color: '#C62828',
        fontFamily: Fonts.LexendBold,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        position: 'absolute',
        bottom: 5,
    },
    holidayDot: {
        backgroundColor: '#004D40',
    },
    eventDot: {
        backgroundColor: '#FFFFFF',
    },
    legendCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 20,
        marginBottom: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    legendTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#212121',
        marginBottom: 15,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    legendIndicator: {
        width: 25,
        height: 25,
        borderRadius: 4,
        marginRight: 15,
    },
    legendText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#424242',
    },
    upcomingTitle: {
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        color: '#212121',
        marginBottom: 15,
    },
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    dateBox: {
        width: 60,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    dateMonth: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
    },
    dateDay: {
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        marginTop: -2,
    },
    eventInfo: {
        flex: 1,
    },
    eventCardTitle: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#212121',
    },
    eventLocation: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#757575',
        marginTop: 2,
    },
    chevronContainer: {
        padding: 5,
    },
    chevronIcon: {
        fontSize: 28,
        color: '#BDBDBD',
    },
});