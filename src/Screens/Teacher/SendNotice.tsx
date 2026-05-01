import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import { useNavigation } from '@react-navigation/native'
import useStrings from '../../comman/useStrings'

const SendNotice = () => {
    const navigation = useNavigation<any>();
    const Strings = useStrings();

    return (
        <ScreenWrapper style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{Strings.noticeSent}</Text>
            </View>

            <View style={styles.content}>
                {/* Success Indicator */}
                <View style={styles.successSection}>
                    <View style={styles.successBox}>
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkIcon}>✓</Text>
                        </View>
                    </View>
                    <Text style={styles.successTitle}>{Strings.noticeSentSuccess}</Text>
                    <Text style={styles.successSubtitle}>
                        {Strings.noticeBroadcastedDesc}
                    </Text>
                </View>

                {/* Notice Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryIcon}>📄</Text>
                        <Text style={styles.summaryHeaderText}>{Strings.noticeSummary}</Text>
                    </View>

                    <View style={styles.summaryContent}>
                        <Text style={styles.label}>{Strings.noticeTitleLabel}</Text>
                        <Text style={styles.noticeTitle}>Annual Sports Day Postponed</Text>

                        <View style={styles.summaryFooter}>
                            <View style={styles.footerCol}>
                                <Text style={styles.label}>{Strings.classesLabel}</Text>
                                <View style={styles.chipsRow}>
                                    <View style={styles.chip}><Text style={styles.chipText}>Grade 10-A</Text></View>
                                    <View style={styles.chip}><Text style={styles.chipText}>Grade 10-B</Text></View>
                                </View>
                            </View>
                            <View style={styles.footerColRight}>
                                <Text style={styles.label}>{Strings.dateLabel}</Text>
                                <Text style={styles.dateText}>1 may 2026</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Broadcast Graphic */}
                <View style={styles.graphicContainer}>
                    <View style={styles.graphicCircle}>
                        <View style={styles.innerCircle}>
                            <Text style={styles.wifiIcon}>📡</Text>
                        </View>
                    </View>
                </View>

                {/* Buttons */}
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate('Dashboard')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryBtnText}>{Strings.backToDashboard}</Text>
                    <Text style={styles.btnIcon}>⊞</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ViewAllNotice')}
                >
                    <Text style={styles.secondaryBtnText}>{Strings.viewAllNotices}</Text>
                    <Text style={styles.btnIconSec}>📋</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default SendNotice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.white,
    },
    backBtn: {
        padding: 5,
    },
    backIcon: {
        fontSize: 24,
        color: '#1E40AF',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
        marginLeft: 15,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        alignItems: 'center',
    },
    successSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    successBox: {
        width: 80,
        height: 80,
        backgroundColor: '#6EFFAA',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    successTitle: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    successSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    summaryCard: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 16,
        marginBottom: 24,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    summaryHeaderText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#111827',
    },
    summaryContent: {
        width: '100%',
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#6B7280',
        marginBottom: 4,
    },
    noticeTitle: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#111827',
        marginBottom: 16,
    },
    summaryFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerCol: {
        flex: 1,
    },
    footerColRight: {
        alignItems: 'flex-end',
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 4,
    },
    chipText: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Medium,
        color: '#374151',
    },
    dateText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#111827',
    },
    graphicContainer: {
        width: '100%',
        height: 160,
        backgroundColor: '#D1D5DB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden',
    },
    graphicCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wifiIcon: {
        fontSize: 30,
    },
    primaryBtn: {
        width: '100%',
        backgroundColor: '#0047AB',
        borderRadius: 10,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        marginRight: 10,
    },
    btnIcon: {
        color: Colors.white,
        fontSize: 18,
    },
    secondaryBtn: {
        width: '100%',
        backgroundColor: '#D1D5DB',
        borderRadius: 10,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    secondaryBtnText: {
        color: '#374151',
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        marginRight: 10,
    },
    btnIconSec: {
        fontSize: 18,
    },
})
