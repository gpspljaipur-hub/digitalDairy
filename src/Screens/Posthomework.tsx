import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../comman/Colors'
import Fonts from '../comman/fonts'
import StringsRaw from '../comman/String'
import HWSize from '../comman/HWSize'
import ImageSize from '../comman/ImageSize'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'

const Strings = StringsRaw.en

const PostHomework = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const homework = route.params?.homework || {
        subject: 'Mathematics',
        class: 'Grade 10-B',
        dueDate: 'Oct 30, 2023'
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.successIconOuter}>
                    <View style={styles.successIconInner}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                </View>

                {/* Title & Subtitle */}
                <Text style={styles.title}>{Strings.homeworkPosted}</Text>
                <Text style={styles.subtitle}>{Strings.homeworkPostedDesc}</Text>

                {/* Summary Card */}
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>{Strings.assignmentSummary}</Text>
                    <View style={styles.divider} />

                    <SummaryRow
                        icon="📖"
                        iconBg="#EBF5FF"
                        label={Strings.subjectLabel}
                        value={homework.subject}
                    />
                    <SummaryRow
                        icon="👥"
                        iconBg="#F0EFFF"
                        label={Strings.classLabel}
                        value={homework.class}
                    />
                    <SummaryRow
                        icon="📅"
                        iconBg="#F0F9FF"
                        label={Strings.dueDateLabel}
                        value={homework.dueDate}
                    />
                </View>

                {/* Action Buttons */}
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate('Dashboard')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.btnIcon}>⊞</Text>
                    <Text style={styles.primaryBtnText}>{Strings.backToDashboard}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => navigation.navigate('HomeworkDetails')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.btnIcon, { color: '#1E40AF' }]}>👁</Text>
                    <Text style={styles.secondaryBtnText}>{Strings.viewHomework}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const SummaryRow = ({ icon, iconBg, label, value }: any) => (
    <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
            <Text style={styles.rowIcon}>{icon}</Text>
        </View>
        <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    </View>
)

export default PostHomework

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    successBanner: {
        backgroundColor: '#E8F5E9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    successBannerText: {
        color: '#2E7D32',
        fontFamily: Fonts.Lexend_Medium,
        fontSize: 14,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    content: {
        paddingHorizontal: HWSize.W_Width20,
        alignItems: 'center',
        paddingTop: HWSize.H_Height40,
    },
    successIconOuter: {
        width: HWSize.W_Width80,
        height: HWSize.W_Width80,
        borderRadius: HWSize.W_Width40,
        backgroundColor: '#CCFFD1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: HWSize.H_Height20,
    },
    successIconInner: {
        width: HWSize.W_Width60,
        height: HWSize.W_Width60,
        borderRadius: HWSize.W_Width30,
        backgroundColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    checkmark: {
        fontSize: 32,
        color: Colors.white,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 26,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: Colors.white,
        width: '100%',
        borderRadius: 16,
        padding: HWSize.W_Width20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: HWSize.H_Height30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardHeader: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
        marginBottom: HWSize.H_Height15,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: HWSize.H_Height20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: HWSize.H_Height20,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: HWSize.W_Width15,
    },
    rowIcon: {
        fontSize: 20,
    },
    rowContent: {
        flex: 1,
    },
    rowLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
        marginBottom: 2,
    },
    rowValue: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    primaryBtn: {
        flexDirection: 'row',
        backgroundColor: '#0056B3',
        width: '100%',
        height: HWSize.H_Height55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: HWSize.H_Height15,
        elevation: 4,
        shadowColor: '#0056B3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    primaryBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        marginLeft: 10,
    },
    secondaryBtn: {
        flexDirection: 'row',
        backgroundColor: '#E2E8F0',
        width: '100%',
        height: HWSize.H_Height55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: HWSize.H_Height30,
    },
    secondaryBtnText: {
        color: '#1E40AF',
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        marginLeft: 10,
    },
    btnIcon: {
        fontSize: 20,
        color: Colors.white,
    },
    illustrationContainer: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: '60%',
        height: '100%',
    },
})