import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { useNavigation } from '@react-navigation/native'

const Result = () => {
    const navigation = useNavigation();
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: 0.85,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, []);

    const subjects = [
        { id: 1, name: 'Mathematics', grade: 'A', marks: '88/100', rating: 'Distinction', icon: '🧮', color: '#E3F2FD' },
        { id: 2, name: 'English', grade: 'B+', marks: '76/100', rating: 'First Class', icon: '🔤', color: '#F3E5F5' },
        { id: 3, name: 'Science', grade: 'A', marks: '92/100', rating: 'Excellent', icon: '🔬', color: '#E8F5E9' },
        { id: 4, name: 'Social Studies', grade: 'B', marks: '68/100', rating: 'Average', icon: '🌍', color: '#FFF3E0' },
        { id: 5, name: 'Hindi', grade: 'A', marks: '85/100', rating: 'Great', icon: '📖', color: '#E0F2F1' },
    ];

    return (
        <ScreenWrapper scroll={false} style={{ backgroundColor: Colors.backgroundColor }}>
            <Header
                title="Exam Results"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Performance Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <View>
                            <Text style={styles.summaryTitle}>Performance Summary</Text>
                            <Text style={styles.summarySubtitle}>Half-Yearly Examination 2023</Text>
                        </View>
                        <View style={styles.passBadge}>
                            <Text style={styles.passText}>Pass</Text>
                        </View>
                    </View>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>85%</Text>
                        <Text style={styles.scoreLabel}>Total Score</Text>
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBarBg}>
                            <Animated.View
                                style={[
                                    styles.progressBarFill,
                                    {
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%']
                                        })
                                    }
                                ]}
                            />
                        </View>
                        <View style={styles.progressLabels}>
                            <Text style={styles.limitText}>0%</Text>
                            <Text style={styles.limitText}>Target: 100%</Text>
                        </View>
                    </View>
                </View>

                {/* Subject-wise Marks Section */}
                <Text style={styles.sectionTitle}>Subject-wise Marks</Text>

                {subjects.map((item) => (
                    <View key={item.id} style={styles.subjectCard}>
                        <View style={[styles.subjectIconContainer, { backgroundColor: item.color }]}>
                            <Text style={styles.subjectIcon}>{item.icon}</Text>
                        </View>
                        <View style={styles.subjectInfo}>
                            <Text style={styles.subjectName}>{item.name}</Text>
                            <Text style={styles.subjectGrade}>Grade: {item.grade}</Text>
                        </View>
                        <View style={styles.subjectMarksContainer}>
                            <Text style={styles.subjectMarks}>{item.marks}</Text>
                            <Text style={styles.subjectRating}>{item.rating}</Text>
                        </View>
                    </View>
                ))}

                {/* Detailed Report Card */}
                <TouchableOpacity style={styles.downloadCard}>
                    <View style={styles.downloadIconContainer}>
                        <Text style={styles.downloadIcon}>📄</Text>
                    </View>
                    <View style={styles.downloadInfo}>
                        <Text style={styles.downloadTitle}>Detailed Report Card</Text>
                        <Text style={styles.downloadSubtitle}>Download as PDF</Text>
                    </View>
                    <View style={styles.downloadBtn}>
                        <Text style={styles.downloadBtnIcon}>📥</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Result

const styles = StyleSheet.create({
    scrollContent: {
        padding: HWSize.W_Width20,
        paddingBottom: 40,
    },
    summaryCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    summaryTitle: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    summarySubtitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginTop: 4,
    },
    passBadge: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    passText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 25,
    },
    scoreText: {
        fontSize: 32,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    scoreLabel: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginLeft: 10,
    },
    progressContainer: {
        marginTop: 15,
    },
    progressBarBg: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 5,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    limitText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 15,
    },
    subjectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    subjectIconContainer: {
        width: 45,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    subjectIcon: {
        fontSize: 22,
    },
    subjectInfo: {
        flex: 1,
    },
    subjectName: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    subjectGrade: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    subjectMarksContainer: {
        alignItems: 'flex-end',
    },
    subjectMarks: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    subjectRating: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    downloadCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#BBDEFB',
        borderStyle: 'dashed',
    },
    downloadIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    downloadIcon: {
        fontSize: 20,
    },
    downloadInfo: {
        flex: 1,
    },
    downloadTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1565C0',
    },
    downloadSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1E88E5',
    },
    downloadBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    downloadBtnIcon: {
        fontSize: 20,
    }
})