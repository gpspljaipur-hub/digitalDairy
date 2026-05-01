import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const LeaveHistory = () => {
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const [leaveList, setLeaveList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLeaveHistory();
    }, []);

    const fetchLeaveHistory = async () => {
        setLoading(true);
        const studentId = parent?.data?.studentId || parent?.studentId;
        try {
            const res = await Auth_ApiRequest(ApiUrl.LeaveList, { studentId });
            if (res && !res.error) {
                setLeaveList(res.data || res || []);
            }
        } catch (error) {
            console.error('Fetch Leave History Error:', error);
        } finally {
            setLoading(false);
        }
    };
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
                    <Text style={styles.sectionSubtitle}>jan-may 2026</Text>
                </View>

                {leaveList.map((item) => (
                    <TouchableOpacity key={item._id} style={styles.requestCard}>
                        <View style={styles.requestInfo}>
                            <View style={[
                                styles.statusIconContainer,
                                { backgroundColor: item.status?.toLowerCase() === 'approved' ? '#E8F5E9' : item.status?.toLowerCase() === 'rejected' ? '#FFEBEE' : '#FFF3E0' }
                            ]}>
                                <Text style={[
                                    styles.statusIcon,
                                    { color: item.status?.toLowerCase() === 'approved' ? '#4CAF50' : item.status?.toLowerCase() === 'rejected' ? '#F44336' : '#FF9800' }
                                ]}>
                                    {item.status?.toLowerCase() === 'approved' ? '✓' : item.status?.toLowerCase() === 'rejected' ? '✕' : '⏳'}
                                </Text>
                            </View>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={styles.requestTitle}>{item.message || 'Leave Request'}</Text>
                                <Text style={styles.requestDate}>
                                    {moment(item.startDate).format('MMM DD')} - {moment(item.endDate).format('MMM DD, YYYY')}
                                </Text>
                                {item.remark && (
                                    <View style={styles.noteBox}>
                                        <Text style={styles.noteText}>Remark: {item.remark}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginLeft: 8 }}>
                            <Text style={[
                                styles.statusTextLabel,
                                { color: item.status?.toLowerCase() === 'approved' ? '#4CAF50' : item.status?.toLowerCase() === 'rejected' ? '#F44336' : '#FF9800' }
                            ]}>
                                {item.status}
                            </Text>
                            <Text style={styles.chevron}>›</Text>
                        </View>
                    </TouchableOpacity>
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
                <TouchableOpacity style={styles.refreshBtn} onPress={fetchLeaveHistory}>
                    <Text style={styles.refreshIcon}>🔄</Text>
                    <Text style={styles.refreshText}>{loading ? 'Refreshing...' : 'Load Previous Records'}</Text>
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
    requestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    requestInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    statusIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0FDF4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#DCFCE7',
    },
    statusIcon: {
        fontSize: 18,
        color: '#16A34A',
        fontWeight: 'bold',
    },
    requestTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    requestDate: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#666',
        marginTop: 2,
    },
    statusTextLabel: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    chevron: {
        fontSize: 24,
        color: '#CBD5E1',
    },
    noteBox: {
        backgroundColor: '#FFF0F0',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    noteText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#D32F2F',
        fontStyle: 'italic',
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