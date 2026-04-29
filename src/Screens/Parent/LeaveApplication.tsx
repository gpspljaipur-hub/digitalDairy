import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import HWSize from '../../comman/HWSize';
import DatePicker from '../../comman/DatePicker';
import ScreenWrapper from '../../comman/ScreenWrapper';

const LeaveApplication = () => {
    const navigation = useNavigation<any>();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const previousRequests = [
        {
            id: '1',
            title: 'Family Wedding',
            date: 'Oct 12 - Oct 14, 2023',
            status: 'Approved',
        },
    ];

    return (
        <ScreenWrapper scroll={false}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title="Leave Application"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Request Absence</Text>
                    <Text style={styles.sectionSubtitle}>
                        Please provide the details for your leave request. This will be reviewed by the school administration.
                    </Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Start Date</Text>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowStartPicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                            <Text style={styles.calendarIcon}>📅</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>End Date</Text>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowEndPicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                            <Text style={styles.calendarIcon}>📅</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Reason for Leave</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Type your reason here..."
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
                            <Text style={styles.attachTitle}>Attach Supporting Document</Text>
                            <Text style={styles.attachSubtitle}>Medical certificates, invitation letters, etc.</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton}
                        onPress={() => navigation.navigate('LeaveSubmit')}>
                        <Text style={styles.submitButtonText}>Submit Application</Text>
                        <Text style={styles.submitIcon}>➤</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.previousSection}>
                    <Text style={styles.sectionTitle}>Previous Requests</Text>
                    {previousRequests.map((request) => (
                        <TouchableOpacity key={request.id} style={styles.requestCard}>
                            <View style={styles.requestInfo}>
                                <View style={styles.statusIconContainer}>
                                    <Text style={styles.statusIcon}>✓</Text>
                                </View>
                                <View>
                                    <Text style={styles.requestTitle}>{request.title}</Text>
                                    <Text style={styles.requestDate}>{request.date}</Text>
                                </View>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    ))}
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
});

export default LeaveApplication;
