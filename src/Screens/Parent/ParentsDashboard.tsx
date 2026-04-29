import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import ParentBottom from '../../Component/ParentBottom'

const ParentDashboard = () => {
    const navigation = useNavigation<any>();

    const gridItems = [
        { title: 'Attendance', icon: '📅', color: '#E3F2FD', iconColor: '#2196F3' },
        { title: 'Homework', icon: '📖', color: '#FFF3E0', iconColor: '#FF9800' },
        { title: 'Notices', icon: '📢', color: '#F3E5F5', iconColor: '#9C27B0' },
        { title: 'Leave', icon: '📅', color: '#FFEBEE', iconColor: '#F44336' },
        { title: 'Result', icon: '⭐', color: '#E8F5E9', iconColor: '#4CAF50' },
        { title: 'Complaint', icon: '⚠️', color: '#FFFDE7', iconColor: '#FBC02D' },
    ]

    return (
        <ScreenWrapper scroll={false}>
            <Header title="School Link" showProfile={true} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Hello, Mrs. Sharma</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Your son, <Text style={styles.boldText}>Aarav (Grade 8-B)</Text> is currently in school.
                    </Text>
                </View>

                {/* Progress Report Card */}
                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Progress Report</Text>
                        <View style={styles.termBadge}>
                            <Text style={styles.termText}>Term 1</Text>
                        </View>
                    </View>

                    <View style={styles.progressMain}>
                        <Text style={styles.percentageText}>88%</Text>
                        <Text style={styles.averageLabel}>Overall Average</Text>
                    </View>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '88%' }]} />
                    </View>

                    <Text style={styles.statText}>📈 Up 4% since last month</Text>
                </View>

                {/* Dashboard Grid */}
                <Text style={styles.sectionTitle}>Dashboard</Text>
                <View style={styles.gridContainer}>
                    {gridItems.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.gridItem}
                            onPress={() => {
                                if (item.title === 'Attendance') {
                                    navigation.navigate('StudentAttandance')
                                } else if (item.title === 'Homework') {
                                    navigation.navigate('Homework_Screen')
                                } else if (item.title === 'Notices') {
                                    navigation.navigate('NoticeScreen')
                                }
                            }}
                        >
                            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                                <Text style={[styles.iconText, { color: item.iconColor }]}>{item.icon}</Text>
                            </View>
                            <Text style={styles.gridItemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Academic Calendar */}
                <TouchableOpacity style={styles.calendarButton}>
                    <View style={styles.calendarIconBox}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </View>
                    <Text style={styles.calendarText}>Academic Calendar</Text>
                </TouchableOpacity>

                {/* Announcements */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Announcements</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.announcementCard}>
                    <View style={[styles.announcementIconBox, { backgroundColor: '#E8EAF6' }]}>
                        <Text style={styles.announcementIcon}>🎓</Text>
                    </View>
                    <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle}>School Picnic 2024</Text>
                        <Text style={styles.announcementDesc} numberOfLines={1}>Details regarding the upcoming picnic...</Text>
                        <Text style={styles.announcementTime}>2 Hours Ago</Text>
                    </View>
                </View>

                <View style={styles.announcementCard}>
                    <View style={[styles.announcementIconBox, { backgroundColor: '#FFEBEE' }]}>
                        <Text style={styles.announcementIcon}>⚠️</Text>
                    </View>
                    <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle}>Monsoon Holiday Notice</Text>
                        <Text style={styles.announcementDesc} numberOfLines={1}>School will remain closed...</Text>
                        <Text style={styles.announcementTime}>Yesterday</Text>
                    </View>
                </View>

                {/* Recent Chats */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Chats</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>Open Inbox</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.chatCard}>
                    <View style={styles.chatInfo}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarEmoji}>👩‍🏫</Text>
                            <View style={styles.onlineDot} />
                        </View>
                        <View style={styles.chatTextContent}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.chatName}>Ms. Priya Roy</Text>
                                <Text style={styles.chatTime}>10:45 AM</Text>
                            </View>
                            <Text style={styles.chatLastMessage} numberOfLines={1}>Aarav performed very well in...</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.chatCard}>
                    <View style={styles.chatInfo}>
                        <View style={[styles.avatarPlaceholder, { backgroundColor: '#E8EAF6' }]}>
                            <Text style={styles.avatarEmoji}>👥</Text>
                        </View>
                        <View style={styles.chatTextContent}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.chatName}>Grade 8 Parent Group</Text>
                                <Text style={styles.chatTime}>Yesterday</Text>
                            </View>
                            <Text style={styles.chatLastMessage} numberOfLines={1}>Meera: Does anyone have the...</Text>
                        </View>
                    </View>
                </View>

                {/* Space for absolute bottom nav */}
                <View style={{ height: 100 }} />
            </ScrollView>
            <ParentBottom activeTab="HOME" />
        </ScreenWrapper>
    )
}

export default ParentDashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    scrollContent: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: HWSize.H_Height20,
    },
    welcomeSection: {
        marginBottom: HWSize.H_Height20,
    },
    welcomeTitle: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    welcomeSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    boldText: {
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    progressCard: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        padding: HWSize.W_Width20,
        marginBottom: HWSize.H_Height20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    termBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    termText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    progressMain: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 15,
    },
    percentageText: {
        fontSize: 36,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    averageLabel: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 8,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 4,
        marginTop: 15,
        marginBottom: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.white,
        borderRadius: 4,
    },
    statText: {
        fontSize: 12,
        color: Colors.white,
        fontFamily: Fonts.Lexend_Medium,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 15,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconText: {
        fontSize: 24,
    },
    gridItemTitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    calendarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    calendarIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#E8EAF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    calendarIcon: {
        fontSize: 20,
    },
    calendarText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    viewAllText: {
        fontSize: 13,
        color: Colors.primary,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    announcementCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    announcementIconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    announcementIcon: {
        fontSize: 24,
    },
    announcementContent: {
        flex: 1,
    },
    announcementTitle: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    announcementDesc: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    announcementTime: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.lightGreyText,
        marginTop: 4,
    },
    chatCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    chatInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarEmoji: {
        fontSize: 22,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    chatTextContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatName: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    chatTime: {
        fontSize: 11,
        color: Colors.lightGreyText,
        fontFamily: Fonts.Lexend_Medium,
    },
    chatLastMessage: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginTop: 2,
    },
})

