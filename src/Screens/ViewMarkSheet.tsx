import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../comman/Colors'
import Fonts from '../comman/fonts'
import StringsRaw from '../comman/String'
import HWSize from '../comman/HWSize'
import Header from '../comman/Header'
import ScreenWrapper from '../comman/ScreenWrapper'

const Strings = StringsRaw.en

const STUDENTS_MARKS = [
    { id: '01', name: 'Alex Johnson', rollNo: '1024', marks: '85', status: 'Pass', initial: 'AJ' },
    { id: '02', name: 'Sarah Williams', rollNo: '1025', marks: '92', status: 'Pass', initial: 'SW' },
    { id: '03', name: 'Marcus Thompson', rollNo: '1026', marks: '--', status: 'Pending', initial: 'MT' },
    { id: '04', name: 'Emily Lane', rollNo: '1027', marks: '78', status: 'Pass', initial: 'EL' },
    { id: '05', name: 'Alex Johnson', rollNo: '1024', marks: '85', status: 'Pass', initial: 'AJ' },
    { id: '06', name: 'Sarah Williams', rollNo: '1025', marks: '92', status: 'Pass', initial: 'SW' },
    { id: '07', name: 'Marcus Thompson', rollNo: '1026', marks: '--', status: 'Pending', initial: 'MT' },
    { id: '08', name: 'Emily Lane', rollNo: '1027', marks: '78', status: 'Pass', initial: 'EL' },
    { id: '09', name: 'Alex Johnson', rollNo: '1024', marks: '85', status: 'Pass', initial: 'AJ' },
    { id: '10', name: 'Sarah Williams', rollNo: '1025', marks: '92', status: 'Pass', initial: 'SW' },
    { id: '11', name: 'Marcus Thompson', rollNo: '1026', marks: '--', status: 'Pending', initial: 'MT' },
    { id: '12', name: 'Emily Lane', rollNo: '1027', marks: '78', status: 'Pass', initial: 'EL' },
]

const ViewMarkSheet = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const renderStudentItem = ({ item, index }: { item: typeof STUDENTS_MARKS[0], index: number }) => (
        <View style={[styles.tableRow, index === STUDENTS_MARKS.length - 1 && styles.lastRow]}>
            <View style={styles.colRoll}>
                <Text style={styles.rollText}>{item.id}</Text>
            </View>

            <View style={styles.colName}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.initial}</Text>
                </View>
                <Text style={styles.studentName} numberOfLines={1}>{item.name}</Text>
            </View>

            <View style={styles.colMarks}>
                <Text style={styles.studentMarks}>
                    {item.marks}
                    <Text style={styles.totalBase}> / 100</Text>
                </Text>
            </View>

            <View style={styles.colStatus}>
                <View style={[styles.statusBadge, item.status === 'Pass' ? styles.passBadge : styles.pendingBadge]}>
                    <Text style={styles.badgeIcon}>{item.status === 'Pass' ? '✅' : '⏳'}</Text>
                    <Text style={[styles.badgeText, item.status === 'Pass' ? styles.passText : styles.pendingText]}>
                        {item.status === 'Pass' ? Strings.pass : Strings.pending}
                    </Text>
                </View>
            </View>
        </View>
    )

    return (
        <ScreenWrapper style={styles.container} scroll={false}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title={Strings.studentMarksheet}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={true}
            />

            <FlatList
                data={STUDENTS_MARKS}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => renderStudentItem({ item, index })}
                ListHeaderComponent={
                    <View style={styles.headerPadding}>
                        {/* Summary Cards */}
                        <View style={[styles.summaryRow, styles.paddingX]}>
                            <View style={styles.subjectCardSmall}>
                                <Text style={styles.cardLabelLight}>{Strings.subjectLabel}</Text>
                                <Text style={styles.cardValueSmall}>Mathematics</Text>
                            </View>
                            <View style={styles.classCardSmall}>
                                <Text style={styles.cardLabelDark}>{Strings.classLabel}</Text>
                                <Text style={styles.cardValueSmallDark}>Grade 10-B</Text>
                            </View>
                        </View>

                        <View style={[styles.avgCard, styles.paddingX, { marginHorizontal: HWSize.W_Width20 }]}>
                            <Text style={styles.cardLabelDark}>{Strings.averageScore}</Text>
                            <View style={styles.cardContentRow}>
                                <Text style={styles.avgValue}>78 <Text style={styles.totalBaseAvg}>/ 100</Text></Text>
                            </View>
                        </View>

                        {/* Search Section */}
                        <View style={[styles.searchSection, styles.paddingX]}>
                            <View style={styles.searchBar}>
                                <Text style={styles.searchIcon}>🔍</Text>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder={Strings.searchPlaceholder}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>
                        </View>

                        {/* Table Header inside Card */}
                        <View style={styles.tableCard}>
                            <View style={styles.tableHeader}>
                                <View style={styles.colRoll}>
                                    <Text style={styles.headerText}>{Strings.roll}</Text>
                                </View>
                                <View style={styles.colNameHeader}>
                                    <Text style={styles.headerText}>{Strings.studentName}</Text>
                                </View>
                                <View style={styles.colMarks}>
                                    <Text style={styles.headerText}>{Strings.marksHeader}</Text>
                                </View>
                                <View style={styles.colStatus}>
                                    <Text style={styles.headerText}>{Strings.statusHeader}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.pdfIcon}>📄</Text>
                    <Text style={styles.downloadButtonText}>{Strings.downloadPDFMarksheet}</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default ViewMarkSheet

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFC',
    },
    headerPadding: {
        paddingTop: 20,
    },
    paddingX: {
        paddingHorizontal: HWSize.W_Width20,
    },
    listContent: {
        paddingBottom: 100,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    subjectCardSmall: {
        flex: 1,
        backgroundColor: '#005CB9',
        borderRadius: 12,
        padding: 16,
    },
    classCardSmall: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardValueSmall: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    cardValueSmallDark: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#003366',
    },
    avgCard: {
        backgroundColor: '#EEF6FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    cardLabelLight: {
        fontSize: 10,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    cardLabelDark: {
        fontSize: 10,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
        marginBottom: 4,
    },
    cardContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avgValue: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#003366',
    },
    totalBaseAvg: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    searchSection: {
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1E293B',
    },
    tableCard: {
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginHorizontal: HWSize.W_Width20,
    },
    headerText: {
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
        color: '#64748B',
        letterSpacing: 0.5,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E2E8F0',
        marginHorizontal: HWSize.W_Width20,
    },
    lastRow: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    colRoll: {
        width: 40,
    },
    colNameHeader: {
        flex: 1,
        paddingLeft: 10,
    },
    colName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    colMarks: {
        width: 80,
        alignItems: 'center',
    },
    colStatus: {
        width: 100,
        alignItems: 'flex-end',
    },
    rollText: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#E0E7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: '#3730A3',
    },
    studentName: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
        flex: 1,
    },
    studentMarks: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
    },
    totalBase: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    passBadge: {
        backgroundColor: '#DCFCE7',
    },
    pendingBadge: {
        backgroundColor: '#F1F5F9',
    },
    badgeIcon: {
        fontSize: 10,
        marginRight: 4,
        // In a real app we'd use an Icon component, but for now text icons
    },
    badgeText: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
    },
    passText: {
        color: '#15803D',
    },
    pendingText: {
        color: '#475569',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    downloadButton: {
        backgroundColor: '#003366',
        height: 54,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadButtonText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    pdfIcon: {
        fontSize: 20,
        color: Colors.white,
        marginRight: 10,
    },
})
