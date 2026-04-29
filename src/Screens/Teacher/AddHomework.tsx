import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, Switch, KeyboardAvoidingView, Platform } from 'react-native'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../comman/DatePicker'
const CLASSES = ['Grade 10-A', 'Grade 10-B', 'Grade 11-A', 'Grade 11-B', 'Grade 12-A'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry'];

const AddHomework = () => {
    const navigation = useNavigation<any>();
    const [notifyParents, setNotifyParents] = useState(true)
    const [homeworkDetails, setHomeworkDetails] = useState('')
    const [selectedClass, setSelectedClass] = useState('Select a grade')
    const [selectedSubject, setSelectedSubject] = useState('Select subject')
    const [showClassList, setShowClassList] = useState(false)
    const [showSubjectList, setShowSubjectList] = useState(false)
    const [dueDate, setDueDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Homework</Text>
                    <Text style={styles.draftText}>Draft saved</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                        <Text style={styles.infoText}>
                            Fill in the details below to assign new homework to your students.
                        </Text>
                    </View>

                    {/* Select Class */}
                    <Text style={styles.label}>Select Class</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        activeOpacity={0.7}
                        onPress={() => {
                            setShowClassList(!showClassList);
                            setShowSubjectList(false);
                        }}
                    >
                        <Text style={[styles.dropdownText, selectedClass !== 'Select a grade' && { color: '#1A1A1A' }]}>
                            {selectedClass}
                        </Text>
                        <Text style={[styles.chevronIcon, showClassList && { transform: [{ rotate: '180deg' }] }]}>︾</Text>
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

                    {/* Select Subject */}
                    <Text style={styles.label}>Select Subject</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        activeOpacity={0.7}
                        onPress={() => {
                            setShowSubjectList(!showSubjectList);
                            setShowClassList(false);
                        }}
                    >
                        <Text style={[styles.dropdownText, selectedSubject !== 'Select subject' && { color: '#1A1A1A' }]}>
                            {selectedSubject}
                        </Text>
                        <Text style={[styles.chevronIcon, showSubjectList && { transform: [{ rotate: '180deg' }] }]}>︾</Text>
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

                    {/* Homework Details */}
                    <Text style={styles.label}>Homework Details</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Write instructions, page numbers, or questions here..."
                            multiline
                            numberOfLines={2}
                            value={homeworkDetails}
                            onChangeText={setHomeworkDetails}
                            textAlignVertical="top"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>

                    {/* Attachments */}
                    <Text style={styles.label}>Attachments</Text>
                    <View style={styles.attachmentsRow}>
                        <TouchableOpacity style={styles.attachBtn}>
                            <Text style={styles.attachIcon}>📷⁺</Text>
                            <Text style={styles.attachText}>Attach Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.supportedText}>Supported: JPG, PNG, PDF (Max 10MB)</Text>

                    {/* Date and Notify Section */}
                    <View style={styles.settingsCard}>
                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>📅</Text>
                                <Text style={styles.settingLabel}>Due Date</Text>
                            </View>
                            <Text style={styles.settingAction}>{formatDate(dueDate)}</Text>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <View style={styles.settingRow}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🔔</Text>
                                <Text style={styles.settingLabel}>Notify Parents</Text>
                            </View>
                            <Switch
                                value={notifyParents}
                                onValueChange={setNotifyParents}
                                trackColor={{ false: '#CBD5E1', true: '#1E3A8A' }}
                                thumbColor="#FFFFFF"
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.postBtn}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('PostHomework', {
                            homework: {
                                subject: selectedSubject,
                                class: selectedClass,
                                dueDate: formatDate(dueDate)
                            }
                        })}
                    >
                        <Text style={styles.postBtnText}>➤ Post Homework</Text>
                    </TouchableOpacity>
                </View>

                <DatePicker
                    visible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    selectedDate={dueDate}
                    onSelect={(date) => {
                        setDueDate(date);
                        setShowDatePicker(false);
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AddHomework

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backBtn: {
        paddingRight: 15,
    },
    backIcon: {
        fontSize: 24,
        color: '#2563EB',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#2563EB',
        flex: 1,
    },
    draftText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#EEF2FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#C7D2FE',
    },
    infoIcon: {
        fontSize: 20,
        color: '#1E40AF',
        marginRight: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#374151',
        lineHeight: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
        marginBottom: 10,
        marginTop: 16,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dropdownText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
    },
    chevronIcon: {
        fontSize: 14,
        color: '#64748B',
    },
    textAreaContainer: {
        backgroundColor: Colors.white,
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
        minHeight: 130,
        textAlignVertical: 'top',
    },
    attachmentsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 4,
    },
    attachBtn: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#CBD5E1',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    attachIcon: {
        fontSize: 28,
        color: '#2563EB',
        marginBottom: 8,
    },
    attachText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#2563EB',
    },
    imagePreviewContainer: {
        width: 120,
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    removeBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    removeIcon: {
        fontSize: 18,
        color: '#EF4444',
    },
    supportedText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 12,
    },
    settingsCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        height: 60,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1A1A1A',
    },
    settingAction: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginHorizontal: 16,
    },
    footer: {
        padding: 20,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    postBtn: {
        backgroundColor: '#003F88',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    dropdownList: {
        backgroundColor: Colors.white,
        borderRadius: 10,
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
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    dropdownItemText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
    },
    selectedItemText: {
        color: '#2563EB',
        fontFamily: Fonts.LexendBold,
    },
    selectedCheck: {
        color: '#2563EB',
        fontSize: 14,
    },
})
