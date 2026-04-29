import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import HWSize from '../../comman/HWSize';
import ParentBottom from '../../Component/ParentBottom';

const NoticeScreen = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');

    const notices = [
        {
            id: '1',
            type: 'URGENT',
            title: 'Winter Vacation Announcement',
            description: 'The school will remain closed for winter break from Dec 24 to Jan 05. Classes will resume on Jan 08, 2024.',
            date: 'Dec 20, 2023',
            isUrgent: true,
            screen: 'WinterVacation',

        },
        {
            id: '2',
            type: 'EVENT',
            title: 'Annual Sports Day 2023',
            description: 'Join us for a day of athletic excellence and school spirit! Students from all grades will compete in various track and field events.',
            date: 'Dec 05, 2023',
            screen: 'AnnuvalSPortsDay',
            actionLabel: 'View Details',
        },
        {
            id: '3',
            type: 'ACADEMIC',
            title: 'Half-Yearly Examination Results',
            description: 'Results for Grades 6 to 12 have been uploaded to the portal. Parents can also collect physical marksheets from school.',
            date: 'Oct 18, 2023',
            actionLabel: 'View Results',
        },
        {
            id: '4',
            type: 'FEES',
            title: 'Quarter 3 Fee Submission',
            description: 'The last date for Quarter 3 fee payment is Oct 31, 2023. Late fees will apply after the deadline.',
            date: 'Oct 15, 2023',
            attachment: 'Fee_Structure.pdf',
        },
    ];

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'EVENT': return '#E3F2FD';
            case 'ACADEMIC': return '#E8F5E9';
            case 'FEES': return '#F3E5F5';
            default: return '#EEEEEE';
        }
    };

    const getBadgeTextColor = (type: string) => {
        switch (type) {
            case 'EVENT': return '#2196F3';
            case 'ACADEMIC': return '#4CAF50';
            case 'FEES': return '#9C27B0';
            default: return '#666666';
        }
    };

    const renderNoticeItem = ({ item }: { item: any }) => {
        if (item.isUrgent) {
            return (
                <TouchableOpacity
                    style={styles.urgentCard}
                    onPress={() => item.screen && navigation.navigate(item.screen)}
                >
                    <View style={styles.urgentHeader}>
                        <Text style={styles.urgentIcon}>📢</Text>
                        <Text style={styles.urgentLabel}>URGENT NOTICE</Text>
                    </View>
                    <Text style={styles.urgentTitle}>{item.title}</Text>
                    <Text style={styles.urgentDescription}>{item.description}</Text>
                    <View style={styles.urgentFooter}>
                        <Text style={styles.urgentDate}>{item.date}</Text>
                        <TouchableOpacity
                            style={styles.readMoreBtn}
                            onPress={() => item.screen && navigation.navigate(item.screen)}
                        >
                            <Text style={styles.readMoreText}>Read More</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={styles.noticeCard}
                onPress={() => item.screen && navigation.navigate(item.screen)}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.typeBadge, { backgroundColor: getBadgeColor(item.type) }]}>
                        <Text style={[styles.typeText, { color: getBadgeTextColor(item.type) }]}>{item.type}</Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>

                {item.attachment && (
                    <View style={styles.attachmentSection}>
                        <View style={styles.attachmentInfo}>
                            <Text style={styles.fileIcon}>📄</Text>
                            <Text style={styles.attachmentName}>{item.attachment}</Text>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Text style={styles.downloadIcon}>📥</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {item.actionLabel && (
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => item.screen && navigation.navigate(item.screen)}
                    >
                        <Text style={styles.actionIcon}>👁️</Text>
                        <Text style={styles.actionText}>{item.actionLabel}</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper scroll={false} style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuBtn}>
                    <Text style={styles.menuIcon}>≡</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>School Notices</Text>
                <TouchableOpacity style={styles.profileBtn}>
                    <View style={styles.profileImageContainer}>
                        <Text style={styles.profileEmoji}>👤</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search notices..."
                            placeholderTextColor="#94A3B8"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <View style={styles.filterIconContainer}>
                            <View style={[styles.filterLine, { width: 18 }]} />
                            <View style={[styles.filterLine, { width: 12 }]} />
                            <View style={[styles.filterLine, { width: 6 }]} />
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={notices}
                    renderItem={renderNoticeItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListFooterComponent={<View style={{ height: 100 }} />}
                />
            </View>

            <ParentBottom activeTab="NOTICE" />
        </ScreenWrapper>
    );
};

export default NoticeScreen;

const styles = StyleSheet.create({
    mainContainer: {
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
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    menuBtn: {
        padding: 5,
    },
    menuIcon: {
        fontSize: 28,
        color: '#1E293B',
        fontWeight: '300',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    profileBtn: {
        padding: 2,
    },
    profileImageContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
    },
    profileEmoji: {
        fontSize: 20,
    },
    container: {
        flex: 1,
    },
    searchSection: {
        flexDirection: 'row',
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        marginRight: 12,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 10,
        color: '#64748B',
    },
    searchInput: {
        flex: 1,
        fontFamily: Fonts.Lexend_Medium,
        fontSize: 14,
        color: '#1E293B',
    },
    filterBtn: {
        width: 50,
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    filterIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterLine: {
        height: 2,
        backgroundColor: '#1E293B',
        marginVertical: 1.5,
        borderRadius: 1,
    },
    listContainer: {
        paddingHorizontal: HWSize.W_Width20,
        paddingBottom: 20,
    },
    urgentCard: {
        backgroundColor: '#FFF1F1',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    urgentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    urgentIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    urgentLabel: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: '#EF4444',
        letterSpacing: 1,
    },
    urgentTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#991B1B',
        marginBottom: 8,
    },
    urgentDescription: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#4B5563',
        lineHeight: 20,
        marginBottom: 15,
    },
    urgentFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    urgentDate: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#9CA3AF',
    },
    readMoreBtn: {
        backgroundColor: '#B91C1C',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    readMoreText: {
        color: Colors.white,
        fontSize: 13,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    noticeCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    typeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
    },
    dateText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
        lineHeight: 20,
        marginBottom: 15,
    },
    attachmentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    attachmentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    attachmentName: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#2563EB',
    },
    downloadBtn: {
        width: 36,
        height: 36,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadIcon: {
        fontSize: 18,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F9FF',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0F2FE',
    },
    actionIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    actionText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#0284C7',
    },
});

