import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Strings from '../../comman/String'


interface Student {
    id: string;
    name: string;
    initials: string;
    selected: boolean;
}

const ReminderHomework = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState(Strings.en.defaultReminderMsg)
    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'Arjun Verma', initials: 'AV', selected: true },
        { id: '2', name: 'Riya Kapoor', initials: 'RK', selected: true },
        { id: '3', name: 'Sahil Malhotra', initials: 'SM', selected: true },
        { id: '4', name: 'Pooja Khanna', initials: 'PK', selected: true },
    ])

    const toggleStudentSelection = (id: string) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s))
    }

    const selectAll = () => {
        const allSelected = students.every(s => s.selected)
        setStudents(prev => prev.map(s => ({ ...s, selected: !allSelected })))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{Strings.en.reminderHomeworkTitle}</Text>
                <TouchableOpacity style={styles.profileBtn}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>👨‍🏫</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Active Session Card */}
                <View style={styles.activeSessionCard}>
                    <View style={styles.activeSessionHeader}>
                        <Text style={styles.megaphoneIcon}>📢</Text>
                        <Text style={styles.activeSessionTitle}>{Strings.en.activeSession.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.activeSessionMain}>
                        {Strings.en.sendingReminderFor}
                        <Text style={styles.boldBlueText}>Mathematics (Grade 10-B)</Text>
                    </Text>
                    <Text style={styles.activeSessionSub}>
                        {Strings.en.targetingStudents}<Text style={styles.boldText}>Quadratic Equations</Text>
                    </Text>
                </View>

                {/* Pending Submissions Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{Strings.en.pendingSubmissions} (12)</Text>
                    <TouchableOpacity onPress={selectAll}>
                        <Text style={styles.selectAllText}>{Strings.en.selectAll}</Text>
                    </TouchableOpacity>
                </View>

                {students.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.studentCard}
                        onPress={() => toggleStudentSelection(item.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.studentInfo}>
                            <View style={styles.initialsCircle}>
                                <Text style={styles.initialsText}>{item.initials}</Text>
                            </View>
                            <Text style={styles.studentName}>{item.name}</Text>
                        </View>
                        <View style={[styles.checkbox, item.selected && styles.checkboxSelected]}>
                            {item.selected && <Text style={styles.checkMark}>✓</Text>}
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.showMoreBtn} activeOpacity={0.6}>
                    <Text style={styles.showMoreText}>
                        <Text style={styles.chevronIcon}>⌄</Text> {Strings.en.showMoreStudents.replace('{count}', '8')}
                    </Text>
                </TouchableOpacity>

                {/* Reminder Message Section */}
                <View style={styles.messageSection}>
                    <Text style={styles.sectionTitle}>{Strings.en.reminderMessageLabel}</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            multiline
                            numberOfLines={4}
                            value={message}
                            onChangeText={setMessage}
                            maxLength={500}
                            placeholder="Type your message here..."
                            placeholderTextColor={Colors.lightGreyText}
                        />
                        <Text style={styles.charCount}>{message.length}/500</Text>
                    </View>
                    <View style={styles.helperContainer}>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                        <Text style={styles.helperText}>{Strings.en.reminderMessageHelper}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Action Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.sendBtn} activeOpacity={0.8}>
                    <Text style={styles.sendBtnIcon}>➤</Text>
                    <Text style={styles.sendBtnText}>{Strings.en.sendReminder}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ReminderHomework

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: 1,
        backgroundColor: Colors.white,
    },
    headerIconBtn: {
        padding: 5,
    },
    closeIcon: {
        fontSize: 20,
        color: Colors.darkText,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#2A5CFF',
        letterSpacing: 0.5,
    },
    profileBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarContainer: {
        flex: 1,
        backgroundColor: '#E0E7FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: 22,
    },
    scrollContent: {
        paddingHorizontal: HWSize.W_Width20,
        paddingBottom: 120,
    },
    activeSessionCard: {
        backgroundColor: '#F0F5FF',
        borderRadius: 12,
        padding: 16,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#D0E0FF',
    },
    activeSessionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    megaphoneIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    activeSessionTitle: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
    },
    activeSessionMain: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 6,
    },
    activeSessionSub: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
    },
    boldText: {
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    boldBlueText: {
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    selectAllText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#2A5CFF',
    },
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    initialsCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#D1E0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    initialsText: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
    },
    studentName: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textMain,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#2A5CFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#2A5CFF',
    },
    checkMark: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    showMoreBtn: {
        paddingVertical: 12,
        backgroundColor: '#F8FAFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E7FF',
        borderStyle: 'dashed',
        alignItems: 'center',
        marginTop: 5,
    },
    showMoreText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    chevronIcon: {
        fontSize: 18,
    },
    messageSection: {
        marginTop: 25,
    },
    textAreaContainer: {
        marginTop: 10,
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 12,
    },
    textArea: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textMain,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    charCount: {
        alignSelf: 'flex-end',
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.lightGreyText,
        marginTop: 5,
    },
    helperContainer: {
        flexDirection: 'row',
        marginTop: 12,
        paddingRight: 20,
    },
    infoIcon: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginRight: 8,
        marginTop: -2,
    },
    helperText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    sendBtn: {
        backgroundColor: '#0055CC',
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    sendBtnIcon: {
        color: Colors.white,
        fontSize: 18,
        marginRight: 10,
        transform: [{ rotate: '-45deg' }],
        marginTop: -2,
    },
    sendBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
})
