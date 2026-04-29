import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../../comman/Colors'
import StringsRaw from '../../comman/String'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import Header from '../../comman/Header'
import BottomTab from '../../Component/Bottom'
import { SafeAreaView } from 'react-native-safe-area-context'

const Strings = StringsRaw.en

const OfflineDashboard = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            {/* Header */}
            <Header
                title="School Portal"
                rightIcon="📵"
                showNotification={false}
            />

            {/* Offline Mode Banner */}
            <View style={styles.offlineBanner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.bannerIcon}>📡</Text>
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>OFFLINE MODE</Text>
                        <Text style={styles.bannerSubtitle}>Changes will sync when online</Text>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Welcome Card */}
                <View style={styles.welcomeCard}>
                    <View style={styles.welcomeContent}>
                        <Text style={styles.welcomeTitle}>Welcome back, Sarah</Text>
                        <Text style={styles.welcomeSubtitle}>
                            View Arjun's progress and recent school updates even while offline.
                        </Text>
                        <TouchableOpacity style={styles.reportBtn}>
                            <Text style={styles.reportBtnText}>View Report Card</Text>
                            <Text style={styles.reportBtnIcon}>›</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardPatternContainer}>
                        <Text style={styles.patternIcon}>🎓</Text>
                    </View>
                </View>

                {/* Next Holiday Card */}
                <View style={styles.holidayCard}>
                    <View style={styles.holidayIconBg}>
                        <Text style={styles.holidayIcon}>📅</Text>
                    </View>
                    <Text style={styles.holidayLabel}>Next Holiday</Text>
                    <Text style={styles.holidayName}>Diwali Break: Oct 28</Text>
                    <View style={styles.syncStatus}>
                        <Text style={styles.syncIcon}>🔄</Text>
                        <Text style={styles.syncText}>Not Synced</Text>
                    </View>
                </View>

                {/* Main Features Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Main Features</Text>
                </View>
                <View style={styles.gridContainer}>
                    <FeatureCard
                        icon="👤"
                        label="Attendance"
                        value="94% Monthly Avg"
                        notSynced={true}
                        iconBg="#EEF2FF"
                        iconColor="#4338CA"
                    />
                    <FeatureCard
                        icon="📝"
                        label="Homework"
                        value="3 Pending Tasks"
                        iconBg="#F0FDF4"
                        iconColor="#15803D"
                    />
                    <FeatureCard
                        icon="🔔"
                        label="Notices"
                        value="2 New Updates"
                        notSynced={true}
                        iconBg="#F5F3FF"
                        iconColor="#6D28D9"
                    />
                    <FeatureCard
                        icon="💰"
                        label="Fee Status"
                        value="Fully Paid"
                        iconBg="#FFFBEB"
                        iconColor="#B45309"
                    />
                </View>

                {/* Resources Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Resources</Text>
                    <View style={styles.localCacheBadge}>
                        <Text style={styles.localCacheIcon}>🔄</Text>
                        <Text style={styles.localCacheText}>LOCAL CACHE ONLY</Text>
                    </View>
                </View>

                <View style={styles.resourceList}>
                    <ResourceItem
                        title="Annual Syllabus 2024.pdf"
                        details="2.4 MB • Downloaded"
                        isDownloaded={true}
                    />
                    <ResourceItem
                        title="October Newsletter.pdf"
                        details="Not available offline"
                        isDownloaded={false}
                    />
                </View>

                {/* Alert Notice */}
                <View style={styles.alertCard}>
                    <Text style={styles.alertIcon}>⚠️</Text>
                    <View style={styles.alertContent}>
                        <Text style={styles.alertTitle}>School Update: Heavy Rainfall</Text>
                        <Text style={styles.alertText}>
                            School will close early today at 1:00 PM. Please arrange for student pickup. (Updated 2 hours ago)
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <BottomTab activeTab="HOME" />
        </SafeAreaView>
    )
}

const FeatureCard = ({ icon, label, value, notSynced, iconBg, iconColor }: any) => (
    <View style={styles.featureCard}>
        <View style={styles.featureCardHeader}>
            <View style={[styles.featureIconBg, { backgroundColor: iconBg }]}>
                <Text style={[styles.featureIcon, { color: iconColor }]}>{icon}</Text>
            </View>
            {notSynced && <Text style={styles.notSyncedBadge}>🔄</Text>}
        </View>
        <Text style={styles.featureLabel}>{label}</Text>
        <Text style={styles.featureValue}>{value}</Text>
    </View>
)

const ResourceItem = ({ title, details, isDownloaded }: any) => (
    <View style={styles.resourceItem}>
        <View style={styles.resourceLeft}>
            <View style={[styles.resourceIconBg, { backgroundColor: isDownloaded ? '#FEE2E2' : '#EFF6FF' }]}>
                <Text style={styles.resourceIcon}>{isDownloaded ? '📄' : '📄'}</Text>
            </View>
            <View>
                <Text style={styles.resourceTitle}>{title}</Text>
                <Text style={styles.resourceDetails}>{details}</Text>
            </View>
        </View>
        <Text style={[styles.resourceActionIcon, { color: isDownloaded ? '#64748B' : '#F97316' }]}>
            {isDownloaded ? '👁️' : '☁️'}
        </Text>
    </View>
)

export default OfflineDashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    offlineBanner: {
        backgroundColor: '#EA580C',
        paddingVertical: 12,
        paddingHorizontal: HWSize.W_Width20,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerIcon: {
        fontSize: 18,
        marginRight: 10,
        color: Colors.white,
    },
    bannerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    bannerTitle: {
        color: Colors.white,
        fontFamily: Fonts.LexendBold,
        fontSize: 13,
        letterSpacing: 0.5,
    },
    bannerSubtitle: {
        color: Colors.white,
        fontFamily: Fonts.Lexend_Regular,
        fontSize: 12,
        opacity: 0.95,
    },
    welcomeCard: {
        backgroundColor: '#0245A3',
        marginHorizontal: HWSize.W_Width20,
        marginTop: 20,
        borderRadius: 20,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#0245A3',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    welcomeContent: {
        flex: 1,
        zIndex: 2,
    },
    welcomeTitle: {
        color: Colors.white,
        fontSize: 26,
        fontFamily: Fonts.LexendBold,
        marginBottom: 8,
    },
    welcomeSubtitle: {
        color: Colors.white,
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        opacity: 0.85,
        lineHeight: 22,
        marginBottom: 24,
    },
    reportBtn: {
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    reportBtnText: {
        color: '#0245A3',
        fontFamily: Fonts.LexendBold,
        fontSize: 14,
        marginRight: 8,
    },
    reportBtnIcon: {
        color: '#0245A3',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardPatternContainer: {
        position: 'absolute',
        right: -30,
        bottom: -30,
        opacity: 0.15,
        zIndex: 1,
    },
    patternIcon: {
        fontSize: 150,
        color: Colors.white,
    },
    holidayCard: {
        backgroundColor: Colors.white,
        marginHorizontal: HWSize.W_Width20,
        marginTop: 16,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    holidayIconBg: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    holidayIcon: {
        fontSize: 28,
    },
    holidayLabel: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
        marginBottom: 4,
    },
    holidayName: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginBottom: 16,
    },
    syncStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    syncIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    syncText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#EF4444',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: HWSize.W_Width20,
        marginTop: 30,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: HWSize.W_Width20,
        justifyContent: 'space-between',
    },
    featureCard: {
        backgroundColor: Colors.white,
        width: '48%',
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
    },
    featureCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    notSyncedBadge: {
        fontSize: 16,
    },
    featureIconBg: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureIcon: {
        fontSize: 22,
    },
    featureLabel: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    featureValue: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
    },
    localCacheBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    localCacheIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    localCacheText: {
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
        color: '#F97316',
        letterSpacing: 0.5,
    },
    resourceList: {
        marginHorizontal: HWSize.W_Width20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        overflow: 'hidden',
        elevation: 2,
    },
    resourceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    resourceLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    resourceIconBg: {
        width: 44,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    resourceIcon: {
        fontSize: 22,
    },
    resourceTitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
    },
    resourceDetails: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 2,
    },
    resourceActionIcon: {
        fontSize: 22,
    },
    alertCard: {
        backgroundColor: '#FFF1F2',
        marginHorizontal: HWSize.W_Width20,
        marginTop: 24,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    alertIcon: {
        fontSize: 26,
        marginRight: 14,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#991B1B',
        marginBottom: 4,
    },
    alertText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#B91C1C',
        lineHeight: 20,
    },
})
