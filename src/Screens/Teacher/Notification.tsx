import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native'
import React from 'react'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import Header from '../../comman/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Reducers/Userslice'
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper'
import Config from '../../Lib/ApiService/Config'
const NOTIFICATIONS = [
    {
        id: '1',
        type: 'attendance',
        title: 'Attendance Marked',
        description: 'Aravind has been marked Present for today.',
        time: '10:30 AM',
        unread: true,
    },
    {
        id: '2',
        type: 'homework',
        title: 'New Homework: Mathematics',
        description: 'Complete Exercise 4.2 by tomorrow.',
        time: '09:45 AM',
        unread: true,
    },
    {
        id: '3',
        type: 'announcement',
        title: 'Annual Sports Day Postponed',
        description: 'Due to rain, the sports day is moved to Friday.',
        time: 'Yesterday',
        unread: false,
    },
    {
        id: '4',
        type: 'exam',
        title: 'Exam Results Released',
        description: 'Quarterly exam results for Grade 10-B are now available.',
        time: '2 days ago',
        unread: false,
    }
];

const NotificationCard = ({ item }: { item: any }) => {
    const getIcon = () => {
        switch (item.type) {
            case 'attendance': return { emoji: '✔️', bgColor: '#E8F5E9', iconColor: '#4CAF50' };
            case 'homework': return { emoji: '📋', bgColor: '#E3F2FD', iconColor: '#2196F3' };
            case 'announcement': return { emoji: '📢', bgColor: '#FFF3E0', iconColor: '#FF9800' };
            case 'exam': return { emoji: '📊', bgColor: '#F3E5F5', iconColor: '#9C27B0' };
            default: return { emoji: '🔔', bgColor: '#F5F5F5', iconColor: '#757575' };
        }
    };

    const iconData = getIcon();

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: iconData.bgColor }]}>
                <Text style={[styles.iconEmoji, { color: iconData.iconColor }]}>{iconData.emoji}</Text>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{item.time}</Text>
                        {item.unread && <View style={styles.unreadDot} />}
                    </View>
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Notification = ({ navigation }: any) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await AsyncStorageHelper.removeItemValue(Config.USER_DATA);
        await AsyncStorageHelper.removeItemValue(Config.TOKEN);
        await AsyncStorageHelper.removeItemValue(Config.ROLE);
        dispatch(logout());
        navigation.replace('Welcomeback');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <TouchableOpacity style={styles.moreBtn}>
                    <Text style={styles.moreIcon}>⋮</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Updates</Text>
                    <TouchableOpacity>
                        <Text style={styles.markAllRead}>Mark all read</Text>
                    </TouchableOpacity>
                </View>

                {NOTIFICATIONS.slice(0, 2).map(item => (
                    <NotificationCard key={item.id} item={item} />
                ))}

                <Text style={styles.earlierTitle}>EARLIER</Text>

                {NOTIFICATIONS.slice(2, 4).map(item => (
                    <NotificationCard key={item.id} item={item} />
                ))}

                <TouchableOpacity style={styles.bannerContainer} activeOpacity={0.9}>
                    <View style={styles.bannerBackground}>
                        <View style={styles.bannerOverlay}>
                            <View style={styles.tagContainer}>
                                <Text style={styles.tagText}>SCHOOL NEWS</Text>
                            </View>
                            <Text style={styles.bannerTitle}>Admission 2024-25</Text>
                            <Text style={styles.bannerSubtitle}>Sibling priority applications are now open until next month.</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: 1,
        backgroundColor: Colors.white,
        // borderBottomWidth: 1,
        // borderBottomColor: '#F0F0F0',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        paddingRight: 15,
    },
    backIcon: {
        fontSize: 26,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    moreBtn: {
        padding: 5,
    },
    moreIcon: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: Colors.nearBlack,
    },
    markAllRead: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.primary,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 3,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconEmoji: {
        fontSize: 22,
    },
    cardContent: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        flex: 1,
        paddingRight: 8,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#94A3B8',
        marginRight: 8,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3B82F6',
    },
    cardDescription: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        lineHeight: 20,
    },
    earlierTitle: {
        fontSize: 13,
        fontFamily: Fonts.LexendBold,
        color: '#94A3B8',
        marginTop: 12,
        marginBottom: 16,
        letterSpacing: 1.2,
    },
    bannerContainer: {
        marginTop: 8,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#0052CC',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    bannerBackground: {
        backgroundColor: '#0052CC',
        height: 160,
    },
    bannerOverlay: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    tagContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 14,
    },
    tagText: {
        color: Colors.white,
        fontSize: 10,
        fontFamily: Fonts.LexendBold,
        letterSpacing: 0.8,
    },
    bannerTitle: {
        color: Colors.white,
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        marginBottom: 6,
    },
    bannerSubtitle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        lineHeight: 20,
    },
    logoutBtn: {
        backgroundColor: '#FEE2E2',
        marginVertical: 30,
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    logoutText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#DC2626',
    },
})

