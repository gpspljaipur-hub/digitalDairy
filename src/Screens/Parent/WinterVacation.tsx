import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import ParentBottom from '../../Component/ParentBottom';
import useStrings from '../../comman/useStrings';

const WinterVacation = () => {
    const strings = useStrings();
    const navigation = useNavigation<any>();

    return (
        <ScreenWrapper scroll={false} style={styles.container}>
            <Header
                title={strings.eventDetails}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/WelcomeSchool.png')}
                        style={styles.topImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <Text style={styles.mainTitle}>Winter Vacation</Text>

                    <View style={styles.dateRow}>
                        <Text style={styles.calendarIcon}>📅</Text>
                        <Text style={styles.dateRange}>December 24, 2023 - January 05, 2024</Text>
                    </View>

                    {/* Announcement Card */}
                    <View style={styles.announcementCard}>
                        <Text style={styles.cardTitle}>{strings.announcement}</Text>
                        <Text style={styles.cardText}>
                            The school will remain closed for winter break. We wish all our students and their families a joyful and safe holiday season. Classes will resume on January 08, 2024.
                        </Text>
                    </View>

                    {/* Office Notice Card */}
                    <View style={styles.noticeCard}>
                        <View style={styles.noticeHeader}>
                            <View style={styles.infoIconBox}>
                                <Text style={styles.infoIcon}>ℹ️</Text>
                            </View>
                            <Text style={styles.noticeTitle}>{strings.officeNotice}</Text>
                        </View>
                        <Text style={styles.noticeText}>
                            Office will be open for administrative queries from 10:00 AM to 01:00 PM on weekdays.
                        </Text>
                    </View>

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backBtnText}>← {strings.backToCalendar}</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* Document Card */}
                    <View style={styles.docCard}>
                        <View style={styles.docInfo}>
                            <View style={styles.pdfIconBox}>
                                <Text style={styles.pdfIcon}>📄</Text>
                            </View>
                            <View>
                                <Text style={styles.docName}>Holiday Homework.pdf</Text>
                                <Text style={styles.docSize}>2.4 MB</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Text style={styles.downloadIcon}>⬇️</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Space */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <ParentBottom activeTab="NOTICE" />
        </ScreenWrapper>
    );
};

export default WinterVacation;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        width: '90%',
        height: 220,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    topImage: {
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    mainTitle: {
        fontSize: 32,
        fontFamily: Fonts.LexendBold,
        color: '#1A3B8B',
        marginBottom: 10,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    calendarIcon: {
        fontSize: 18,
        marginRight: 10,
        color: '#475569',
    },
    dateRange: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#475569',
    },
    announcementCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 12,
    },
    cardText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    noticeCard: {
        backgroundColor: '#EEF4FF',
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#D0E1FF',
        marginBottom: 25,
    },
    noticeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoIconBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#DBEAFE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoIcon: {
        fontSize: 16,
        color: '#2563EB',
    },
    noticeTitle: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
    },
    noticeText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
        lineHeight: 22,
    },
    backBtn: {
        backgroundColor: '#0056B3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 25,
    },
    backBtnText: {
        color: Colors.white,
        fontFamily: Fonts.LexendBold,
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#CBD5E1',
        marginBottom: 25,
    },
    docCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    docInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pdfIconBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    pdfIcon: {
        fontSize: 24,
    },
    docName: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    docSize: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    downloadBtn: {
        padding: 10,
    },
    downloadIcon: {
        fontSize: 22,
        color: '#2563EB',
    },
});
