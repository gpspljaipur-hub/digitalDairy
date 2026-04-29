import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import Strings from '../../comman/String'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import { Alert, ActivityIndicator } from 'react-native'
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper'
import Config from '../../Lib/ApiService/Config'
import { useDispatch } from 'react-redux'
import { loginStudentSuccess, setUserType } from '../../Redux/Reducers/Userslice'

const OTPVerification = ({ navigation, route }: any) => {
    const { mobile, role, otp: receivedOtp } = route?.params || {};
    const dispatch = useDispatch();
    console.log('=====>>>', route?.params)
    const [otp, setOtp] = useState(['', '', '', '',])
    const [loading, setLoading] = useState(false)
    const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null])

    React.useEffect(() => {
        if (receivedOtp && receivedOtp.length === 4) {
            const otpArray = receivedOtp.split('');
            setOtp(otpArray);
        }
    }, [receivedOtp]);

    const s = Strings.en;

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) {
            value = value[value.length - 1];
        }

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Move to next input if value is entered
        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        // Move to previous input on backspace if current is empty
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 4) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const res = await Auth_ApiRequest(ApiUrl.VerifyOtp, { phone: mobile, otp: enteredOtp, });
            console.log('Verify OTP Response:', res);

            if (res && !res.error) {
                await AsyncStorageHelper.setData(Config.USER_DATA, res.user);
                const userData = res.user;
                dispatch(loginStudentSuccess(userData));
                dispatch(setUserType(role));
                navigation.navigate('ParentRegister');
            }

        } catch (error) {
            console.error('Verify OTP Error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <Header
                title={s.identityVerification}
                showBack={true}
                onBack={() => navigation?.goBack()}
                showNotification={false}
                showProfile={false}
            />

            <View style={styles.content}>

                <View style={styles.heroIconContainer}>
                    <View style={styles.iconBox}>
                        <Text style={styles.shieldIcon}>🛡️</Text>
                    </View>
                </View>


                <View style={styles.titleSection}>
                    <Text style={styles.title}>{s.verifyYourNumber}</Text>
                    <Text style={styles.subtitle}>{s.otpSubtitle}</Text>
                </View>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={ref => {
                                if (inputRefs.current) {
                                    inputRefs.current[index] = ref;
                                }
                            }}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={value => handleOtpChange(value, index)}
                            onKeyPress={e => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                    style={[styles.verifyBtn, loading && { opacity: 0.7 }]}
                    onPress={handleVerifyOtp}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.white} />
                    ) : (
                        <>
                            <Text style={styles.verifyBtnText}>{s.verifyProceed}</Text>
                            <Text style={styles.btnArrow}>→</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Resend Section */}
                <View style={styles.resendContainer}>
                    <Text style={styles.didntReceiveText}>{s.didntReceive}</Text>
                    <TouchableOpacity>
                        <Text style={styles.resendText}>{s.resendCode}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.secureContainer}>
                    <Text style={styles.lockIcon}>🔒</Text>
                    <Text style={styles.secureText}>{s.secureInstitutional}</Text>
                </View>

                {/* Help Cards */}
                <View style={styles.helpCard}>
                    <View style={styles.helpIconBox}>
                        <Text style={styles.helpIcon}>❓</Text>
                    </View>
                    <View style={styles.helpTextContainer}>
                        <Text style={styles.helpTitle}>{s.needHelp}</Text>
                        <Text style={styles.helpDesc}>{s.helpDesc}</Text>
                    </View>
                </View>

                <View style={styles.supportCard}>
                    <View style={styles.supportIconBox}>
                        <Text style={styles.supportIcon}>📞</Text>
                    </View>
                    <View style={styles.supportTextContainer}>
                        <Text style={styles.supportTitle}>{s.adminSupport}</Text>
                        <Text style={styles.supportDesc}>{s.availableHours}</Text>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default OTPVerification

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFC',
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
    shieldIcon: {
        fontSize: 40,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 35,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.LexendBold,
        color: '#0F172A',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpInput: {
        width: HWSize.W_Width50,
        height: 60,
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        textAlign: 'center',
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        color: '#0F172A',
    },
    verifyBtn: {
        flexDirection: 'row',
        backgroundColor: '#0056D2',
        height: 58,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    verifyBtnText: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginRight: 10,
    },
    btnArrow: {
        fontSize: 22,
        color: Colors.white,
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    didntReceiveText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginBottom: 10,
    },
    resendText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#1E40AF',
        textDecorationLine: 'underline',
    },
    secureContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        marginBottom: 30,
    },
    lockIcon: {
        fontSize: 16,
        marginRight: 8,
        color: '#94A3B8',
    },
    secureText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
    },
    helpCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 15,
    },
    helpIconBox: {
        width: 45,
        height: 45,
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    helpIcon: {
        fontSize: 20,
    },
    helpTextContainer: {
        flex: 1,
    },
    helpTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#0F172A',
        marginBottom: 4,
    },
    helpDesc: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        lineHeight: 18,
    },
    supportCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    supportIconBox: {
        width: 45,
        height: 45,
        backgroundColor: '#ECFDF5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    supportIcon: {
        fontSize: 20,
    },
    supportTextContainer: {
        flex: 1,
    },
    supportTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#0F172A',
        marginBottom: 4,
    },
    supportDesc: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
    },
})