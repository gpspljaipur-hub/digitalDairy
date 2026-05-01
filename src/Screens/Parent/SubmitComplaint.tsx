import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const SubmitComplaint = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { category, date } = route.params;

    const referenceId = "#CMP-2026-4512";

    return (
        <ScreenWrapper scroll={true} style={styles.mainContainer}>
            <Header
                title="School Support"
                showBack={true}
                // onBack={() => navigation.navigate('ParentDashboard')}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <View style={styles.container}>
                {/* Success Icon */}
                <View style={styles.successIconContainer}>
                    <View style={styles.successBox}>
                        <Text style={styles.checkIcon}>✓</Text>
                    </View>
                </View>

                {/* Status Message */}
                <Text style={styles.successTitle}>Complaint Submitted Successfully</Text>

                <View style={styles.referenceContainer}>
                    <Text style={styles.referenceLabel}>REFERENCE ID</Text>
                    <Text style={styles.referenceId}>{referenceId}</Text>
                </View>

                <Text style={styles.description}>
                    Your concern has been recorded. The school administration will review it and get back to you within 48 hours.
                </Text>

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryTitle}>Submission Summary</Text>
                        <Text style={styles.docIcon}>📄</Text>
                    </View>

                    <View style={styles.summaryContent}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.itemLabel}>Category</Text>
                            <View style={styles.itemValueRow}>
                                <Text style={styles.itemIcon}>🏢</Text>
                                <Text style={styles.itemValue}>{category}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.summaryItem}>
                            <Text style={styles.itemLabel}>Date</Text>
                            <View style={styles.itemValueRow}>
                                <Text style={styles.itemIcon}>📅</Text>
                                <Text style={styles.itemValue}>{date}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity
                    style={styles.homeBtn}
                    onPress={() => navigation.navigate('ParentDashboard')}
                >
                    <Text style={styles.btnIcon}>🏠</Text>
                    <Text style={styles.homeBtnText}>Go to Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => navigation.navigate('ViewMyComplaint')}
                >
                    <Text style={styles.viewBtnIcon}>⚠</Text>
                    <Text style={styles.viewBtnText}>View My Complaints</Text>
                </TouchableOpacity>

                {/* Commitment Footer */}
                <View style={styles.footer}>
                    <Text style={styles.shieldIcon}>🛡️</Text>
                    <Text style={styles.footerText}>We are committed to a safe learning environment.</Text>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default SubmitComplaint

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F8F9FE',
    },
    container: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: 40,
        alignItems: 'center',
    },
    successIconContainer: {
        marginBottom: 25,
    },
    successBox: {
        width: 80,
        height: 80,
        backgroundColor: '#6DFF8A',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#6DFF8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    checkIcon: {
        fontSize: 40,
        color: '#1A5D1A',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 26,
        fontFamily: Fonts.LexendBold,
        color: '#003366',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        lineHeight: 32,
    },
    referenceContainer: {
        backgroundColor: '#E8F0FF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 25,
    },
    referenceLabel: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#667799',
        letterSpacing: 1,
        marginBottom: 4,
    },
    referenceId: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#114488',
    },
    description: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#556677',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 35,
        paddingHorizontal: 10,
    },
    summaryCard: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    docIcon: {
        fontSize: 18,
        color: '#556677',
    },
    summaryContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryItem: {
        flex: 1,
    },
    itemLabel: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.lightGreyText,
        marginBottom: 6,
    },
    itemValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    itemValue: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#EEEEEE',
        marginHorizontal: 15,
    },
    homeBtn: {
        width: '100%',
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        elevation: 3,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    homeBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
    },
    btnIcon: {
        fontSize: 20,
        color: Colors.white,
        marginRight: 10,
    },
    viewBtn: {
        width: '100%',
        backgroundColor: '#EBF3FF',
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D0E3FF',
        marginBottom: 30,
    },
    viewBtnText: {
        color: Colors.primary,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
    },
    viewBtnIcon: {
        fontSize: 18,
        color: Colors.primary,
        marginRight: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    shieldIcon: {
        fontSize: 14,
        marginRight: 8,
    },
    footerText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.lightGreyText,
    },
})
