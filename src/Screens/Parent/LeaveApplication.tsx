import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import Helper from '../../Lib/HelperFiles/Helper'
import moment from 'moment';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import HWSize from '../../comman/HWSize';
import DatePicker from '../../comman/DatePicker';
import ScreenWrapper from '../../comman/ScreenWrapper';
import useStrings from '../../comman/useStrings';

const LeaveApplication = () => {
    const strings = useStrings();
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [leaveList, setLeaveList] = useState<any[]>([]);

    useEffect(() => {
        fetchLeaveHistory();
    }, []);

    const fetchLeaveHistory = async () => {
        const studentId = parent?.data?.studentId || parent?.studentId;
        try {
            const res = await Auth_ApiRequest(ApiUrl.LeaveList, { studentId });
            console.log('Leave List Response:', res);
            if (res && !res.error) {
                setLeaveList(res.data || res || []);
            }
        } catch (error) {
            console.error('Fetch Leave History Error:', error);
        }
    };

    const handleApplyLeave = async () => {
        if (!reason.trim()) {
            Helper.showToast('Please enter a reason for leave');
            return;
        }

        setLoading(true);
        const studentId = parent?.data?.studentId || parent?.studentId;

        const payload = {
            studentId: studentId,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD'),
            message: reason
        };

        try {
            const res = await Auth_ApiRequest(ApiUrl.LeaveApply, payload);
            console.log('Leave Apply Response:', res);
            if (res && !res.error) {
                Helper.showToast('Leave applied successfully');
                setReason('');
                fetchLeaveHistory(); // Refresh the list
            } else {
                Helper.showToast(res?.message || 'Failed to apply leave');
            }
        } catch (error) {
            console.error('Apply Leave Error:', error);
            Helper.showToast('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };



    return (
        <ScreenWrapper scroll={false}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title={strings.leaveApplication}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{strings.requestAbsence}</Text>
                    <Text style={styles.sectionSubtitle}>
                        {strings.leaveRequestSubtitle}
                    </Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{strings.startDateLabel}</Text>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowStartPicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                            <Text style={styles.calendarIcon}>📅</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{strings.endDateLabel}</Text>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowEndPicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                            <Text style={styles.calendarIcon}>📅</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{strings.reasonForLeave}</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder={strings.typeReasonPlaceholder}
                            placeholderTextColor={Colors.lightGreyText}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={reason}
                            onChangeText={setReason}
                        />
                    </View>

                    <TouchableOpacity style={styles.attachSection}>
                        <View style={styles.attachIconContainer}>
                            <Text style={styles.attachIcon}>📄</Text>
                        </View>
                        <View style={styles.attachTextContainer}>
                            <Text style={styles.attachTitle}>{strings.attachSupportingDoc}</Text>
                            <Text style={styles.attachSubtitle}>{strings.attachDocSubtitle}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.submitButton, loading && { opacity: 0.7 }]}
                        onPress={handleApplyLeave}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <>
                                <Text style={styles.submitButtonText}>{strings.submitApplication}</Text>
                                <Text style={styles.submitIcon}>➤</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.previousSection}>
                    <Text style={styles.sectionTitle}>Previous Requests</Text>
                    {leaveList.length > 0 ? leaveList.map((request) => (
                        <TouchableOpacity
                            key={request._id}
                            style={styles.requestCard}
                            onPress={() => navigation.navigate('LeaveHistory', { leaveData: request })}
                        >
                            <View style={styles.requestInfo}>
                                <View style={[
                                    styles.statusIconContainer,
                                    { backgroundColor: request.status?.toLowerCase() === 'approved' ? '#E8F5E9' : request.status?.toLowerCase() === 'rejected' ? '#FFEBEE' : '#FFF3E0' }
                                ]}>
                                    <Text style={[
                                        styles.statusIcon,
                                        { color: request.status?.toLowerCase() === 'approved' ? '#4CAF50' : request.status?.toLowerCase() === 'rejected' ? '#F44336' : '#FF9800' }
                                    ]}>
                                        {request.status?.toLowerCase() === 'approved' ? '✓' : request.status?.toLowerCase() === 'rejected' ? '✕' : '⏳'}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.requestTitle}>{request.message || 'Leave Request'}</Text>
                                    <Text style={styles.requestDate}>
                                        {moment(request.startDate).format('MMM DD')} - {moment(request.endDate).format('MMM DD, YYYY')}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={[
                                    styles.statusText,
                                    { color: request.status?.toLowerCase() === 'approved' ? '#4CAF50' : request.status?.toLowerCase() === 'rejected' ? '#F44336' : '#FF9800' }
                                ]}>
                                    {request.status}
                                </Text>
                                <Text style={styles.chevron}>›</Text>
                            </View>
                        </TouchableOpacity>
                    )) : (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontFamily: Fonts.Lexend_Medium, color: '#94A3B8' }}>No previous requests found</Text>
                        </View>
                    )}
                    {leaveList.length === 0 && (
                        <Text style={styles.noRequestText}>No previous leave requests found.</Text>
                    )}
                </View>

                {/* Extra space at bottom */}
                <View style={{ height: 20 }} />
            </ScrollView>

            <DatePicker
                visible={showStartPicker}
                selectedDate={startDate}
                onSelect={(date) => {
                    setStartDate(date);
                    setShowStartPicker(false);
                }}
                onClose={() => setShowStartPicker(false)}
            />

            <DatePicker
                visible={showEndPicker}
                selectedDate={endDate}
                onSelect={(date) => {
                    setEndDate(date);
                    setShowEndPicker(false);
                }}
                onClose={() => setShowEndPicker(false)}
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: HWSize.W_Width20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 24,
    },
    statusText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
        marginBottom: 8,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    dateText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textMain,
    },
    calendarIcon: {
        fontSize: 18,
    },
    textArea: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textMain,
        minHeight: 120,
    },
    attachSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#BFDBFE',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    attachIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#DBEAFE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    attachIcon: {
        fontSize: 20,
    },
    attachTextContainer: {
        flex: 1,
    },
    attachTitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E40AF',
    },
    attachSubtitle: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#60A5FA',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        elevation: 2,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    submitButtonText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginRight: 10,
    },
    submitIcon: {
        fontSize: 18,
        color: Colors.white,
    },
    previousSection: {
        marginTop: 10,
    },
    requestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    requestInfo: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    requestDate: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: Colors.border,
    },
    noRequestText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default LeaveApplication;
