import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import ScreenWrapper from '../../comman/ScreenWrapper';
import HWSize from '../../comman/HWSize';
import { useNavigation } from '@react-navigation/native';

import useStrings from '../../comman/useStrings';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
    const navigation = useNavigation<any>();
    const s = useStrings();

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerIcon}>🎓</Text>
                    <Text style={styles.headerTitle}>{s.schoolConnect}</Text>
                </View>
                {/* <TouchableOpacity style={styles.profileBtn}>
                    <Text style={styles.profileEmoji}>👤</Text>
                </TouchableOpacity> */}
            </View>

            {/* Hero Section */}
            <View style={styles.heroContainer}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={require('../../assets/WelcomeSchool.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                </View>

                <Text style={styles.welcomeTitle}>{s.welcomeTitle}</Text>
                <Text style={styles.welcomeSubtitle}>{s.welcomeSubtitle}</Text>
            </View>

            {/* Feature Cards */}
            <View style={styles.featuresContainer}>
                <FeatureCard
                    icon="📈"
                    title={s.feature1Title}
                    description={s.feature1Desc}
                    bgColor="#EEF2FF"
                />
                <FeatureCard
                    icon="🔔"
                    title={s.feature2Title}
                    description={s.feature2Desc}
                    bgColor="#F5F3FF"
                />
                <FeatureCard
                    icon="💬"
                    title={s.feature3Title}
                    description={s.feature3Desc}
                    bgColor="#ECFDF5"
                />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.getStartedBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Welcomeback')}
                >
                    <Text style={styles.getStartedText}>{s.getStarted}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginBtn}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Welcomeback')}
                >
                    <Text style={styles.loginText}>{s.alreadyAccount}</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.govServiceRow}>
                    <Text style={styles.govIcon}>🏛️</Text>
                    <Text style={styles.govText}>{s.govService}</Text>
                </View>
                <Text style={styles.footerCopyright}>{s.officialService}</Text>
                <View style={styles.footerLinks}>
                    <Text style={styles.footerLink}>{s.privacyPolicy}</Text>
                    <Text style={styles.footerDot}>•</Text>
                    <Text style={styles.footerLink}>{s.support}</Text>
                    <Text style={styles.footerDot}>•</Text>
                    <Text style={styles.footerLink}>{s.terms}</Text>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const FeatureCard = ({ icon, title, description, bgColor }: any) => (
    <View style={styles.featureCard}>
        <View style={[styles.featureIconWrapper, { backgroundColor: bgColor }]}>
            <Text style={styles.featureIcon}>{icon}</Text>
        </View>
        <View style={styles.featureTextWrapper}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDescription}>{description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: HWSize.W_Width20,
        paddingBottom: 15,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 22,
        marginRight: 10,
        color: '#074799',
    },
    headerTitle: {
        fontFamily: Fonts.LexendBold,
        fontSize: 18,
        color: '#074799',
        letterSpacing: 0.5,
    },
    profileBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    profileEmoji: {
        fontSize: 18,
    },
    heroContainer: {
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 10,
    },
    imageWrapper: {
        width: width - 50,
        height: 280,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 25,
        backgroundColor: '#E0E7FF',
        elevation: 8,
        shadowColor: '#074799',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    archContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    arch: {
        width: 180,
        height: 180,
        borderWidth: 12,
        borderColor: 'rgba(255,255,255,0.8)',
        borderBottomWidth: 0,
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,
        position: 'absolute',
        top: -40,
    },
    welcomeArchText: {
        fontFamily: Fonts.LexendBold,
        fontSize: 28,
        color: Colors.white,
        letterSpacing: 2,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        marginTop: -80,
    },
    welcomeTitle: {
        fontFamily: Fonts.LexendBold,
        fontSize: 26,
        color: '#074799',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 34,
    },
    welcomeSubtitle: {
        fontFamily: Fonts.Lexend_Regular,
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 15,
    },
    featuresContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
    },
    featureCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 18,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 4,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    featureIconWrapper: {
        width: 52,
        height: 52,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureIcon: {
        fontSize: 24,
    },
    featureTextWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    featureTitle: {
        fontFamily: Fonts.Lexend_SemiBold,
        fontSize: 16,
        color: '#1E293B',
        marginBottom: 4,
    },
    featureDescription: {
        fontFamily: Fonts.Lexend_Regular,
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        gap: 15,
    },
    getStartedBtn: {
        backgroundColor: '#074799',
        height: 58,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#074799',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    getStartedText: {
        fontFamily: Fonts.LexendBold,
        fontSize: 17,
        color: Colors.white,
        letterSpacing: 0.5,
    },
    loginBtn: {
        height: 58,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    loginText: {
        fontFamily: Fonts.Lexend_SemiBold,
        fontSize: 15,
        color: '#074799',
    },
    footer: {
        marginTop: 50,
        paddingBottom: 40,
        alignItems: 'center',
    },
    govServiceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    govIcon: {
        fontSize: 18,
        marginRight: 8,
        opacity: 0.8,
    },
    govText: {
        fontFamily: Fonts.LexendBold,
        fontSize: 13,
        color: '#64748B',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    footerCopyright: {
        fontFamily: Fonts.Lexend_Regular,
        fontSize: 11,
        color: '#94A3B8',
        marginBottom: 15,
    },
    footerLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerLink: {
        fontFamily: Fonts.Lexend_Medium,
        fontSize: 12,
        color: '#074799',
        paddingHorizontal: 8,
    },
    footerDot: {
        color: '#CBD5E1',
        fontSize: 12,
    },
});

export default WelcomeScreen;