import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../Redux/Reducers/Userslice';
import { RootState } from '../../Redux/Store/Store';
import useStrings from '../../comman/useStrings';

const { width } = Dimensions.get('window');

const LanguageSelection = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const Strings = useStrings();
    const selectedLanguage = useSelector((state: RootState) => state.user.language);

    const languages = [
        { id: 'en', label: 'English', icon: 'A' },
        { id: 'hi', label: 'Hindi (हिन्दी)', icon: 'अ' },
        { id: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)', icon: 'ਅ' },
    ];

    const handleLanguageSelect = (langId: any) => {
        dispatch(setLanguage(langId));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.headerIconContainer}>
                        <Text style={styles.headerIcon}>🌐</Text>
                    </View>
                    <Text style={styles.headerTitle}>{Strings.selectLanguage}</Text>
                </View>
                <TouchableOpacity style={styles.helpButton}>
                    <Text style={styles.helpIcon}>❓</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeSection}>
                    <View style={styles.logoWrapper}>
                        <Text style={styles.logoIcon}>🎓</Text>
                    </View>
                    <Text style={styles.welcomeText}>{Strings.welcome}</Text>
                    <Text style={styles.welcomeSubtitle}>
                        {Strings.languageWelcomeSubtitle}
                    </Text>
                </View>

                <View style={styles.languageContainer}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.id}
                            style={[
                                styles.languageCard,
                                selectedLanguage === lang.id && styles.selectedCard
                            ]}
                            activeOpacity={0.7}
                            onPress={() => handleLanguageSelect(lang.id)}
                        >
                            <View style={[
                                styles.langIconWrapper,
                                selectedLanguage === lang.id && styles.selectedIconWrapper
                            ]}>
                                <Text style={styles.langIcon}>{lang.icon}</Text>
                            </View>
                            <Text style={[
                                styles.langLabel,
                                selectedLanguage === lang.id && styles.selectedLangLabel
                            ]}>{lang.label}</Text>
                            {selectedLanguage === lang.id ? (
                                <View style={styles.checkCircle}>
                                    <Text style={styles.checkMark}>✓</Text>
                                </View>
                            ) : (
                                <Text style={styles.chevron}>›</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>


                <View style={styles.accessibilityBox}>
                    <Text style={styles.accessTitle}>{Strings.accessibility}</Text>
                    <Text style={styles.accessText}>
                        {Strings.accessibilityDesc}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('WelcomeScreen')}
                >
                    <Text style={styles.continueButtonText}>{Strings.continue}</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.portalCard} activeOpacity={0.9}>
                    <View style={styles.portalContent}>
                        <View style={styles.portalIconWrapper}>
                            <Text style={styles.portalIcon}>👤</Text>
                        </View>
                        <Text style={styles.portalText}>{Strings.studentPortal}</Text>
                    </View>
                    <View style={styles.portalDecor1} />
                    <View style={styles.portalDecor2} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LanguageSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconContainer: {
        marginRight: 12,
    },
    headerIcon: {
        fontSize: 22,
        color: '#2563EB',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#2563EB',
    },
    helpButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpIcon: {
        fontSize: 20,
        color: '#64748B',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    welcomeSection: {
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 30,
    },
    logoWrapper: {
        width: 85,
        height: 85,
        backgroundColor: '#E0E7FF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    logoIcon: {
        fontSize: 42,
    },
    welcomeText: {
        fontSize: 22,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E293B',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 15,
    },
    languageContainer: {
        gap: 16,
    },
    languageCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
    },
    selectedCard: {
        borderColor: '#2563EB',
        backgroundColor: '#F0F7FF',
        borderWidth: 2,
    },
    langIconWrapper: {
        width: 48,
        height: 48,
        backgroundColor: '#EEF2FF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    selectedIconWrapper: {
        backgroundColor: '#2563EB',
    },
    langIcon: {
        fontSize: 22,
    },
    langLabel: {
        flex: 1,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#334155',
    },
    selectedLangLabel: {
        color: '#2563EB',
        fontFamily: Fonts.Lexend_SemiBold,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMark: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    chevron: {
        fontSize: 24,
        color: '#94A3B8',
        marginLeft: 10,
    },
    accessibilityBox: {
        backgroundColor: '#074799',
        padding: 24,
        borderRadius: 16,
        marginTop: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    accessTitle: {
        fontSize: 18,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.white,
        marginBottom: 10,
    },
    accessText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 24,
    },
    continueButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        elevation: 4,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    continueButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
    },
    portalCard: {
        marginTop: 30,
        backgroundColor: '#DDE4F0',
        borderRadius: 24,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    portalContent: {
        alignItems: 'center',
        zIndex: 2,
    },
    portalIconWrapper: {
        width: 64,
        height: 64,
        backgroundColor: '#074799',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        elevation: 6,
        shadowColor: '#000',
    },
    portalIcon: {
        fontSize: 32,
        color: Colors.white,
    },
    portalText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#074799',
    },
    portalDecor1: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 50,
    },
    portalDecor2: {
        position: 'absolute',
        top: -30,
        left: -10,
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 60,
    }
});
