import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    StatusBar,
    Dimensions,
    Easing,
} from 'react-native';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper';
import Config from '../../Lib/ApiService/Config';

const { width, height } = Dimensions.get('window');

const Splash = () => {
    const navigation = useNavigation<any>();
    const { teacher, student, isAuthenticated, userType } = useSelector((state: any) => state.user);
    // Animation Values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const textAnim = useRef(new Animated.Value(30)).current;
    const loadingWidth = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Initial Entrance Animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.5)),
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(textAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
        ]).start();

        // Pulse animation for the logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.sin),
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.sin),
                }),
            ])
        ).start();

        // Loading Bar Animation
        Animated.timing(loadingWidth, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.quad),
        }).start();

        // Navigate after delay
        const timer = setTimeout(async () => {
            if (isAuthenticated) {
                if (userType === 'teacher') {
                    navigation.replace('Dashboard');
                } else {
                    navigation.replace('ParentDashboard');
                }
            } else {
                navigation.replace('LanguageSelection');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const progress = loadingWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Background Decorative Elements */}
            <View style={[styles.circle, { top: -100, left: -50, width: 300, height: 300, opacity: 0.1 }]} />
            <View style={[styles.circle, { bottom: -150, right: -100, width: 400, height: 400, opacity: 0.05 }]} />
            <View style={[styles.circle, { top: height * 0.3, right: -30, width: 100, height: 100, opacity: 0.08 }]} />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.logoContainer,
                        { transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }] }
                    ]}
                >
                    <View style={styles.iconWrapper}>
                        <Text style={styles.icon}>🎓</Text>
                    </View>
                    <View style={styles.logoGlow} />
                </Animated.View>

                <Animated.View style={{ transform: [{ translateY: textAnim }], alignItems: 'center' }}>
                    <Text style={styles.title}>Digital School</Text>
                    <Text style={styles.titleBold}>Diary System</Text>

                    <View style={styles.taglineRow}>
                        <View style={styles.line} />
                        <Text style={styles.dsds}>DSDS</Text>
                        <View style={styles.line} />
                    </View>

                    <Text style={styles.smartText}>SMART SCHOOL COMMUNICATION</Text>
                </Animated.View>
            </Animated.View>

            <View style={styles.footer}>
                <View style={styles.footerLineRow}>
                    <View style={styles.footerLine} />
                    <Text style={styles.footerIcon}>🏛️</Text>
                    <View style={styles.footerLine} />
                </View>
                <Text style={styles.footerText}>Official Education Department Service</Text>

                <View style={styles.loadingContainer}>
                    <View style={styles.loadingTrack}>
                        <Animated.View style={[styles.loadingBar, { width: progress }]} />
                    </View>
                    <Text style={styles.loadingLabel}>Initializing secure portal...</Text>
                </View>
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary || '#6E5CE8',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
        backgroundColor: Colors.white,
    },
    content: {
        alignItems: 'center',
        zIndex: 10,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        width: 140,
        height: 140,
        backgroundColor: Colors.white,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        zIndex: 2,
    },
    logoGlow: {
        position: 'absolute',
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 35,
        zIndex: 1,
        transform: [{ scale: 1.2 }],
        // blurRadius: 20, // Not supported in React Native View styles without specific libs
    },
    icon: {
        fontSize: 70,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.white,
        textAlign: 'center',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    titleBold: {
        fontSize: 36,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        textAlign: 'center',
        marginTop: -2,
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 6,
    },
    taglineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    line: {
        width: 50,
        height: 1.5,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 15,
        borderRadius: 1,
    },
    dsds: {
        fontSize: 20,
        fontFamily: Fonts.Lexend_SemiBold,
        color: 'rgba(255,255,255,0.9)',
        letterSpacing: 6,
    },
    smartText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 25,
        letterSpacing: 3,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 40,
    },
    footerLineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    footerLine: {
        width: 40,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 12,
    },
    footerIcon: {
        fontSize: 16,
        opacity: 0.7,
    },
    footerText: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    loadingContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    loadingTrack: {
        width: '80%',
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingBar: {
        height: '100%',
        backgroundColor: Colors.white,
        borderRadius: 2,
    },
    loadingLabel: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Regular,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
    }
});
