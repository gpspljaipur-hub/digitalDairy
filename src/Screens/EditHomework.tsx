import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../comman/Colors'
import Fonts from '../comman/fonts'
import HWSize from '../comman/HWSize'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../comman/Header'
import { useNavigation } from '@react-navigation/native'
import StringsRaw from '../comman/String'

const Strings = StringsRaw.en

const EditHomework = () => {
    const navigation = useNavigation<any>();
    const [homeworkDetails, setHomeworkDetails] = useState('Please complete the exercises from Chapter 4, Section 4.2. Focus on problems 1 through 15. Show all working steps for the algebraic derivations.')
    const [dueDate, setDueDate] = useState('10/30/2023')

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Custom Header matching screenshot */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuBtn}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>TEACHER PORTAL</Text>
                <TouchableOpacity style={styles.profileBtn}>
                    <Image 
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
                        style={styles.profileImg} 
                    />
                </TouchableOpacity>
            </View>

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
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownValue}>Grade 10-B</Text>
                        <Text style={styles.chevronIcon}>︾</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>{Strings.selectSubject}</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownValue}>Mathematics</Text>
                        <Text style={styles.chevronIcon}>︾</Text>
                    </TouchableOpacity>

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
                    <View style={styles.dateInputContainer}>
                        <TextInput
                            style={styles.dateInput}
                            value={dueDate}
                            onChangeText={setDueDate}
                        />
                        <Text style={styles.calendarIcon}>📅</Text>
                    </View>

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
})
