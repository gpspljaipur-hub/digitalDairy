import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import HWSize from '../../comman/HWSize';
import ScreenWrapper from '../../comman/ScreenWrapper';

const LeaveSubmit = () => {
    const navigation = useNavigation<any>();

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title="Application Submitted"
                showBack={true}
                onBack={() => navigation.goBack()}
                showNotification={false}
                showProfile={false}
            />

            <View style={styles.content}>
                {/* Success Icon Section */}
                <View style={styles.successIconOuterContainer}>
                    <View style={styles.successIconContainer}>
                        <View style={styles.checkmarkCircle}>
                            <Text style={styles.checkmark}>✓</Text>
                        </View>
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Application Submitted Successfully!</Text>
                <Text style={styles.description}>
                    Your leave request for Oct 12 - Oct 14 has been sent to the school administration for approval. You will receive a notification once it is processed.
                </Text>

                {/* Details Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.appIdLabel}>APPLICATION ID</Text>
                        <Text style={styles.appIdText}>#LR-2026-8942</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.studentSection}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarEmoji}>👦</Text>
                        </View>
                        <View>
                            <Text style={styles.studentLabel}>Student Name</Text>
                            <Text style={styles.studentName}>Julian Alexander</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.daysContainer}>
                            <Text style={styles.calendarIcon}>📅</Text>
                            <Text style={styles.daysText}>Total: 3 Days</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>PENDING</Text>
                        </View>
                    </View>
                </View>

                {/* Buttons */}
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('ParentDashboard')}
                >
                    <Text style={styles.homeIcon}>🏠</Text>
                    <Text style={styles.homeButtonText}>Go Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.historyButton}
                    onPress={() => navigation.navigate('LeaveHistory')}
                >
                    <Text style={styles.historyText}>View My History</Text>
                </TouchableOpacity>

                {/* Footer Info Box */}
                <View style={styles.infoBox}>
                    <View style={styles.infoIconContainer}>
                        <Text style={styles.infoIcon}>ℹ️</Text>
                    </View>
                    <Text style={styles.infoText}>
                        Need to cancel this request? You can do so within the next 2 hours through the "Applications" tab.
                    </Text>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFC',
    },
    content: {
        padding: HWSize.W_Width20,
        alignItems: 'center',
    },
    successIconOuterContainer: {
        marginTop: 40,
        marginBottom: 30,
    },
    successIconContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#F0F7FF',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkCircle: {
        width: 60,
        height: 60,
        backgroundColor: '#0047AB',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#E1F0FF',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    description: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 30,
    },
    cardHeader: {
        marginBottom: 15,
    },
    appIdLabel: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 4,
    },
    appIdText: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 20,
    },
    studentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    avatarEmoji: {
        fontSize: 30,
    },
    studentLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#94A3B8',
        marginBottom: 2,
    },
    studentName: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 12,
    },
    daysContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    daysText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    statusBadge: {
        backgroundColor: '#065F46',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
        letterSpacing: 0.5,
    },
    homeButton: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#0047AB',
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    homeIcon: {
        fontSize: 18,
        color: '#FFFFFF',
        marginRight: 10,
    },
    homeButtonText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#FFFFFF',
    },
    historyButton: {
        marginBottom: 30,
    },
    historyText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#475569',
        textDecorationLine: 'underline',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#E2E8F0',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'flex-start',
    },
    infoIconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    infoIcon: {
        fontSize: 18,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#475569',
        lineHeight: 18,
    },
});

export default LeaveSubmit;