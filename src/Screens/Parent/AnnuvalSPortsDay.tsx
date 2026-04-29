import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import HWSize from '../../comman/HWSize';
import { useNavigation } from '@react-navigation/native';
import ParentBottom from '../../Component/ParentBottom';

const AnnuvalSPortsDay = () => {
    const navigation = useNavigation<any>();

    return (
        <ScreenWrapper scroll={false} style={styles.container}>
            <Header
                title="Event Details"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Top Image Section */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/WelcomeSchool.png')}
                        style={styles.topImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Event Card */}
                <View style={styles.eventCard}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Upcoming Event</Text>
                    </View>

                    <Text style={styles.eventTitle}>Annual Sports Day 2023</Text>

                    {/* Info Rows */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Text style={styles.icon}>📅</Text>
                        </View>
                        <View>
                            <Text style={styles.infoText}>December 05, 2023</Text>
                            <Text style={styles.subInfoText}>08:00 AM - 02:00 PM</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Text style={styles.icon}>📍</Text>
                        </View>
                        <View>
                            <Text style={styles.infoText}>Main School Playground</Text>
                            <Text style={styles.subInfoText}>Outdoor Field Area</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>About the Event</Text>
                    <Text style={styles.description}>
                        Join us for a day of athletic excellence and school spirit! Students from all grades will compete in various track and field events. Please ensure students arrive in their physical education uniforms.
                    </Text>

                    <TouchableOpacity
                        style={styles.backCalendarBtn}
                    // onPress={() => navigation.navigate("AcademicCalendar")}
                    >
                        <Text style={styles.backBtnText}>← Back to Calendar</Text>
                    </TouchableOpacity>
                </View>

                {/* Event Documents */}
                <View style={styles.docsSection}>
                    <View style={styles.docsHeader}>
                        <Text style={styles.docsHeaderText}>Event Documents</Text>
                    </View>

                    <View style={styles.docItem}>
                        <View style={styles.docInfo}>
                            <Text style={styles.docIcon}>📄</Text>
                            <Text style={styles.docName}>Sports Schedule.pdf</Text>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Text style={styles.downloadIcon}>⬇️</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.docItem, { borderBottomWidth: 0 }]}>
                        <View style={styles.docInfo}>
                            <Text style={styles.docIcon}>📄</Text>
                            <Text style={styles.docName}>Uniform Guidelines.pdf</Text>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Text style={styles.downloadIcon}>⬇️</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Extra space for bottom nav if needed */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <ParentBottom activeTab="NOTICE" />
        </ScreenWrapper>
    );
};

export default AnnuvalSPortsDay;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F9FF',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: 220,
        overflow: 'hidden',
    },
    topImage: {
        width: '100%',
        height: '100%',
    },
    eventCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        marginTop: -30,
        marginHorizontal: 15,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    badge: {
        backgroundColor: '#E3F2FD',
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 15,
    },
    badgeText: {
        color: '#1E88E5',
        fontFamily: Fonts.LexendBold,
        fontSize: 12,
    },
    eventTitle: {
        fontSize: 26,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F7FF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 18,
    },
    infoText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    subInfoText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        lineHeight: 22,
        marginBottom: 25,
    },
    backCalendarBtn: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        elevation: 3,
    },
    backBtnText: {
        color: Colors.white,
        fontFamily: Fonts.LexendBold,
        fontSize: 16,
    },
    docsSection: {
        marginTop: 25,
        marginHorizontal: 15,
        backgroundColor: Colors.white,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E3F2FD',
    },
    docsHeader: {
        backgroundColor: '#F3F7FF',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E3F2FD',
    },
    docsHeaderText: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    docItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    docInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    docIcon: {
        fontSize: 22,
        marginRight: 15,
        color: Colors.textSecondary,
    },
    docName: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textMain,
    },
    downloadBtn: {
        padding: 5,
    },
    downloadIcon: {
        fontSize: 20,
        color: Colors.primary,
    },
});