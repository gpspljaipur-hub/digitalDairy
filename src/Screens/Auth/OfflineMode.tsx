import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import Strings from '../../comman/String'
import ScreenWrapper from '../../comman/ScreenWrapper'
import { useNavigation } from '@react-navigation/native'

const OfflineMode = () => {
    const navigation = useNavigation<any>();
    const lang = Strings.en;

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerIcon}>🏛️</Text>
                    <Text style={styles.headerTitle}>School Connect</Text>
                </View>
                <TouchableOpacity style={styles.syncBtn}>
                    <Text style={styles.syncIcon}>🔄</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Offline Illustration */}
                <View style={styles.offlineIconContainer}>
                    <View style={styles.iconBox}>
                        <Text style={styles.cloudEmoji}>☁️</Text>
                        <View style={styles.slashLine} />
                    </View>
                </View>

                {/* Main Text */}
                <Text style={styles.title}>{lang.offlineTitle}</Text>
                <Text style={styles.description}>{lang.offlineDesc}</Text>

                {/* Saved Offline Card */}
                <View style={styles.card}>
                    <View style={styles.cardIconContainer}>
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkEmoji}>✔️</Text>
                        </View>
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTitle}>{lang.savedOffline}</Text>
                        <Text style={styles.cardSubtitle}>{lang.docsPending}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{lang.ready}</Text>
                    </View>
                </View>

                {/* Sync Status Card */}
                <View style={styles.card}>
                    <View style={styles.cardIconContainer}>
                        <Text style={styles.syncStatusIcon}>☑️</Text>
                    </View>
                    <View style={styles.syncContent}>
                        <View style={styles.syncHeader}>
                            <Text style={styles.cardTitle}>{lang.syncStatus}</Text>
                            <Text style={styles.percentText}>100%</Text>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressBarBg}>
                            <View style={styles.progressBarFill} />
                        </View>

                        <Text style={styles.syncFooterText}>{lang.dataSafe}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={styles.primaryButtonText}>{lang.continueWork}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>{lang.checkConnection}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScreenWrapper>
    )
}

export default OfflineMode

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FE',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 22,
        color: Colors.primary,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    syncBtn: {
        padding: 5,
    },
    syncIcon: {
        fontSize: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: HWSize.W_Width20,
        alignItems: 'center',
        paddingTop: 30,
    },
    offlineIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 20,
        backgroundColor: '#F0F4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    iconBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cloudEmoji: {
        fontSize: 60,
        color: '#666',
    },
    slashLine: {
        position: 'absolute',
        width: 70,
        height: 4,
        backgroundColor: '#666',
        transform: [{ rotate: '-45deg' }],
        borderRadius: 2,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        marginBottom: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 35,
        paddingHorizontal: 10,
    },
    card: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardIconContainer: {
        marginRight: 15,
    },
    checkCircle: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#6DFF94',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkEmoji: {
        fontSize: 18,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
    },
    cardSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#666',
        marginTop: 2,
    },
    badge: {
        backgroundColor: '#A0FFB9',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1DB954',
    },
    syncStatusIcon: {
        fontSize: 24,
        color: Colors.primary,
    },
    syncContent: {
        flex: 1,
    },
    syncHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    percentText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        width: '100%',
        marginBottom: 12,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 4,
        width: '100%',
    },
    syncFooterText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#666',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
    },
    secondaryButton: {
        backgroundColor: '#E8EFFF',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    secondaryButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
    },
})
