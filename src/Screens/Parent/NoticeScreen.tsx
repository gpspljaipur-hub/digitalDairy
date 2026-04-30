import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import HWSize from '../../comman/HWSize';
import ParentBottom from '../../Component/ParentBottom';
import useStrings from '../../comman/useStrings';

const NoticeScreen = () => {
    const strings = useStrings()
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');

    const { parent } = useSelector((state: any) => state.user);
    const [noticeList, setNoticeList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        setLoading(true);
        const classId = parent?.classId?._id;
        try {
            const res = await Auth_ApiRequest(ApiUrl.NoticeList, { classId });
            console.log('Notice List Response:', res);
            if (res && !res.error) {
                setNoticeList(res.data || res || []);
            }
        } catch (error) {
            console.error('Fetch Notice Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredNotices = noticeList.filter(notice =>
        notice.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        const isUrgent = item.type === 'URGENT' || item.isUrgent;
        if (isUrgent) {
            return (
                <TouchableOpacity
                    style={styles.urgentCard}
                    onPress={() => item.screen && navigation.navigate(item.screen)}
                >
                    <View style={styles.urgentHeader}>
                        <Text style={styles.urgentIcon}>📢</Text>
                        <Text style={styles.urgentLabel}>{strings.urgent}</Text>
                    </View>
                    <Text style={styles.urgentTitle}>{item.title}</Text>
                    <Text style={styles.urgentDescription}>{item.message}</Text>
                    <View style={styles.urgentFooter}>
                        <Text style={styles.urgentDate}>{moment(item.date).format('MMM DD, YYYY')}</Text>
                        <TouchableOpacity
                            style={styles.readMoreBtn}
                            onPress={() => item.screen && navigation.navigate(item.screen)}
                        >
                            <Text style={styles.readMoreText}>{strings.readMore}</Text>
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
                        <Text style={[styles.typeText, { color: getBadgeTextColor('EVENT') }]}>{'EVENT'}</Text>
                    </View>
                    <Text style={styles.dateText}>{moment(item.date).format('MMM DD, YYYY')}</Text>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.message}</Text>

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


                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => navigation.navigate('AnnuvalSPortsDay', { notice: item })}
                >
                    <Text style={styles.actionIcon}>👁️</Text>
                    <Text style={styles.actionText}>View Details</Text>
                </TouchableOpacity>

            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper scroll={false} style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title={strings.noticesTitle}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={strings.searchNotices}
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
                    data={filteredNotices}
                    renderItem={renderNoticeItem}
                    keyExtractor={(item) => item._id || item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        loading ? (
                            <View style={{ marginTop: 50 }}>
                                <ActivityIndicator size="large" color={Colors.primary} />
                            </View>
                        ) : (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>No notices found.</Text>
                            </View>
                        )
                    }
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
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: 'red',
    },
});

