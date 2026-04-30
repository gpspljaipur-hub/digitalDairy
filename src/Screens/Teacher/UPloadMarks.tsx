import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import StringsRaw from '../../comman/String'
import HWSize from '../../comman/HWSize'
import Header from '../../comman/Header'
import { useNavigation } from '@react-navigation/native'
import { Auth_ApiRequest, Get_Send_Api } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import Helper from '../../Lib/HelperFiles/Helper'
import { ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'

const Strings = StringsRaw.en

const UPloadMarks = () => {
    const navigation = useNavigation<any>();
    const { teacher } = useSelector((state: any) => state.user);
    console.log(teacher, 'teacher');
    const [loading, setLoading] = useState(false);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState('');

    const [classes, setClasses] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);

    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [selectedSubject, setSelectedSubject] = useState<any>(null);
    const [showClassList, setShowClassList] = useState(false);
    const [showSubjectList, setShowSubjectList] = useState(false);

    useEffect(() => {
        fetchClasses()
        fetchStudents(teacher?._id)
    }, []);

    const fetchClasses = async () => {
        setLoadingClasses(true);
        try {
            const res = await Get_Send_Api(ApiUrl.ClassesAll, {});
            if (res && !res.error) {
                setClasses(res || []);
            } else {
                Helper.showToast(res?.message || 'Failed to fetch classes');
            }
        } catch (error) {
            console.error('Fetch Classes Error:', error);
            Helper.showToast('Something went wrong');
        } finally {
            setLoadingClasses(false);
        }
    };

    const fetchSubjects = async (classId: string) => {
        try {
            const res = await Auth_ApiRequest(ApiUrl.SubjectsList, { classId });
            if (res && !res.error) {
                setSubjects(res.data || res || []);
            }
        } catch (error) {
            console.error('Fetch Subjects Error:', error);
        }
    };

    const fetchStudents = async (classId: string) => {
        setLoadingData(true);
        try {
            const res = await Auth_ApiRequest(ApiUrl.StudentsList, { teacherId: classId });
            console.log(res, 'stuRes')
            if (res && !res.error) {
                const list = res.data || res || [];
                const formattedStudents = list.map((s: any) => ({
                    id: s._id,
                    name: s.name,
                    rollNo: s.rollNo || 'N/A',
                    marks: '',
                    completed: false,
                    initial: s.name ? s.name.charAt(0).toUpperCase() : '?'
                }));
                setStudents(formattedStudents);
            }
        } catch (error) {
            console.error('Fetch Students Error:', error);
            Helper.showToast('Failed to load students');
        } finally {
            setLoadingData(false);
        }
    };

    const handleMarksChange = (id: string, value: string) => {
        setError('');
        setStudents(prev => prev.map(student =>
            student.id === id
                ? { ...student, marks: value, completed: value !== '' }
                : student
        ));
    };

    const handlePostMarks = async () => {
        setError('');
        if (!selectedClass || !selectedSubject) {
            setError('Please select class and subject');
            return;
        }

        const marksData = students
            .filter(s => s.marks !== '')
            .map(s => ({
                studentId: s.id,
                marks: s.marks
            }));

        if (marksData.length !== students.length) {
            setError('Please enter marks for all students');
            return;
        }

        const payload = {
            classId: selectedClass._id,
            subjectId: selectedSubject._id,
            teacherId: teacher?._id,
            students: marksData,
            date: new Date().toISOString().split('T')[0]
        };
        console.log(payload, 'payload')

        setLoading(true);
        try {
            const res = await Auth_ApiRequest(ApiUrl.MarksAdd, payload);
            if (res && !res.error) {
                Helper.showToast('Marks uploaded successfully');
                navigation.navigate('Dashboard');
            } else {
                setError(res?.message || 'Failed to upload marks');
            }
        } catch (error) {
            console.error('Upload Marks Error:', error);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const renderStudentItem = ({ item }: { item: any }) => (
        <View style={styles.studentCard}>
            <View style={styles.studentInfo}>
                <View style={[styles.avatar, { backgroundColor: item.completed ? '#E9E7FF' : '#F1F5F9' }]}>
                    <Text style={[styles.avatarText, { color: item.completed ? Colors.primary : '#64748B' }]}>{item.initial}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={styles.rollNoText}>{Strings.rollNo}: #{item.rollNo}</Text>
                </View>
            </View>

            <View style={styles.marksSection}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.marksInput, item.marks !== '' && styles.activeInput]}
                        value={item.marks}
                        onChangeText={(val) => handleMarksChange(item.id, val)}
                        placeholder="--"
                        keyboardType="numeric"
                        placeholderTextColor="#94A3B8"
                        maxLength={3}
                    />
                    {item.completed && (
                        <View style={styles.checkBadge}>
                            <Text style={styles.checkIcon}>✓</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.outOfText}>/ 100</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title="Teacher Portal"
                showBack={true}
                onBack={() => navigation.goBack()}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerSection}>
                    <Text style={styles.title}>{Strings.uploadMarksTitle}</Text>
                    <Text style={styles.subtitle}>{Strings.uploadMarksDesc}</Text>
                </View>

                {/* Dropdowns */}
                {/* Dropdowns */}
                <View style={styles.selectorContainer}>
                    <Text style={styles.selectorLabel}>{Strings.selectClass}</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        activeOpacity={0.7}
                        onPress={() => {
                            setShowClassList(!showClassList);
                            setShowSubjectList(false);
                        }}
                    >
                        <Text style={[styles.dropdownText, !selectedClass && { color: '#94A3B8' }]}>
                            {selectedClass ? selectedClass.name : Strings.selectClass}
                        </Text>
                        {loadingClasses ? (
                            <ActivityIndicator size="small" color={Colors.primary} />
                        ) : (
                            <Text style={[styles.arrowIcon, showClassList && styles.arrowRotated]}>▼</Text>
                        )}
                    </TouchableOpacity>

                    {showClassList && (
                        <View style={styles.dropdownList}>
                            <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                                {classes.map((item) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedClass(item);
                                            setShowClassList(false);
                                            setSelectedSubject(null);
                                            setError('');

                                            fetchSubjects(item._id);

                                        }}
                                    >
                                        <Text style={[styles.dropdownItemText, selectedClass?._id === item._id && styles.selectedItemText]}>{item.name}</Text>
                                        {selectedClass?._id === item._id && <Text style={styles.selectedCheck}>✓</Text>}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={[styles.selectorLabel, { marginTop: 16 }]}>{Strings.selectSubject}</Text>
                    <TouchableOpacity
                        style={[styles.dropdown, !selectedClass && { backgroundColor: '#F1F5F9' }]}
                        activeOpacity={0.7}
                        disabled={!selectedClass}
                        onPress={() => {
                            setShowSubjectList(!showSubjectList);
                            setShowClassList(false);
                        }}
                    >
                        <Text style={[styles.dropdownText, !selectedSubject && { color: '#94A3B8' }]}>
                            {selectedSubject ? selectedSubject.name : Strings.selectSubject}
                        </Text>
                        <Text style={[styles.arrowIcon, showSubjectList && styles.arrowRotated]}>▼</Text>
                    </TouchableOpacity>

                    {showSubjectList && (
                        <View style={styles.dropdownList}>
                            <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                                {subjects.map((item) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedSubject(item);
                                            setShowSubjectList(false);
                                            setError('');
                                        }}
                                    >
                                        <Text style={[styles.dropdownItemText, selectedSubject?._id === item._id && styles.selectedItemText]}>{item.name}</Text>
                                        {selectedSubject?._id === item._id && <Text style={styles.selectedCheck}>✓</Text>}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                {/* Students List */}
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>{Strings.studentsList} ({students.length})</Text>
                </View>

                {loadingData ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={styles.loadingText}>Loading students...</Text>
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        {students.length > 0 ? (
                            students.map(student => (
                                <View key={student.id}>
                                    {renderStudentItem({ item: student })}
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>{selectedClass ? 'No students found' : 'Select a class to view students'}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Warning Box */}
                <View style={styles.infoBox}>
                    <View style={styles.infoIconContainer}>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                    </View>
                    <Text style={styles.infoText}>{Strings.verifyMarksNote}</Text>
                </View>

                {/* Error Message */}
                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveButton, (students.length === 0 || loading) && { opacity: 0.6 }]}
                    activeOpacity={0.8}
                    disabled={loading || students.length === 0}
                    onPress={handlePostMarks}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.white} />
                    ) : (
                        <>
                            <Text style={styles.cloudIcon}>☁</Text>
                            <Text style={styles.saveButtonText}>{Strings.saveAndUpload}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UPloadMarks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    headerSection: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: 24,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 4,
        lineHeight: 22,
    },
    selectorContainer: {
        paddingHorizontal: HWSize.W_Width20,
        marginBottom: 24,
    },
    selectorLabel: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
        marginBottom: 8,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    dropdownText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1E293B',
    },
    arrowIcon: {
        fontSize: 12,
        color: '#64748B',
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: HWSize.W_Width20,
        marginBottom: 16,
    },
    listTitle: {
        fontSize: 18,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#475569',
    },
    totalBadge: {
        backgroundColor: '#E2F2E5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    totalBadgeText: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: '#2D6A4F',
    },
    listContainer: {
        paddingHorizontal: HWSize.W_Width20,
    },
    studentCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
    },
    nameContainer: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    rollNoText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 2,
    },
    marksSection: {
        alignItems: 'center',
    },
    inputContainer: {
        position: 'relative',
    },
    marksInput: {
        width: 70,
        height: 44,
        backgroundColor: '#F0F7FF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
        padding: 0,
    },
    activeInput: {
        backgroundColor: '#F0FDF4',
        borderColor: '#86EFAC',
        color: '#166534',
    },
    outOfText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        marginTop: 4,
    },
    dropdownList: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    dropdownItemText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
    },
    selectedItemText: {
        color: Colors.primary,
        fontFamily: Fonts.LexendBold,
    },
    selectedCheck: {
        color: Colors.primary,
        fontSize: 14,
    },
    arrowRotated: {
        transform: [{ rotate: '180deg' }],
    },
    checkBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#10B981',
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    checkIcon: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        marginHorizontal: HWSize.W_Width20,
        marginTop: 12,
        padding: 16,
        borderRadius: 12,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    infoIconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    infoIcon: {
        fontSize: 18,
        color: '#1E40AF',
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1E40AF',
        lineHeight: 20,
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#0369A1',
        marginHorizontal: HWSize.W_Width20,
        marginTop: 16,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#0369A1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    cloudIcon: {
        fontSize: 20,
        color: Colors.white,
        marginRight: 10,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.primary,
    },
    emptyState: {
        marginHorizontal: HWSize.W_Width20,
        paddingVertical: 40,
        backgroundColor: Colors.white,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    emptyText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
    },
    errorContainer: {
        marginHorizontal: HWSize.W_Width20,
        marginTop: 12,
        alignItems: 'center',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
    },
})