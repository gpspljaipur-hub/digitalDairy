import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    FlatList
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import useStrings from '../../comman/useStrings'
const NOTICES = [
    {
        id: '1',
        title: 'Annual Sports Day Postponed',
        description: 'Due to heavy rain forecasts, the Annual Sports Day scheduled for tomorrow has been rescheduled to next week. Please check the updated schedule.',
        isImportant: true,
        status: 'Sent',
        tags: ['Grade 10-A', 'Grade 10-B', 'Grade 9-C'],
        date: 'Oct 27, 2023',
        time: '09:45 AM'
    },
    {
        id: '2',
        title: 'Monthly Parent-Teacher Meeting',
        description: 'Invitations for the October PTM have been sent to all registered email addresses. Please confirm your attendance by Thursday.',
        isImportant: false,
        status: 'Sent',
        tags: ['Grade 10-A'],
        date: 'Oct 25, 2023',
        time: '02:30 PM'
    },
    {
        id: '3',
        title: 'Science Lab Safety Manual',
        description: 'The updated safety protocols for the chemistry lab are now available for all students. Please review them before your next practical session.',
        isImportant: false,
        status: 'Sent',
        tags: ['Grade 11-B', 'Grade 12-A'],
        date: 'Oct 24, 2023',
        time: '11:15 AM'
    }
]
const CLASSES = [
    'All Classes',
    'Class X A',
    'Class X B',
    'Class XI A',
    'Class XII B'
]

const ViewAllNotice = () => {
    const Strings = useStrings()
    const navigation = useNavigation<any>()
    const [selectedClass, setSelectedClass] = useState(Strings.allClasses)
    const [searchQuery, setSearchQuery] = useState('')

    const renderNoticeItem = ({ item }: { item: typeof NOTICES[0] }) => (
        <View style={styles.noticeCard}>
            <View style={styles.cardHeader}>
                {item.isImportant && (
                    <View style={styles.importantBadge}>
                        <Text style={styles.importantText}>❗ {Strings.important}</Text>
                    </View>
                )}
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>✓ {item.status}</Text>
                </View>
            </View>

            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeDescription} numberOfLines={2}>
                {item.description}
            </Text>

            <View style={styles.tagsContainer}>
                {item.tags.map((tag, index) => (
                    <View key={index} style={styles.tagBadge}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.dateTimeText}>📅 {item.date} • {item.time}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{Strings.schoolNotices}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <Text style={styles.headerIconText}>🔍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <Text style={styles.headerIconText}>⋮</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={Strings.searchNotices}
                        placeholderTextColor={Colors.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Filter Chips */}
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                        {CLASSES.map((cls) => (
                            <TouchableOpacity
                                key={cls}
                                style={[
                                    styles.filterChip,
                                    selectedClass === cls && styles.activeFilterChip
                                ]}
                                onPress={() => setSelectedClass(cls)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedClass === cls && styles.activeFilterText
                                ]}>
                                    {cls}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Notice List */}
                <FlatList
                    data={NOTICES}
                    renderItem={renderNoticeItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('CreateNotice')}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ViewAllNotice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 1,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        marginRight: 15,
    },
    backIcon: {
        fontSize: 24,
        color: '#2563EB',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#2563EB',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconButton: {
        marginLeft: 15,
        padding: 5,
    },
    headerIconText: {
        fontSize: 20,
        color: '#64748B',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        height: 50,
    },
    searchIcon: {
        fontSize: 18,
        color: '#94A3B8',
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1A1A1A',
    },
    filterContainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    filterScroll: {
        paddingRight: 20,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    activeFilterChip: {
        backgroundColor: '#0F4C81',
        borderColor: '#0F4C81',
    },
    filterText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    activeFilterText: {
        color: Colors.white,
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 100,
    },
    noticeCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    importantBadge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    importantText: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: '#EF4444',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#059669',
    },
    noticeTitle: {
        fontSize: 17,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
        marginBottom: 8,
    },
    noticeDescription: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        lineHeight: 20,
        marginBottom: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
        gap: 8,
    },
    tagBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    cardFooter: {
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 12,
    },
    dateTimeText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#94A3B8',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#0F4C81',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    fabIcon: {
        fontSize: 32,
        color: Colors.white,
    }
})