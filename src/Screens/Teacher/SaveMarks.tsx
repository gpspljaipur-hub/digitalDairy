import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import Header from '../../comman/Header'
import ScreenWrapper from '../../comman/ScreenWrapper'
import useStrings from '../../comman/useStrings'



const SaveMarks = () => {
    const navigation = useNavigation();
    const Strings = useStrings()
    return (
        <ScreenWrapper style={styles.container} useScrollView={true}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title="Student Marks"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={true}
            />

            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.successIconOuter}>
                    <View style={styles.successIconInner}>
                        <Text style={styles.checkMark}>✓</Text>
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.successTitle}>{Strings.marksUploadedSuccess}</Text>
                <Text style={styles.successDesc}>{Strings.marksUploadedDesc}</Text>

                {/* Record Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryIcon}>📋</Text>
                        <Text style={styles.summaryHeaderText}>{Strings.recordSummary}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.summaryGrid}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>{Strings.subjectLabel.toUpperCase()}</Text>
                            <Text style={styles.value}>Mathematics</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>{Strings.classLabel.toUpperCase()}</Text>
                            <Text style={styles.value}>Grade 10-B</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>STUDENTS</Text>
                            <Text style={styles.value}>{Strings.studentsCount}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>STATUS</Text>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusDot} />
                                <Text style={styles.statusText}>{Strings.verifiedAndSaved}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Dashboard' as never)}
                >
                    <Text style={styles.buttonIcon}>⊞</Text>
                    <Text style={styles.primaryButtonText}>{Strings.backToDashboard}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}
                    onPress={() => navigation.navigate('ViewMarkSheet')}>
                    <Text style={styles.buttonIconSecondary}>👁</Text>
                    <Text style={styles.secondaryButtonText}>{Strings.viewMarksheet}</Text>
                </TouchableOpacity>

                {/* File Download Card */}
                <View style={styles.fileCard}>
                    <View style={styles.fileInfo}>
                        <View style={styles.fileIconContainer}>
                            <Text style={styles.fileIcon}>📄</Text>
                        </View>
                        <View>
                            <Text style={styles.fileName}>{Strings.filename}</Text>
                            <Text style={styles.fileMeta}>{Strings.fileMeta}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.downloadBtn}>
                        <Text style={styles.downloadIcon}>⬇️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default SaveMarks

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFC',
    },
    content: {
        paddingHorizontal: HWSize.W_Width20,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40,
    },
    successIconOuter: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#66FF99',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    successIconInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkMark: {
        fontSize: 32,
        color: '#1E293B',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 28,
        fontFamily: Fonts.LexendBold,
        color: '#003366',
        textAlign: 'center',
        marginBottom: 12,
    },
    successDesc: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    summaryCard: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 30,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    summaryIcon: {
        fontSize: 20,
        marginRight: 10,
        color: '#003366',
    },
    summaryHeaderText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 20,
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    summaryItem: {
        width: '48%',
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#166534',
    },
    primaryButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#0055BB',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryButtonText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    buttonIcon: {
        fontSize: 20,
        color: Colors.white,
        marginRight: 10,
    },
    secondaryButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#E9F2FF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#0055BB',
    },
    buttonIconSecondary: {
        fontSize: 20,
        color: '#0055BB',
        marginRight: 10,
    },
    fileCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    fileIcon: {
        fontSize: 20,
    },
    fileName: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
    },
    fileMeta: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 2,
    },
    downloadBtn: {
        padding: 8,
    },
    downloadIcon: {
        fontSize: 20,
    },
})
