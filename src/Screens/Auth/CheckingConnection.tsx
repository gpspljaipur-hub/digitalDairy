import { StyleSheet, Text, View, TouchableOpacity, StatusBar, } from 'react-native'
import React, { useState } from 'react'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { SafeAreaView } from 'react-native-safe-area-context'
import useStrings from '../../comman/useStrings'

const CheckingConnection = () => {
    const s = useStrings();
    const [progress, setProgress] = useState(0.65);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Header
                title={s.schoolPortal}
                showNotification={false}
                rightIcon="🌐"
            />

            <View style={styles.content}>
                <View style={styles.iconWrapper}>
                    <View style={styles.iconOuterSquare}>
                        <View style={styles.iconInnerSquare}>
                            <View style={styles.iconBox}>
                                <View style={styles.signalIconContainer}>
                                    <View style={styles.signalDot} />
                                    <View style={styles.signalRing1} />
                                    <View style={styles.signalRing2} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>{s.checkingConnection}</Text>
                <Text style={styles.subtitle}>
                    {s.reconnectSubtitle}
                </Text>

                <View style={styles.progressSection}>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <View style={styles.progressTextRow}>
                        <Text style={styles.statusText}>{s.establishingHandshake}</Text>
                        <Text style={styles.percentageText}>{Math.round(progress * 100)}%</Text>
                    </View>
                </View>

                <View style={styles.cardsRow}>
                    <View style={styles.infoCard}>
                        <View style={styles.cardIconBox}>
                            <Text style={styles.cardEmoji}>📡</Text>
                        </View>
                        <Text style={styles.cardLabel}>{s.node}</Text>
                        <Text style={styles.cardValue}>CAMPUS-GW-04</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <View style={styles.cardIconBox}>
                            <Text style={styles.cardEmoji}>⏱️</Text>
                        </View>
                        <Text style={styles.cardLabel}>{s.latency}</Text>
                        <Text style={styles.cardValue}>{s.searching}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>{s.cancel}</Text>
                </TouchableOpacity>
                <Text style={styles.footerNote}>
                    {s.wifiSettingsNote}
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default CheckingConnection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: HWSize.H_Height40,
    },
    iconWrapper: {
        marginBottom: HWSize.H_Height40,
    },
    iconOuterSquare: {
        width: 160,
        height: 160,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconInnerSquare: {
        width: 130,
        height: 130,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: '#0047AB', // Darker blue as per image
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    signalIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    signalDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.white,
    },
    signalRing1: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.white,
        opacity: 0.8,
    },
    signalRing2: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.white,
        opacity: 0.5,
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1A1A1A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
        marginBottom: HWSize.H_Height40,
    },
    progressSection: {
        width: '100%',
        marginBottom: HWSize.H_Height40,
    },
    progressBarBg: {
        height: 10,
        width: '100%',
        backgroundColor: '#F0F4FF',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0047AB',
        borderRadius: 5,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#888888',
    },
    percentageText: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#888888',
    },
    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    infoCard: {
        width: '48%',
        backgroundColor: '#F5F8FF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8EFFF',
    },
    cardIconBox: {
        marginBottom: 12,
    },
    cardEmoji: {
        fontSize: 22,
    },
    cardLabel: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: '#888888',
        letterSpacing: 1,
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1A1A1A',
    },
    footer: {
        paddingHorizontal: HWSize.W_Width20,
        paddingBottom: HWSize.H_Height40,
    },
    cancelBtn: {
        backgroundColor: '#0056D2',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    cancelBtnText: {
        fontSize: 18,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.white,
    },
    footerNote: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#888888',
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 20,
    },
})
