import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import StringsRaw from '../../comman/String'
import HWSize from '../../comman/HWSize'
import Header from '../../comman/Header'
import { useNavigation } from '@react-navigation/native'

const Strings = StringsRaw.en

const STUDENTS_DATA = [
    { id: '1', name: 'Alex Johnson', rollNo: '1024', marks: '85', completed: true, initial: 'AJ' },
    { id: '2', name: 'Sarah Williams', rollNo: '1025', marks: '92', completed: true, initial: 'SW' },
    { id: '3', name: 'Marcus Thompson', rollNo: '1026', marks: '', completed: false, initial: 'MT' },
    { id: '4', name: 'Emily Lane', rollNo: '1027', marks: '78', completed: true, initial: 'EL' },
    { id: '5', name: 'John Doe', rollNo: '1028', marks: '', completed: false, initial: 'JD' },
]

const CLASSES = ['Grade 10-A', 'Grade 10-B', 'Grade 11-A', 'Grade 11-B', 'Grade 12-A'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry'];

const UPloadMarks = () => {
    const navigation = useNavigation();
    const [students, setStudents] = useState(STUDENTS_DATA);
    const [selectedClass, setSelectedClass] = useState('Select Class');
    const [selectedSubject, setSelectedSubject] = useState('Select Subject');
    const [showClassList, setShowClassList] = useState(false);
    const [showSubjectList, setShowSubjectList] = useState(false);

    const handleMarksChange = (id: string, value: string) => {
        setStudents(prev => prev.map(student =>
            student.id === id
                ? { ...student, marks: value, completed: value !== '' }
                : student
        ));
    };

    const renderStudentItem = ({ item }: { item: typeof STUDENTS_DATA[0] }) => (
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
                <View style={styles.selectorContainer}>
                    <Text style={styles.selectorLabel}>{Strings.selectClass}</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        activeOpacity={0.7}
                        onPress={() => setShowClassList(!showClassList)}
                    >
                        <Text style={styles.dropdownText}>{selectedClass}</Text>
                        <Text style={[styles.arrowIcon, showClassList && styles.arrowRotated]}>▼</Text>
                    </TouchableOpacity>

                    {showClassList && (
                        <View style={styles.dropdownList}>
                            {CLASSES.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedClass(item);
                                        setShowClassList(false);
                                    }}
                                >
                                    <Text style={[styles.dropdownItemText, selectedClass === item && styles.selectedItemText]}>{item}</Text>
                                    {selectedClass === item && <Text style={styles.selectedCheck}>✓</Text>}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={[styles.selectorLabel, { marginTop: 16 }]}>{Strings.selectSubject}</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        activeOpacity={0.7}
                        onPress={() => setShowSubjectList(!showSubjectList)}
                    >
                        <Text style={styles.dropdownText}>{selectedSubject}</Text>
                        <Text style={[styles.arrowIcon, showSubjectList && styles.arrowRotated]}>▼</Text>
                    </TouchableOpacity>

                    {showSubjectList && (
                        <View style={styles.dropdownList}>
                            {SUBJECTS.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedSubject(item);
                                        setShowSubjectList(false);
                                    }}
                                >
                                    <Text style={[styles.dropdownItemText, selectedSubject === item && styles.selectedItemText]}>{item}</Text>
                                    {selectedSubject === item && <Text style={styles.selectedCheck}>✓</Text>}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* List Header */}
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>{Strings.studentsList} ({students.length})</Text>
                    <View style={styles.totalBadge}>
                        <Text style={styles.totalBadgeText}>{Strings.totalMarks}</Text>
                    </View>
                </View>

                {/* Students List */}
                <View style={styles.listContainer}>
                    {students.map(student => (
                        <View key={student.id}>
                            {renderStudentItem({ item: student })}
                        </View>
                    ))}
                </View>

                {/* Warning Box */}
                <View style={styles.infoBox}>
                    <View style={styles.infoIconContainer}>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                    </View>
                    <Text style={styles.infoText}>{Strings.verifyMarksNote}</Text>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveButton, { opacity: students.some(s => s.marks !== '') ? 1 : 0.6 }]}
                    activeOpacity={0.8}
                    disabled={!students.some(s => s.marks !== '')}
                    onPress={() => navigation.navigate('SaveMarks')}
                >
                    <Text style={styles.cloudIcon}>☁</Text>
                    <Text style={styles.saveButtonText}>{Strings.saveAndUpload}</Text>
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
})