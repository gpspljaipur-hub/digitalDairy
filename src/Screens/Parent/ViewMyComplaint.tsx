import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Get_Send_Api } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const ViewMyComplaint = () => {
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const [complaintList, setComplaintList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await Get_Send_Api(ApiUrl.ComplaintList, {});
            if (res && !res.error) {
                setComplaintList(res.data || res || []);
            }
        } catch (error) {
            console.error('Fetch Complaints Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { color: '#FBC02D', bg: '#FFFDE7' };
            case 'resolved':
                return { color: '#4CAF50', bg: '#E8F5E9' };
            case 'in progress':
                return { color: '#2196F3', bg: '#E3F2FD' };
            default:
                return { color: '#666666', bg: '#EEEEEE' };
        }
    };

    const stats = {
        total: complaintList.length,
        resolved: complaintList.filter(c => c.status?.toLowerCase() === 'resolved' || c.status?.toLowerCase() === 'approved').length,
        inProgress: complaintList.filter(c => ['pending', 'received', 'in progress', 'processing'].includes(c.status?.toLowerCase())).length
    };



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
                        <Text style={styles.totalValue}>{stats.total}</Text>
                    </View>

                    <View style={styles.statusRow}>
                        <View style={styles.statusCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                                <Text style={[styles.innerIcon, { color: '#10B981' }]}>✓</Text>
                            </View>
                            <Text style={styles.statusValue}>{stats.resolved}</Text>
                            <Text style={styles.statusLabel}>Resolved</Text>
                        </View>

                        <View style={styles.statusCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                                <Text style={[styles.innerIcon, { color: '#3B82F6' }]}>⋯</Text>
                            </View>
                            <Text style={styles.statusValue}>{stats.inProgress}</Text>
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

                {complaintList.map((item) => {
                    const statusStyles = getStatusStyles(item.status);
                    return (
                        <TouchableOpacity key={item._id} style={styles.complaintCard}>
                            <View style={styles.complaintIconBox}>
                                <Text style={styles.complaintIcon}>📋</Text>
                            </View>
                            <View style={styles.complaintInfo}>
                                <View style={styles.complaintHeaderRow}>
                                    <Text style={styles.complaintTitle} numberOfLines={1}>{item.message}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: statusStyles.bg }]}>
                                        <Text style={[styles.statusText, { color: statusStyles.color }]}>
                                            {item.status || 'Pending'}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.complaintMeta}>
                                    {item.categoryName || 'Other'} • {moment(item.createdAt).format('MMM DD, YYYY')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {complaintList.length === 0 && (
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{ fontFamily: Fonts.Lexend_Medium, color: Colors.lightGreyText }}>
                            No complaints found.
                        </Text>
                    </View>
                )}
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
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    complaintIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    complaintIcon: {
        fontSize: 24,
    },
    complaintInfo: {
        flex: 1,
    },
    complaintHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    complaintTitle: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#1E3A8A',
        flex: 1,
        marginRight: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
        textTransform: 'capitalize',
    },
    complaintMeta: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
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