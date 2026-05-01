import React, { useState, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { Colors } from './Colors';
import Fonts from './fonts';

interface DatePickerProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (date: Date) => void;
    selectedDate: Date;
    maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
    visible,
    onClose,
    onSelect,
    selectedDate,
    maxDate,
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const calendarData = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days: (Date | null)[] = [];

        // Padding for first week
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Days of month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }, [currentMonth]);

    const changeMonth = (offset: number) => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
        setCurrentMonth(newMonth);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <Pressable style={styles.calendarContainer}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
                            <Text style={styles.navText}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </Text>
                        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
                            <Text style={styles.navText}>›</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.weekDays}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <Text key={day} style={styles.weekDayText}>{day}</Text>
                        ))}
                    </View>

                    <View style={styles.daysGrid}>
                        {calendarData.map((date, index) => {
                            const isToday = date?.toDateString() === new Date().toDateString();
                            const isSelected = date?.toDateString() === selectedDate.toDateString();
                            const isDisabled = date && maxDate ? date > maxDate : false;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    disabled={!date || isDisabled}
                                    style={[
                                        styles.dayCell,
                                        isSelected && styles.selectedDay,
                                        isToday && styles.todayCell,
                                        isDisabled && styles.disabledDay,
                                    ]}
                                    onPress={() => {
                                        if (date) {
                                            onSelect(date);
                                        }
                                    }}
                                >
                                    <Text style={[
                                        styles.dayText,
                                        !date && { opacity: 0 },
                                        isSelected && styles.selectedDayText,
                                        isDisabled && styles.disabledDayText,
                                    ]}>
                                        {date ? date.getDate() : ''}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity style={styles.closeCalendarBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>Cancel</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default DatePicker;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarContainer: {
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
    },
    navText: {
        fontSize: 24,
        color: '#2563EB',
    },
    monthTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    weekDayText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#64748B',
        width: 40,
        textAlign: 'center',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    dayCell: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 20,
    },
    dayText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#334155',
    },
    selectedDay: {
        backgroundColor: '#2563EB',
    },
    selectedDayText: {
        color: Colors.white,
        fontFamily: Fonts.LexendBold,
    },
    todayCell: {
        borderWidth: 1,
        borderColor: '#2563EB',
    },
    disabledDay: {
        backgroundColor: 'transparent',
    },
    disabledDayText: {
        color: '#CBD5E1',
    },
    closeCalendarBtn: {
        marginTop: 15,
        alignItems: 'center',
        paddingVertical: 10,
    },
    closeBtnText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#64748B',
    },
});
