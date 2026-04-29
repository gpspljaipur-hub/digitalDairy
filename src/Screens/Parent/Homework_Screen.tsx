import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import ParentBottom from '../../Component/ParentBottom'

const Homework_Screen = () => {
    const navigation = useNavigation<any>();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Maths', 'English', 'Science', 'Social'];

    const homeworkData = [
        {
            id: '1',
            subject: 'MATHEMATICS',
            icon: '📐',
            status: 'Pending',
            title: 'Solve exercises 4.1 to 4.3',
            description: 'Focus on quadratic equations and their real-world applications in physics.',
            assignedDate: 'Oct 12, 2023',
            dueDate: 'Oct 15, 2023',
            teacher: 'Ms. Sunita',
            teacherAvatar: '👩‍🏫',
            type: 'details'
        },
        {
            id: '2',
            subject: 'ENGLISH',
            icon: '📖',
            status: 'Completed',
            title: 'Essay on Shakespeare',
            description: 'Write a 500-word analysis on the theme of power in "Macbeth".',
            assignedDate: 'Oct 10, 2023',
            dueDate: 'Oct 14, 2023',
            teacher: 'Mr. Rajesh',
            teacherAvatar: '👨‍🏫',
            type: 'submission'
        },
        {
            id: '3',
            subject: 'SCIENCE',
            icon: '🔬',
            status: 'Pending',
            title: 'Lab Report: Chemical Bonds',
            description: 'Submit the final report for the Ionic and Covalent bonding experiment.',
            assignedDate: 'Oct 13, 2023',
            dueDate: 'Oct 18, 2023',
            teacher: 'Dr. Gupta',
            teacherAvatar: '👨‍🔬',
            type: 'details'
        }
    ];

    const renderHomeworkCard = (item: any) => (
        <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.subjectInfo}>
                    <View style={styles.subjectIconBox}>
                        <Text style={styles.subjectIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.subjectName}>{item.subject}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'Completed' ? '#D1FAE5' : '#FEE2E2' }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: item.status === 'Completed' ? '#059669' : '#DC2626' }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <Text style={styles.homeworkTitle}>{item.title}</Text>
                <Text style={styles.homeworkDesc}>{item.description}</Text>
            </View>

            <View style={styles.dateContainer}>
                <View>
                    <Text style={styles.dateLabel}>ASSIGNED</Text>
                    <Text style={styles.dateValue}>{item.assignedDate}</Text>
                </View>
                <View>
                    <Text style={styles.dateLabel}>DUE DATE</Text>
                    <Text style={[styles.dateValue, { color: '#DC2626', fontFamily: Fonts.LexendBold }]}>{item.dueDate}</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.teacherInfo}>
                    <View style={styles.teacherAvatarBox}>
                        <Text style={styles.teacherAvatar}>{item.teacherAvatar}</Text>
                    </View>
                    <Text style={styles.teacherName}>{item.teacher}</Text>
                </View>
                <TouchableOpacity style={[
                    styles.actionButton,
                    { backgroundColor: item.type === 'submission' ? '#EEF2FF' : Colors.primary }
                ]}>
                    <Text style={[
                        styles.actionButtonText,
                        { color: item.type === 'submission' ? Colors.primary : Colors.white }
                    ]}>
                        {item.type === 'submission' ? 'View Submission' : 'View Details'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScreenWrapper scroll={false}>
            <Header title="Homework" showProfile={true} />

            <View style={styles.container}>
                {/* Categories Filter */}
                <View style={styles.categoryWrapper}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    >
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === cat && styles.categoryItemActive
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === cat && styles.categoryTextActive
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Info Banner */}
                    <View style={styles.infoBanner}>
                        <View style={styles.infoIconBox}>
                            <Text style={styles.infoIcon}>ℹ️</Text>
                        </View>
                        <Text style={styles.infoText}>3 assignments due this week.</Text>
                    </View>

                    {/* Homework Cards */}
                    {homeworkData.map(renderHomeworkCard)}

                    {/* Guidelines Card */}
                    <TouchableOpacity style={styles.guidelinesCard}>
                        <View style={styles.guidelinesIconBox}>
                            <Text style={styles.guidelinesIcon}>📄</Text>
                        </View>
                        <View style={styles.guidelinesContent}>
                            <Text style={styles.guidelinesTitle}>Homework Guidelines.pdf</Text>
                            <Text style={styles.guidelinesInfo}>1.2 MB • Updated yesterday</Text>
                        </View>
                        <Text style={styles.downloadIcon}>⬇️</Text>
                    </TouchableOpacity>

                    {/* Bottom Spacing */}
                    <View style={{ height: 100 }} />
                </ScrollView>
                <ParentBottom activeTab="HOME" />
            </View>
        </ScreenWrapper>
    )
}

export default Homework_Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    categoryWrapper: {
        backgroundColor: Colors.white,
        paddingVertical: HWSize.H_Height12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    categoryList: {
        paddingHorizontal: HWSize.W_Width15,
    },
    categoryItem: {
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: HWSize.H_Height10,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoryItemActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    categoryTextActive: {
        color: Colors.white,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    scrollContent: {
        padding: HWSize.W_Width15,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: HWSize.W_Width12,
        marginBottom: HWSize.H_Height20,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    infoIconBox: {
        marginRight: 12,
    },
    infoIcon: {
        fontSize: 18,
    },
    infoText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1E40AF',
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: HWSize.W_Width15,
        marginBottom: HWSize.H_Height15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: HWSize.H_Height12,
    },
    subjectInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subjectIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    subjectIcon: {
        fontSize: 18,
    },
    subjectName: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#374151',
        letterSpacing: 0.5,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    cardBody: {
        marginBottom: HWSize.H_Height15,
    },
    homeworkTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 4,
    },
    homeworkDesc: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: HWSize.H_Height12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
        marginBottom: HWSize.H_Height15,
    },
    dateLabel: {
        fontSize: 10,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#9CA3AF',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    dateValue: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#374151',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teacherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teacherAvatarBox: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    teacherAvatar: {
        fontSize: 18,
    },
    teacherName: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#4B5563',
    },
    actionButton: {
        paddingHorizontal: HWSize.W_Width15,
        paddingVertical: HWSize.H_Height10,
        borderRadius: 10,
    },
    actionButtonText: {
        fontSize: 13,
        fontFamily: Fonts.LexendBold,
    },
    guidelinesCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: HWSize.W_Width12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginTop: HWSize.H_Height10,
    },
    guidelinesIconBox: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    guidelinesIcon: {
        fontSize: 24,
    },
    guidelinesContent: {
        flex: 1,
    },
    guidelinesTitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
    },
    guidelinesInfo: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.lightGreyText,
        marginTop: 2,
    },
    downloadIcon: {
        fontSize: 22,
        color: Colors.primary,
    }
})
