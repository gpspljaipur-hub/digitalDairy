import { useSelector } from 'react-redux'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import { ActivityIndicator, StyleSheet, Animated, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import HWSize from '../../comman/HWSize'
import { Colors } from '../../comman/Colors'
import fonts from '../../comman/fonts'
import { useNavigation } from '@react-navigation/native'
import { useRef, useState, useEffect } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import useStrings from '../../comman/useStrings'
import { Auth_ApiRequest, Get_Send_Api } from '../../Lib/ApiService/ApiRequest'

const Result = () => {
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const strings = useStrings()
    const progressAnim = useRef(new Animated.Value(0)).current;

    const [marksList, setMarksList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = async () => {
        setLoading(true);
        const pData = parent?.data || parent;
        const classId = pData?.classId?._id || pData?.classId;
        const studentId = pData?.studentId?._id || pData?.studentId;
        console.log('pData: ', pData);
        console.log('classId: ', classId);
        console.log('studentId: ', studentId);

        try {
            const res = await Auth_ApiRequest(ApiUrl.MarksList, { classId, studentId })
            console.log('Marks List Response:', res);
            if (res && !res.error) {
                const list = res.data || res || [];
                setMarksList(list);

                // Calculate average for progress bar
                if (list.length > 0) {
                    const total = list.reduce((acc: number, curr: any) => acc + (curr.marks || 0), 0);
                    const avg = Math.min(1, total / (list.length * 100));
                    Animated.timing(progressAnim, {
                        toValue: avg,
                        duration: 1500,
                        useNativeDriver: false,
                    }).start();
                }
            }
        } catch (error) {
            console.error('Fetch Marks Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGrade = (marks: number) => {
        if (marks >= 90) return { grade: 'A+', rating: 'Outstanding', color: '#E8F5E9' };
        if (marks >= 80) return { grade: 'A', rating: 'Excellent', color: '#E3F2FD' };
        if (marks >= 70) return { grade: 'B+', rating: 'Very Good', color: '#F3E5F5' };
        if (marks >= 60) return { grade: 'B', rating: 'Good', color: '#FFF3E0' };
        return { grade: 'C', rating: 'Average', color: '#FFEBEE' };
    };

    const averageScore = marksList.length > 0
        ? Math.min(100, Math.round(marksList.reduce((acc, curr) => acc + (curr.marks || 0), 0) / marksList.length))
        : 0;

    return (
        <ScreenWrapper scroll={false} style={{ backgroundColor: Colors.backgroundColor }}>
            <Header
                title={strings.examResult}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Performance Summary Card */}
                {(() => {
                    const pData = parent?.data || parent;
                    return (
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.summaryTitle}>Performance Summary</Text>
                                    <Text style={styles.summarySubtitle}>Academic Session 2026</Text>
                                </View>
                                {/* <View style={[styles.passBadge, { backgroundColor: averageScore >= 40 ? '#4CAF50' : '#D32F2F' }]}>
                                    <Text style={styles.passText}>{averageScore >= 40 ? 'Pass' : 'Fail'}</Text>
                                </View> */}
                            </View>

                            <View style={styles.scoreContainer}>
                                <Text style={styles.scoreText}>{averageScore}%</Text>
                                <Text style={styles.scoreLabel}>{strings.totalScore}</Text>
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
                    )
                })()}

                {/* Subject-wise Marks Section */}
                <Text style={styles.sectionTitle}>{strings.subjectWiseMarks}</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    marksList.length > 0 ? marksList.map((item) => {
                        const info = getGrade(item.marks);
                        return (
                            <View key={item._id} style={styles.subjectCard}>
                                <View style={[styles.subjectIconContainer, { backgroundColor: info.color }]}>
                                    <Text style={styles.subjectIcon}>📝</Text>
                                </View>
                                <View style={styles.subjectInfo}>
                                    <Text style={styles.subjectName}>{item?.subjectId?.name || 'Subject'}</Text>
                                    <Text style={styles.subjectGrade}>Grade: {info.grade}</Text>
                                </View>
                                <View style={styles.subjectMarksContainer}>
                                    <Text style={styles.subjectMarks}>{item.marks}/100</Text>
                                    <Text style={styles.subjectRating}>{info.rating}</Text>
                                </View>
                            </View>
                        )
                    }) : (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontFamily: fonts.Lexend_Medium, color: Colors.textSecondary }}>No marks records found.</Text>
                        </View>
                    )
                )}

                {/* Detailed Report Card */}
                <TouchableOpacity style={styles.downloadCard}>
                    <View style={styles.downloadIconContainer}>
                        <Text style={styles.downloadIcon}>📄</Text>
                    </View>
                    <View style={styles.downloadInfo}>
                        <Text style={styles.downloadTitle}>{strings.detailedReportCard}</Text>
                        <Text style={styles.downloadSubtitle}>{strings.downloadAsPDF}</Text>
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
    studentNameHeader: {
        fontSize: 20,
        fontFamily: fonts.LexendBold,
        color: Colors.primary,
        marginBottom: 2,
    },
    classNameHeader: {
        fontSize: 14,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    summaryTitle: {
        fontSize: 16,
        fontFamily: fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    summarySubtitle: {
        fontSize: 18,
        fontFamily: fonts.LexendBold,
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
        fontFamily: fonts.LexendBold,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 25,
    },
    scoreText: {
        fontSize: 32,
        fontFamily: fonts.LexendBold,
        color: Colors.primary,
    },
    scoreLabel: {
        fontSize: 16,
        fontFamily: fonts.Lexend_Regular,
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
        fontFamily: fonts.Lexend_Regular,
        color: Colors.textSecondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: fonts.LexendBold,
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
        fontFamily: fonts.LexendBold,
        color: Colors.textMain,
    },
    subjectGrade: {
        fontSize: 14,
        fontFamily: fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    subjectMarksContainer: {
        alignItems: 'flex-end',
    },
    subjectMarks: {
        fontSize: 16,
        fontFamily: fonts.LexendBold,
        color: Colors.primary,
    },
    subjectRating: {
        fontSize: 12,
        fontFamily: fonts.Lexend_Regular,
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
        fontFamily: fonts.LexendBold,
        color: '#1565C0',
    },
    downloadSubtitle: {
        fontSize: 14,
        fontFamily: fonts.Lexend_Regular,
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