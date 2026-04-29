import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const LeaveHistory = () => {
    const navigation = useNavigation<any>();

    const leaveData = [
        {
            id: '1',
            type: 'Sick Leave',
            dateRange: 'Oct 12 - Oct 14, 2023',
            status: 'Approved',
            description: 'Suffering from seasonal fever. Doctor advised bed rest for 3 days to ensure ful...',
            days: '3 Days',
            statusColor: '#4CAF50',
            statusBg: '#E8F5E9',
            actionText: 'View Details',
            icon: '✅'
        },
        {
            id: '2',
            type: 'Family Event',
            dateRange: 'Nov 05 - Nov 06, 2023',
            status: 'Pending',
            description: 'Attending elder sister\'s wedding ceremony in our home town. Need leave ...',
            days: '2 Days',
            statusColor: '#FF9800',
            statusBg: '#FFF3E0',
            actionText: 'Edit Draft',
            actionIcon: '📝',
            icon: '💬'
        },
        {
            id: '3',
            type: 'Personal Trip',
            dateRange: 'Oct 20, 2023',
            status: 'Rejected',
            description: 'Visiting local museum with family friends during school hours.',
            note: 'Note: Leave cannot be granted for leisure trips during examination week.',
            days: '1 Day',
            statusColor: '#F44336',
            statusBg: '#FFEBEE',
            actionText: 'Appeal',
            actionIcon: '📢',
            icon: '❌'
        },
    ];

    return (
        <ScreenWrapper scroll={false}>
            <Header
                title="Leave History"
                showBack={true}
                onBack={() => navigation.goBack()}
                rightIcon="⚗️"
                showNotification={false}
            />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Remaining Leaves Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statsHeader}>
                        <View>
                            <Text style={styles.statsLabel}>Remaining Leaves</Text>
                            <Text style={styles.statsMainValue}>08 Days</Text>
                        </View>
                        <View style={styles.calendarIconBox}>
                            <Text style={styles.calendarEmoji}>📅</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statsFooter}>
                        <View>
                            <Text style={styles.footerLabel}>TAKEN</Text>
                            <Text style={styles.footerValue}>04</Text>
                        </View>
                        <View>
                            <Text style={styles.footerLabel}>SCHEDULED</Text>
                            <Text style={styles.footerValue}>01</Text>
                        </View>
                    </View>
                </View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Applications</Text>
                    <Text style={styles.sectionSubtitle}>Oct-Dec 2023</Text>
                </View>

                {/* Leave Cards */}
                {leaveData.map((item) => (
                    <View key={item.id} style={styles.leaveCard}>
                        <View style={[styles.statusIndicator, { backgroundColor: item.statusColor }]} />
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.leaveType}>{item.type}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                                    <Text style={[styles.statusText, { color: item.statusColor }]}>
                                        {item.icon} {item.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.dateRow}>
                                <Text style={styles.dateIcon}>📅</Text>
                                <Text style={styles.dateText}>{item.dateRange}</Text>
                            </View>

                            <Text style={styles.description} numberOfLines={2}>
                                {item.description}
                            </Text>

                            {item.note && (
                                <View style={styles.noteBox}>
                                    <Text style={styles.noteText}>{item.note}</Text>
                                </View>
                            )}

                            <View style={styles.cardFooter}>
                                <Text style={[styles.daysCount, { color: item.statusColor }]}>{item.days}</Text>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Text style={styles.actionText}>{item.actionText}</Text>
                                    <Text style={styles.actionArrow}> {item.actionIcon || '›'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Extra space for floating button */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity
                    style={styles.applyBtn}
                    onPress={() => navigation.navigate('LeaveApplication')}
                >
                    <Text style={styles.applyBtnIcon}>+</Text>
                    <Text style={styles.applyBtnText}>Apply for New Leave</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.refreshBtn}>
                    <Text style={styles.refreshIcon}>🔄</Text>
                    <Text style={styles.refreshText}>Load Previous Records</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default LeaveHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    scrollContent: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: HWSize.H_Height20,
    },
    statsCard: {
        backgroundColor: '#0056B3', // Using a solid blue as no LinearGradient
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsLabel: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    statsMainValue: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginTop: 4,
    },
    calendarIconBox: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarEmoji: {
        fontSize: 22,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 20,
    },
    statsFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    footerLabel: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: 1,
    },
    footerValue: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginTop: 2,
        marginRight: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#303E67',
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#8E98B0',
    },
    leaveCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    statusIndicator: {
        width: 5,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    leaveType: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateIcon: {
        fontSize: 14,
        marginRight: 8,
    },
    dateText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#666',
    },
    description: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#444',
        lineHeight: 20,
        marginBottom: 10,
    },
    noteBox: {
        backgroundColor: '#FFF0F0',
        padding: 10,
        borderRadius: 4,
        marginBottom: 12,
    },
    noteText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#D32F2F',
        fontStyle: 'italic',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    daysCount: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#0056B3',
    },
    actionArrow: {
        fontSize: 16,
        color: '#0056B3',
        marginLeft: 4,
    },
    bottomActions: {
        position: 'absolute',
        bottom: 20,
        left: HWSize.W_Width20,
        right: HWSize.W_Width20,
        flexDirection: 'column',
        gap: 12,
    },
    applyBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    applyBtnIcon: {
        fontSize: 24,
        color: Colors.white,
        marginRight: 10,
        fontWeight: 'bold',
    },
    applyBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    refreshBtn: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    refreshIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    refreshText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#64748B',
    },
})