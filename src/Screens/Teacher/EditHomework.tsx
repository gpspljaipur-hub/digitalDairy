import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Fonts from '../../comman/fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import useStrings from '../../comman/useStrings'
import DatePicker from '../../comman/DatePicker'


const EditHomework = () => {
    const Strings = useStrings()
    const navigation = useNavigation<any>();
    const [homeworkDetails, setHomeworkDetails] = useState('Type your message here...')
    const [dueDate, setDueDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    const [selectedClass, setSelectedClass] = useState('Select Class')
    const [selectedSubject, setSelectedSubject] = useState('Select Subject')
    const [showClassDropdown, setShowClassDropdown] = useState(false)
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)

    const classOptions = ['Grade 10-A', 'Grade 10-B', 'Grade 11-A', 'Grade 11-B', 'Grade 12-A']
    const subjectOptions = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Geography']

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuBtn}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{Strings.TEACHER_PORTAL}</Text>
                <TouchableOpacity style={styles.profileBtn}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                        style={styles.profileImg}
                    />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.titleSection}>
                        <Text style={styles.pageTitle}>{Strings.editHomeworkTitle}</Text>
                        <Text style={styles.pageSubtitle}>{Strings.editHomeworkSubtitle}</Text>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>{Strings.selectClass}</Text>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setShowClassDropdown(!showClassDropdown)}
                        >
                            <Text style={styles.dropdownValue}>{selectedClass}</Text>
                            <Text style={styles.chevronIcon}>{showClassDropdown ? '︽' : '︾'}</Text>
                        </TouchableOpacity>

                        {showClassDropdown && (
                            <View style={styles.dropdownList}>
                                {classOptions.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedClass(item)
                                            setShowClassDropdown(false)
                                        }}
                                    >
                                        <Text style={[styles.dropdownItemText, selectedClass === item && styles.selectedText]}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <Text style={styles.label}>{Strings.selectSubject}</Text>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setShowSubjectDropdown(!showSubjectDropdown)}
                        >
                            <Text style={styles.dropdownValue}>{selectedSubject}</Text>
                            <Text style={styles.chevronIcon}>{showSubjectDropdown ? '︽' : '︾'}</Text>
                        </TouchableOpacity>

                        {showSubjectDropdown && (
                            <View style={styles.dropdownList}>
                                {subjectOptions.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedSubject(item)
                                            setShowSubjectDropdown(false)
                                        }}
                                    >
                                        <Text style={[styles.dropdownItemText, selectedSubject === item && styles.selectedText]}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <Text style={styles.label}>{Strings.homeworkDetails}</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                value={homeworkDetails}
                                onChangeText={setHomeworkDetails}
                                textAlignVertical="top"
                            />
                        </View>

                        <Text style={styles.label}>{Strings.dueDateLabel}</Text>
                        <TouchableOpacity
                            style={styles.dateInputContainer}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateInput}>{formatDate(dueDate)}</Text>
                            <Text style={styles.calendarIcon}>📅</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>{Strings.attachments}</Text>
                        <View style={styles.attachmentCard}>
                            <View style={styles.attachmentIconContainer}>
                                <Text style={styles.fileIcon}>📄</Text>
                            </View>
                            <View style={styles.attachmentInfo}>
                                <Text style={styles.attachmentName}>formula_sheet_v2.pdf</Text>
                                <Text style={styles.attachmentMeta}>DOCUMENT • 1.2 MB</Text>
                            </View>
                            <TouchableOpacity style={styles.deleteBtn}>
                                <Text style={styles.deleteIcon}>🗑️</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.addMoreBtn}>
                            <Text style={styles.addMoreText}>⊕ {Strings.addMoreAttachments}</Text>
                        </TouchableOpacity>

                        {/* Action Buttons */}
                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.saveIcon}>💾</Text>
                            <Text style={styles.saveBtnText}>{Strings.saveChanges}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.cancelBtnText}>{Strings.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <DatePicker
                visible={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                selectedDate={dueDate}
                onSelect={(date) => {
                    setDueDate(date);
                    setShowDatePicker(false);
                }}
            />
        </SafeAreaView>
    )
}

export default EditHomework

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    menuBtn: {
        padding: 5,
    },
    menuIcon: {
        fontSize: 24,
        color: '#1E3A8A',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#2563EB',
        letterSpacing: 1,
    },
    profileBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    profileImg: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    titleSection: {
        marginTop: 25,
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        marginBottom: 8,
    },
    pageSubtitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        lineHeight: 22,
    },
    formContainer: {
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#334155',
        marginBottom: 10,
        marginTop: 20,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dropdownValue: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1A1A1A',
    },
    chevronIcon: {
        fontSize: 12,
        color: '#64748B',
    },
    textAreaContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        minHeight: 150,
    },
    textArea: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1A1A1A',
        lineHeight: 22,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dateInput: {
        flex: 1,
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1A1A1A',
    },
    calendarIcon: {
        fontSize: 18,
        color: '#64748B',
    },
    attachmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 15,
    },
    attachmentIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    fileIcon: {
        fontSize: 20,
        color: '#1E40AF',
    },
    attachmentInfo: {
        flex: 1,
    },
    attachmentName: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    attachmentMeta: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 2,
    },
    deleteBtn: {
        padding: 8,
    },
    deleteIcon: {
        fontSize: 20,
        color: '#EF4444',
    },
    addMoreBtn: {
        height: 56,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#CBD5E1',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
        marginBottom: 30,
    },
    addMoreText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E40AF',
    },
    saveBtn: {
        backgroundColor: '#0056B3',
        height: 56,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    saveIcon: {
        fontSize: 18,
        color: '#FFFFFF',
        marginRight: 10,
    },
    saveBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#FFFFFF',
    },
    cancelBtn: {
        backgroundColor: '#E9F2FF',
        height: 56,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cancelBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#0056B3',
    },
    dropdownList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    dropdownItemText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#475569',
    },
    selectedText: {
        color: '#2563EB',
        fontFamily: Fonts.Lexend_SemiBold,
    },
})
