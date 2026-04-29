import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const ViewMyComplaint = () => {
    const navigation = useNavigation<any>();

    const complaints = [
        {
            id: '1',
            category: 'Infrastructure',
            title: 'Broken window in Room 302',
            date: 'Oct 24, 2023',
            description: 'The glass on the east side window is shattered and posing a safety risk to...',
            status: 'Resolved',
            statusColor: '#10B981',
            type: 'Infrastructure'
        },
        {
            id: '2',
            category: 'Academic',
            title: 'Delay in Grade Publication',
            date: 'Nov 02, 2023',
            description: 'The mid-term results for Chemistry 101 have not been uploaded even after thre...',
            status: 'In Progress',
            statusColor: '#3B82F6',
            type: 'Academic'
        },
        {
            id: '3',
            category: 'Staff',
            title: 'Library Staff Unavailability',
            date: 'Nov 15, 2023',
            description: 'There was no one at the front desk during official morning hours today from 9 AM...',
            status: 'Received',
            statusColor: '#6B7280',
            type: 'Staff'
        }
    ];

    return (
        <ScreenWrapper scroll={true} style={styles.mainContainer}>
            <Header
                title="Complaints History"
                showBack={true}
                onBack={() => navigation.goBack()} showProfile={false}
                showNotification={false}
            />

            <View style={styles.container}>
                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.totalCard}>
                        <View style={styles.totalHeader}>
                            <Text style={styles.totalLabel}>TOTAL COMPLAINTS</Text>
                            <Text style={styles.folderIcon}>📂</Text>
                        </View>
                        <Text style={styles.totalValue}>24</Text>
                    </View>

                    <View style={styles.statusRow}>
                        <View style={styles.statusCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                                <Text style={[styles.innerIcon, { color: '#10B981' }]}>✓</Text>
                            </View>
                            <Text style={styles.statusValue}>18</Text>
                            <Text style={styles.statusLabel}>Resolved</Text>
                        </View>

                        <View style={styles.statusCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                                <Text style={[styles.innerIcon, { color: '#3B82F6' }]}>⋯</Text>
                            </View>
                            <Text style={styles.statusValue}>06</Text>
                            <Text style={styles.statusLabel}>In Progress</Text>
                        </View>
                    </View>
                </View>

                {/* Recent Submissions */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Submissions</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Filter</Text>
                        <Text style={styles.filterIcon}>≡</Text>
                    </TouchableOpacity>
                </View>

                {complaints.map((item) => (
                    <View key={item.id} style={styles.complaintCard}>
                        <View style={styles.cardTopRow}>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{item.category}</Text>
                            </View>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </View>

                        <Text style={styles.complaintTitle}>{item.title}</Text>
                        <Text style={styles.complaintDesc} numberOfLines={2}>
                            {item.description}
                        </Text>

                        <View style={styles.divider} />

                        <View style={styles.cardBottomRow}>
                            <View style={styles.statusIndicator}>
                                <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                            <TouchableOpacity style={styles.viewDetailsBtn}>
                                <Text style={styles.viewDetailsText}>View Details</Text>
                                <Text style={styles.chevron}>›</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Complaint')}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default ViewMyComplaint

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F8F9FE',
    },
    container: {
        paddingHorizontal: HWSize.W_Width20,
        paddingBottom: 100,
    },
    statsContainer: {
        marginTop: 20,
        marginBottom: 25,
    },
    totalCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    totalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    totalLabel: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: Colors.lightGreyText,
        letterSpacing: 0.5,
    },
    folderIcon: {
        fontSize: 24,
        color: '#CBD5E1',
    },
    totalValue: {
        fontSize: 32,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        width: '48%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    innerIcon: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusValue: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
        marginBottom: 4,
    },
    statusLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
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
        color: Colors.textMain,
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E3A8A',
        marginRight: 6,
    },
    filterIcon: {
        fontSize: 18,
        color: '#1E3A8A',
    },
    complaintCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    categoryText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    dateText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.lightGreyText,
    },
    complaintTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
        marginBottom: 8,
    },
    complaintDesc: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 15,
    },
    cardBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    viewDetailsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewDetailsText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E3A8A',
        marginRight: 4,
    },
    chevron: {
        fontSize: 18,
        color: '#1E3A8A',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabIcon: {
        fontSize: 30,
        color: Colors.white,
        lineHeight: 32,
    },
})