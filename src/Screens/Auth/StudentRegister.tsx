import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import Strings from '../../comman/String'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import FontsSize from '../../comman/FontsSize'

const StudentRegister = ({ navigation }: any) => {
    const [fullName, setFullName] = useState('')
    const [selectedClass, setSelectedClass] = useState('')
    const [isClassPickerVisible, setIsClassPickerVisible] = useState(false)
    const [schoolName, setSchoolName] = useState('')
    const [isSchoolPickerVisible, setIsSchoolPickerVisible] = useState(false)

    const s = Strings.en;

    const schools = [
        { id: '1', name: s.school1 },
        { id: '2', name: s.school2 },
        { id: '3', name: s.school3 },
        { id: '4', name: s.school4 },
    ];

    const classList = [
        { id: '1', name: 'Grade 9-A' },
        { id: '2', name: 'Grade 9-B' },
        { id: '3', name: 'Grade 10-A' },
        { id: '4', name: 'Grade 10-B' },
        { id: '5', name: 'Grade 11-A' },
        { id: '6', name: 'Grade 11-B' },
        { id: '7', name: 'Grade 12-A' },
        { id: '8', name: 'Grade 12-B' },
    ];


    return (
        <ScreenWrapper
            scroll={true}
            scrollEnabled={!isClassPickerVisible && !isSchoolPickerVisible}
            style={styles.container}
        >
            <Header
                title={s.studentRegistration}
                showBack={true}
                onBack={() => navigation?.goBack()}
                showNotification={false}
                showProfile={false}
            />

            <View style={styles.content}>
                {/* Progress Section */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressTextRow}>
                        <Text style={styles.stepText}>{s.step1of2}</Text>
                        <Text style={styles.percentageText}>{s.fiftyPercentComplete}</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{s.createStudentProfile}</Text>
                    <Text style={styles.subtitle}>{s.registrationSubtitle}</Text>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{s.studentFullName}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={s.fullNamePlaceholder}
                            placeholderTextColor={Colors.lightGreyText}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{s.classLabel}</Text>
                        <TouchableOpacity
                            style={[styles.dropdown, isClassPickerVisible && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                            onPress={() => {
                                setIsClassPickerVisible(!isClassPickerVisible);
                                if (isSchoolPickerVisible) setIsSchoolPickerVisible(false);
                            }}
                        >
                            <Text style={[styles.dropdownText, !selectedClass && { color: Colors.lightGreyText }]}>
                                {selectedClass || s.selectClass}
                            </Text>
                            <Text style={styles.dropdownIcon}>{isClassPickerVisible ? '⌃' : '⌄'}</Text>
                        </TouchableOpacity>

                        {isClassPickerVisible && (
                            <View style={styles.dropdownList}>
                                <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
                                    {classList.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.schoolOption}
                                            onPress={() => {
                                                setSelectedClass(item.name);
                                                setIsClassPickerVisible(false);
                                            }}
                                        >
                                            <Text style={styles.schoolOptionText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{s.schoolName}</Text>
                        <TouchableOpacity
                            style={[styles.dropdown, isSchoolPickerVisible && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                            onPress={() => {
                                setIsSchoolPickerVisible(!isSchoolPickerVisible);
                                if (isClassPickerVisible) setIsClassPickerVisible(false);
                            }}
                        >
                            <Text style={[styles.dropdownText, !schoolName && { color: Colors.lightGreyText }]}>
                                {schoolName || s.selectSchool}
                            </Text>
                            <Text style={styles.dropdownIcon}>{isSchoolPickerVisible ? '⌃' : '⌄'}</Text>
                        </TouchableOpacity>

                        {isSchoolPickerVisible && (
                            <View style={styles.dropdownList}>
                                <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
                                    {schools.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.schoolOption}
                                            onPress={() => {
                                                setSchoolName(item.name);
                                                setIsSchoolPickerVisible(false);
                                            }}
                                        >
                                            <Text style={styles.schoolOptionText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>
                        <Text style={{ fontSize: 24 }}>📚</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>{s.officialRegistration}</Text>
                        <Text style={styles.infoDesc}>{s.encryptionNote}</Text>
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.registerBtn}
                    onPress={() => navigation.navigate('ParentRegister')}>
                    <Text style={styles.registerBtnText}>{s.registerContinue}</Text>
                    <Text style={styles.btnArrow}>→</Text>
                </TouchableOpacity>

                {/* Help Link */}
                <View style={styles.helpContainer}>
                    <Text style={styles.helpIcon}>❓</Text>
                    <Text style={styles.helpText}>
                        {s.helpFindingID}
                        <Text style={styles.helpLink} onPress={() => { }}>{s.contactSchool}</Text>
                    </Text>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default StudentRegister

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    content: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    progressContainer: {
        marginBottom: 25,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    stepText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    percentageText: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#0046BF',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '50%',
        height: '100%',
        backgroundColor: '#0046BF',
        borderRadius: 4,
    },
    titleSection: {
        marginBottom: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#4B5563',
        lineHeight: 22,
    },
    form: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
        backgroundColor: Colors.white,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 52,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
    },
    dropdownText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
    },
    dropdownIcon: {
        fontSize: 24,
        color: '#6B7280',
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: Colors.white,
        overflow: 'hidden',
    },
    schoolOption: {
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    schoolOptionText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#F0F7FF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    infoIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
        marginBottom: 4,
    },
    infoDesc: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#4B5563',
        lineHeight: 18,
    },
    registerBtn: {
        flexDirection: 'row',
        backgroundColor: '#0056D2',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    registerBtnText: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginRight: 12,
    },
    btnArrow: {
        fontSize: 22,
        color: Colors.white,
    },

    helpContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    helpIcon: {
        fontSize: 18,
        color: Colors.primary,
        marginRight: 10,
        marginTop: -2,
    },
    helpText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    helpLink: {
        color: Colors.primary,
        fontFamily: Fonts.LexendBold,
        textDecorationLine: 'underline',
    },
})