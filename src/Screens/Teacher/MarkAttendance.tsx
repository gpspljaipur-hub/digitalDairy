import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, StatusBar, Alert } from 'react-native'
import React, { useState, useMemo } from 'react'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import Strings from '../../comman/String'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../comman/Header'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../comman/DatePicker'

interface Student {
    id: string;
    name: string;
    rollNo: string;
    status: 'P' | 'A' | null;
}

const MarkAttendance = () => {
    const navigation = useNavigation();
    const str = Strings.en;
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'Aditi Sharma', rollNo: '01', status: 'P' },
        { id: '2', name: 'Arjun Verma', rollNo: '02', status: 'P' },
        { id: '3', name: 'Bhavya Rao', rollNo: '03', status: null },
        { id: '4', name: 'Chetan Singh', rollNo: '04', status: 'A' },
        { id: '5', name: 'Divya Patel', rollNo: '05', status: 'P' },
        { id: '6', name: 'Ishaan Gupta', rollNo: '06', status: 'P' },
        { id: '7', name: 'Kavya Nair', rollNo: '07', status: 'P' },
        { id: '8', name: 'Rahul Khanna', rollNo: '08', status: null },
        { id: '9', name: 'Sana Khan', rollNo: '09', status: 'P' },
    ])

    const setStatus = (id: string, status: 'P' | 'A') => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === status ? null : status } : s))
    }

    const filteredStudents = useMemo(() => students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.includes(searchQuery)
    ), [students, searchQuery])

    const handleSubmit = () => {
        navigation.navigate('Dashboard')
    }

    const renderStudent = ({ item }: { item: Student }) => (
        <View style={styles.studentCard}>
            <View style={styles.studentMainInfo}>
                <View style={styles.rollBadge}>
                    <Text style={styles.rollText}>{item.rollNo}</Text>
                </View>
                <View>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={styles.studentDetail}>Roll No: {item.rollNo}</Text>
                </View>
            </View>

            <View style={styles.actionGroup}>
                <TouchableOpacity
                    onPress={() => setStatus(item.id, 'P')}
                    style={[styles.statusBtn, item.status === 'P' && styles.presentActive]}
                >
                    <Text style={[styles.statusBtnText, item.status === 'P' && styles.textWhite]}>P</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setStatus(item.id, 'A')}
                    style={[styles.statusBtn, item.status === 'A' && styles.absentActive]}
                >
                    <Text style={[styles.statusBtnText, item.status === 'A' && styles.textWhite]}>A</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title={str.attendance}
                showProfile={false}
                showNotification={false}
                showBack={true}
                onBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <View style={styles.dateSection}>
                    <TouchableOpacity
                        style={styles.dateCard}
                        onPress={() => setShowDatePicker(true)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.dateInfo}>
                            <Text style={styles.dateLabel}>Attendance Date</Text>
                            <Text style={styles.dateValue}>
                                {selectedDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </Text>
                        </View>
                        <View style={styles.calendarIconContainer}>
                            <Text style={styles.calendarEmoji}>📅</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchEmoji}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by name or roll number..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={Colors.lightGreyText}
                        />
                        {searchQuery !== '' && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Text style={styles.clearIcon}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <FlatList
                    data={filteredStudents}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderStudent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyEmoji}>👨‍🎓</Text>
                            <Text style={styles.emptyText}>No students found</Text>
                        </View>
                    }
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.submitBtn}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitBtnText}>Submit Attendance</Text>
                </TouchableOpacity>
            </View>

            <DatePicker
                visible={showDatePicker}
                selectedDate={selectedDate}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setSelectedDate(date)
                    setShowDatePicker(false)
                }}
            />
        </SafeAreaView>
    )
}

export default MarkAttendance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchSection: {
        marginBottom: 15,
        marginTop: 5
    },
    dateSection: {
        marginTop: 20,
        marginBottom: 15,
    },
    dateCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dateInfo: {
        flex: 1,
    },
    dateLabel: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    calendarIconContainer: {
        width: 44,
        height: 44,
        backgroundColor: Colors.white,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    calendarEmoji: {
        fontSize: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
    },
    searchEmoji: {
        fontSize: 16,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textMain,
    },
    clearIcon: {
        fontSize: 18,
        color: Colors.lightGreyText,
        padding: 5,
    },
    listContainer: {
        paddingBottom: 100,
    },
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    studentMainInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rollBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F0EFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rollText: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    studentName: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    studentDetail: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 1,
    },
    actionGroup: {
        flexDirection: 'row',
        gap: 6,
    },
    statusBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    statusBtnText: {
        fontSize: 13,
        fontFamily: Fonts.LexendBold,
        color: Colors.textSecondary,
    },
    presentActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },

    absentActive: {
        backgroundColor: '#F44336',
        borderColor: '#F44336',
    },
    textWhite: {
        color: Colors.white,
    },
    footer: {
        padding: 20,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        height: 54,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    submitBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyEmoji: {
        fontSize: 40,
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
})