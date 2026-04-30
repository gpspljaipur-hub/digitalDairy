import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../../comman/Header'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'

const HomeworkDetails = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { homeworkData } = route.params;
    const [homeworkList, setHomeworkList] = useState<any>({});

    console.log('homeworkData', homeworkData);
    const submissions = [
        { id: '1', name: 'Aditi Sharma', time: 'Today, 09:15 AM', status: 'Submitted', color: '#4ADE80', bgColor: '#E8F5E9', initials: 'AS' },
        { id: '2', name: 'Arjun Verma', time: 'Late submission', status: 'Late', color: '#EF4444', bgColor: '#FEE2E2', initials: 'AV' },
        { id: '3', name: 'Riya Kapoor', time: 'Not started', status: 'Pending', color: '#64748B', bgColor: '#F1F5F9', initials: 'RK' },
    ]

    useEffect(() => {
        if (homeworkData.classId) {
            fetchHomeworkList(homeworkData.classId._id);
        }
    }, [homeworkData.classId]);

    const fetchHomeworkList = async (classId: string) => {
        console.log('fetchHomeworkList', classId);
        try {
            const res = await Auth_ApiRequest(ApiUrl.HomeworkList, { classId });
            console.log('Homework List Response:', res);

            if (res && !res.error) {
                const list = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
                const HomeWork = list.find((item: any) => item?._id === homeworkData?._id);
                console.log('HomeWork Found:', HomeWork);
                setHomeworkList(HomeWork || homeworkData);
            }
        } catch (error) {
            console.error('Fetch Homework List Error:', error);
        }
    }

    const formatDate = (date: any) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'N/A';
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <Header
                title="Assignment Details"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                rightIcon="⋮"
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Assignment Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.cardTopRow}>
                        <View style={styles.gradeBadge}>
                            <Text style={styles.gradeText}>{homeworkList?.classId?.name} {homeworkList?.classId?.section} </Text>
                        </View>
                        <View style={styles.dateRow}>
                            <Text style={styles.calendarIcon}>📅</Text>
                            <Text style={styles.dateText}>Due: {formatDate(homeworkList?.date)}</Text>
                        </View>
                    </View>
                    <Text style={styles.subjectText}>{homeworkList?.subjectId?.name}</Text>
                    <Text style={styles.topicText}>{homeworkList?.message}</Text>
                </View>

                {/* Instructions Section */}
                <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
                <View style={styles.instructionCard}>
                    <Text style={styles.instructionText}>
                        {homeworkList?.message}
                    </Text>
                </View>

                {/* Attachments Section */}
                <Text style={styles.sectionTitle}>ATTACHMENTS</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attachmentScroll}>
                    <View style={styles.fileAttachment}>
                        <View style={styles.fileIconContainer}>
                            <Text style={styles.fileIcon}>📄</Text>
                        </View>
                        <Text style={styles.fileName}>Formula_Sheet.pdf</Text>
                    </View>
                </ScrollView>

                {/* Submissions Section */}
                <View style={styles.submissionHeader}>
                    <Text style={styles.sectionTitle}>SUBMISSIONS</Text>
                    <Text style={styles.submissionCount}>22 / 30 Submitted</Text>
                </View>

                {submissions.map((item) => (
                    <View key={item.id} style={styles.submissionCard}>
                        <View style={[styles.avatar, { backgroundColor: '#1E40AF' }]}>
                            <Text style={styles.avatarText}>{item.initials}</Text>
                        </View>
                        <View style={styles.submissionInfo}>
                            <Text style={styles.studentName}>{item.name}</Text>
                            <Text style={styles.submissionTime}>{item.time}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: item.bgColor }]}>
                            <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.editBtn}
                    onPress={() => navigation.navigate("EditHomework")}>
                    <Text style={styles.editBtnIcon}>✎</Text>
                    <Text style={styles.editBtnText}>Edit Homework</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reminderBtn}
                    onPress={() => navigation.navigate("ReminderHomework")}>
                    <Text style={styles.reminderBtnIcon}>🔔</Text>
                    <Text style={styles.reminderBtnText}>Send Reminder</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeworkDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    gradeBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    gradeText: {
        color: '#64748B',
        fontFamily: Fonts.Lexend_Medium,
        fontSize: 12,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    dateText: {
        color: '#EF4444',
        fontFamily: Fonts.Lexend_SemiBold,
        fontSize: 13,
    },
    subjectText: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
        marginBottom: 4,
    },
    topicText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        marginTop: 25,
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    instructionCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    instructionText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#334155',
        lineHeight: 22,
    },
    attachmentScroll: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    imageAttachment: {
        width: 140,
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    attachmentImg: {
        width: '100%',
        height: '100%',
    },
    fileAttachment: {
        width: 140,
        height: 180,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    fileIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    fileIcon: {
        fontSize: 24,
    },
    fileName: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1E40AF',
        textAlign: 'center',
    },
    submissionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 12,
    },
    submissionCount: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    submissionCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: Colors.white,
        fontFamily: Fonts.LexendBold,
        fontSize: 16,
    },
    submissionInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
        marginBottom: 2,
    },
    submissionTime: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
    },
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    editBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#E2E8F0',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    editBtnText: {
        color: '#1E3A8A',
        fontFamily: Fonts.LexendBold,
        fontSize: 15,
        marginLeft: 8,
    },
    editBtnIcon: {
        fontSize: 18,
        color: '#1E3A8A',
    },
    reminderBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#004085',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    reminderBtnText: {
        color: Colors.white,
        fontFamily: Fonts.LexendBold,
        fontSize: 15,
        marginLeft: 8,
    },
    reminderBtnIcon: {
        fontSize: 18,
        color: Colors.white,
    },
})
