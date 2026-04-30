import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, StatusBar, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useMemo } from 'react'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import useStrings from '../../comman/useStrings'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../comman/Header'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../comman/DatePicker'
import { useSelector } from 'react-redux'
import { Auth_ApiRequest, Get_Send_Api } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import Helper from '../../Lib/HelperFiles/Helper'

interface Student {
    id: string;
    _id?: string;
    name: string;
    className: string;
    status: 'present' | 'absent' | null;
}

const MarkAttendance = () => {
    const navigation = useNavigation<any>();
    const { teacher } = useSelector((state: any) => state.user);
    const str = useStrings();
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [classList, setClassList] = useState<any[]>([])
    const [selectedClass, setSelectedClass] = useState<any>(null)
    const [isClassPickerVisible, setIsClassPickerVisible] = useState(false)
    const [loadingClasses, setLoadingClasses] = useState(false)
    const [loadingStudents, setLoadingStudents] = useState(false)
    const [loading, setLoading] = useState(false)
    const [studentList, setStudentList] = useState<any[]>([])


    React.useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        setLoadingClasses(true)
        try {
            const res = await Get_Send_Api(ApiUrl.ClassesAll, {})
            console.log("Classes All Response:", res)
            if (res && !res.error) {
                const list = (res.data || res || []).map((item: any) => ({
                    id: item._id,
                    name: item.name,
                    ...item
                }))
                setClassList(list)
            }
        } catch (error) {
            console.error('Fetch Classes Error:', error)
        } finally {
            setLoadingClasses(false)
        }
    }

    const fetchStudents = async (classId: string) => {
        setLoadingStudents(true)
        try {
            const res = await Auth_ApiRequest(ApiUrl.StudentsListByClass, { classId })
            if (res && !res.error) {
                const list = (res.data || res || []).map((item: any) => ({
                    id: item._id,
                    name: item.name,
                    status: null,
                    ...item
                }))
                setStudentList(list)
            } else {
                Helper.showToast(res?.message || 'Failed to fetch students');
            }
        } catch (error) {
            console.error('Fetch Students Error:', error)
            Helper.showToast('Something went wrong');
        } finally {
            setLoadingStudents(false)
        }
    }

    const setStatus = (id: string, status: 'present' | 'absent') => {
        setStudentList(prev => prev.map(s => (s._id === id || s.id === id) ? { ...s, status: s.status === status ? null : status } : s))
    }

    const filteredStudents = useMemo(() => studentList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.className.includes(searchQuery)
    ), [studentList, searchQuery])

    const handleSubmit = async () => {
        const unMarked = studentList.filter(s => s.status === null);
        if (unMarked.length > 0) {
            Helper.showToast(`Please mark attendance for all students (${unMarked.length} remaining)`);
            return;
        }

        const attendanceData = studentList.map((s, index) => ({
            studentId: s._id || s.id || index.toString(),
            status: s.status
        }));

        const payload = {
            students: attendanceData,
            teacherId: teacher?._id,
            date: selectedDate.toISOString().split('T')[0]
        };
        console.log("payload", payload)

        setLoading(true);
        try {
            const res = await Auth_ApiRequest(ApiUrl.MarkAttendance, payload);
            console.log('Mark Attendance Response:', res);
            if (res && !res.error) {
                Helper.showToast('Attendance marked successfully');
                navigation.navigate('Dashboard');
            } else {
                Helper.showToast(res?.message || 'Failed to mark attendance');
            }
        } catch (error) {
            console.error('Mark Attendance Error:', error);
            Helper.showToast('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const renderStudent = ({ item }: { item: Student }) => {
        return (
            <View style={styles.studentCard}>
                <View style={styles.studentMainInfo}>
                    <View style={styles.rollBadge}>
                        <Text style={styles.rollText}>{item.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text style={styles.studentName}>{item.name}</Text>
                        {/* <Text style={styles.studentDetail}>{item.className}</Text> */}
                    </View>
                </View>

                <View style={styles.actionGroup}>
                    <TouchableOpacity
                        onPress={() => setStatus(item._id || item.id, 'present')}
                        style={[styles.statusBtn, item.status === 'present' && styles.presentActive]}
                    >
                        <Text style={[styles.statusBtnText, item.status === 'present' && styles.textWhite]}>P</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setStatus(item._id || item.id, 'absent')}
                        style={[styles.statusBtn, item.status === 'absent' && styles.absentActive]}
                    >
                        <Text style={[styles.statusBtnText, item.status === 'absent' && styles.textWhite]}>A</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

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

                {/* Class Selection Dropdown */}
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Select Class</Text>
                    <TouchableOpacity
                        style={[styles.dropdown, isClassPickerVisible && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                        onPress={() => setIsClassPickerVisible(!isClassPickerVisible)}
                    >
                        <Text style={[styles.dropdownText, !selectedClass && { color: Colors.lightGreyText }]}>
                            {selectedClass ? selectedClass.name : 'Choose Class'}
                        </Text>
                        {loadingClasses ? (
                            <ActivityIndicator size="small" color={Colors.primary} />
                        ) : (
                            <Text style={styles.dropdownIcon}>{isClassPickerVisible ? '⌃' : '⌄'}</Text>
                        )}
                    </TouchableOpacity>

                    {isClassPickerVisible && (
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={classList}
                                keyExtractor={(item) => item._id}
                                style={{ maxHeight: 200 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => {
                                            setSelectedClass(item);
                                            setIsClassPickerVisible(false);
                                            fetchStudents(item._id);
                                        }}
                                    >
                                        <Text style={styles.optionText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
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
                    keyExtractor={item => item._id || item.id}
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
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.white} />
                    ) : (
                        <Text style={styles.submitBtnText}>{str.submitAttendance}</Text>
                    )}
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
    dropdownContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
        marginBottom: 8,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 52,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F8FAFC',
    },
    dropdownText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1E293B',
    },
    dropdownIcon: {
        fontSize: 20,
        color: '#64748B',
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderTopWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: Colors.white,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    optionText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1E293B',
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
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    studentName: {
        fontSize: 18,
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