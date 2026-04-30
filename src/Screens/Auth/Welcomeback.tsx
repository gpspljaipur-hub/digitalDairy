import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Strings from '../../comman/String'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import { Alert, ActivityIndicator } from 'react-native'
import Helper from '../../Lib/HelperFiles/Helper'
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper'
import Config from '../../Lib/ApiService/Config'
import { useDispatch } from 'react-redux'
import { loginTeacherSuccess, setUserType } from '../../Redux/Reducers/Userslice'
import validate from '../../Lib/HelperFiles/validation/validate_wrapper'

const Welcomeback = ({ navigation }: any) => {
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [mobileError, setMobileError] = useState('')
    const dispatch = useDispatch()

    const checkValidation = () => {
        if (role === 'teacher') {
            const emailErr = validate('email', email);
            const passwordErr = validate('password', password);
            setEmailError(emailErr);
            setPasswordError(passwordErr);
            return !emailErr && !passwordErr;
        } else {
            const mobileErr = validate('mobile', mobile);
            setMobileError(mobileErr);
            return !mobileErr;
        }
    };

    const handleSendOtp = async () => {
        if (!role) {
            Helper.showToast('Please select a role');
            return;
        }

        if (!checkValidation()) {
            return;
        }

        setLoading(true);
        try {
            if (role === 'teacher') {
                const res = await Auth_ApiRequest(ApiUrl.TeacherLogin, {
                    email: email,
                    password: password,
                });

                console.log('Teacher Login Response:', res);

                if (res && !res.error) {
                    await AsyncStorageHelper.setData(Config.USER_DATA, res.user);
                    dispatch(loginTeacherSuccess(res.teacher));
                    dispatch(setUserType(role));
                    navigation.navigate('Dashboard');
                } else {
                    Helper.showToast(res?.message || 'Invalid credentials');
                }
            } else {
                const res = await Auth_ApiRequest(ApiUrl.SendOtp, {
                    phone: mobile,
                });

                console.log('Send OTP Response:', res);

                if (res && !res.error) {
                    navigation.navigate('OTPVerification', {
                        mobile: mobile,
                        role: role,
                        otp: res.otp
                    });
                } else {
                    Helper.showToast(res?.message);
                }
            }
        } catch (error) {
            console.error('Auth Error:', error);
            Helper.showToast('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const s = Strings.en;

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerIcon}>🏛️</Text>
                    <Text style={styles.headerTitle}>{s.eduPortal}</Text>
                </View>
            </View>

            <View style={styles.content}>
                {/* Hero Icon */}
                <View style={styles.heroIconContainer}>
                    <View style={styles.iconBox}>
                        <Text style={styles.bookIcon}>📖</Text>
                    </View>
                </View>

                {/* Welcome Text */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTitle}>{s.welcomeBack}</Text>
                    <Text style={styles.welcomeSubtitle}>{s.welcomeBackSubtitle}</Text>
                </View>

                {/* Role Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>{s.chooseRole}</Text>
                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                            style={[styles.roleCard, role === 'parent' && styles.activeRoleCard]}
                            onPress={() => setRole('parent')}
                        >
                            <View style={styles.roleIconWrapper}>
                                <Text style={[styles.roleIcon, role === 'parent' && styles.activeRoleIcon]}>🧬</Text>
                            </View>
                            <Text style={[styles.roleText, role === 'parent' && styles.activeRoleText]}>{s.parent}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.roleCard, role === 'teacher' && styles.activeRoleCard]}
                            onPress={() => setRole('teacher')}
                        >
                            <View style={styles.roleIconWrapper}>
                                <Text style={[styles.roleIcon, role === 'teacher' && styles.activeRoleIcon]}>🎓</Text>
                            </View>
                            <Text style={[styles.roleText, role === 'teacher' && styles.activeRoleText]}>{s.teacher}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Conditional Input Section */}
                {role === 'teacher' ? (
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>{s.email}</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={styles.input}
                                placeholder={s.emailPlaceholder}
                                placeholderTextColor={Colors.lightGreyText}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (emailError) setEmailError('');
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <Text style={[styles.label, { marginTop: emailError ? 10 : 20 }]}>{s.password}</Text>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                style={styles.input}
                                placeholder={s.passwordPlaceholder}
                                placeholderTextColor={Colors.lightGreyText}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (passwordError) setPasswordError('');
                                }}
                                secureTextEntry
                            />
                        </View>
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    </View>
                ) : (
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>{s.mobileNumber}</Text>
                        <View style={[styles.mobileInputContainer]}>
                            <View style={styles.countryCodeBox}>
                                <Text style={styles.countryCode}>{s.countryCode}</Text>
                            </View>
                            <TextInput
                                style={styles.mobileInput}
                                placeholder={s.mobilePlaceholder}
                                placeholderTextColor={Colors.lightGreyText}
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={mobile}
                                onChangeText={(text) => {
                                    setMobile(text);
                                    if (mobileError) setMobileError('');
                                }}
                            />
                        </View>
                        {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
                        <Text style={styles.otpNote}>{s.otpNote}</Text>
                    </View>
                )}

                {/* Login/Send OTP Button */}
                <TouchableOpacity
                    style={[styles.sendOtpBtn, loading && { opacity: 0.7 }]}
                    onPress={handleSendOtp}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.white} />
                    ) : (
                        <>
                            <Text style={styles.sendOtpText}>{role === 'teacher' ? s.login : s.sendOTP}</Text>
                            <Text style={styles.btnArrow}>→</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Security Card */}
                <View style={styles.securityCard}>
                    <Text style={styles.shieldIcon}>🛡️</Text>
                    <Text style={styles.securityText}>{s.dataSafeNote}</Text>
                </View>

                {/* Help Link */}
                <TouchableOpacity style={styles.helpLink}>
                    <Text style={styles.helpLinkText}>{s.helpLoggingIn}</Text>
                </TouchableOpacity>

                {/* Footer Links */}
                <View style={styles.footer}>
                    <Text style={styles.footerLink}>{s.privacy}</Text>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcomeback

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 20,
        marginRight: 8,
        color: '#2563EB',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#2563EB',
    },
    headerRightText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#2563EB',
        letterSpacing: 1,
    },
    content: {
        paddingHorizontal: 25,
        paddingTop: 30,
        paddingBottom: 40,
    },
    heroIconContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    iconBox: {
        width: 80,
        height: 80,
        backgroundColor: '#DBEAFE',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookIcon: {
        fontSize: 40,
        color: '#1E40AF',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 35,
    },
    welcomeTitle: {
        fontSize: 28,
        fontFamily: Fonts.LexendBold,
        color: '#0F172A',
        marginBottom: 10,
    },
    welcomeSubtitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    section: {
        marginBottom: 30,
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#0F172A',
        marginBottom: 15,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    roleCard: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingVertical: HWSize.H_Height12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    activeRoleCard: {
        borderColor: '#2563EB',
        backgroundColor: '#EFF6FF',
        borderWidth: 2,
    },
    roleIconWrapper: {
        marginBottom: 12,
    },
    roleIcon: {
        fontSize: 32,
        color: '#64748B',
    },
    activeRoleIcon: {
        color: '#2563EB',
    },
    roleText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#64748B',
    },
    activeRoleText: {
        color: '#2563EB',
    },
    inputSection: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#0F172A',
        marginBottom: 10,
    },
    mobileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        overflow: 'hidden',
        height: 55, // Fixed height for container
    },
    countryCodeBox: {
        paddingHorizontal: 15,
        borderRightWidth: 1,
        borderRightColor: '#D1D5DB',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
    },
    countryCode: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#334155',
    },
    mobileInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#0F172A',
    },
    otpNote: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        overflow: 'hidden',
        height: 55,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#0F172A',
    },
    sendOtpBtn: {
        flexDirection: 'row',
        backgroundColor: '#0056D2',
        height: 58,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sendOtpText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginRight: 10,
    },
    btnArrow: {
        fontSize: 22,
        color: Colors.white,
    },
    securityCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    shieldIcon: {
        fontSize: 20,
        color: '#1E40AF',
        marginRight: 12,
    },
    securityText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1E40AF',
        lineHeight: 18,
    },
    helpLink: {
        alignItems: 'center',
        marginBottom: 30,
    },
    helpLinkText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#2563EB',
        textDecorationLine: 'underline',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: HWSize.W_Width20,
    },
    footerLink: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    errorText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#EF4444',
        marginTop: 5,
        marginLeft: 5,
    },
    errorInput: {
        borderColor: '#EF4444',
        borderWidth: 1.5,
    },
})