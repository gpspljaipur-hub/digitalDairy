import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import ParentBottom from '../../Component/ParentBottom';
import useStrings from '../../comman/useStrings';
import { useSelector } from 'react-redux';
import { Auth_ApiRequest } from '../../Lib/ApiService/ApiRequest';
import ApiUrl from '../../Lib/ApiService/ApiUrl';
import Helper from '../../Lib/HelperFiles/Helper';
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper';
import Config from '../../Lib/ApiService/Config';
import { loginParentSuccess, setUserType } from '../../Redux/Reducers/Userslice';
import { useDispatch } from 'react-redux';

const EditProfile = () => {
    const dispatch = useDispatch();
    const strings = useStrings();
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const parentData = parent?.data || parent || {};
    const [fullName, setFullName] = useState(parentData.parentName);
    const [mobileNumber, setMobileNumber] = useState(parentData.mobile);
    const [email, setEmail] = useState(parentData.email);
    const [address, setAddress] = useState(parentData.address || '');
    const [loading, setLoading] = useState(false);

    const onUpdateProfile = async () => {
        const payload = {
            mobile: mobileNumber,
            parentName: fullName,
            studentFullName: parentData.studentFullName || '',
            classId: parentData.classId?._id || parentData.classId || '',
            schoolId: parentData.schoolId?._id || parentData.schoolId || '',
            relationId: parentData.relationId?._id || parentData.relationId || '',
            studentId: parentData.studentId?._id || parentData.studentId || parentData._id || '',
            email: email,
            address: address
        };
        setLoading(true);
        try {
            const res = await Auth_ApiRequest(ApiUrl.RegisterUpdate, payload);
            if (res) {
                await AsyncStorageHelper.setData(Config.USER_DATA, res);
                await AsyncStorageHelper.setData(Config.TOKEN, res);
                await AsyncStorageHelper.setData(Config.ROLE, 'parent');
                dispatch(loginParentSuccess(res));
                dispatch(setUserType('parent'));
                Helper.showToast('Profile updated successfully');
                navigation.goBack();
            } else {
                Helper.showToast(res?.message || 'Failed to update profile');
                navigation.goBack(); // Still go back on success masquerading as failure if status check differs
            }
        } catch (error) {
            console.error("Update profile error:", error);
            Helper.showToast('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper scroll={false} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{strings.editProfile}</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Profile Photo Section */}
                <View style={styles.profileSection}>
                    <View style={styles.imageWrapper}>
                        <View style={styles.profileImagePlaceholder}>
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg' }}
                                style={styles.profileImage}
                            />
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.editIcon}>✎</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.changePhotoText}>{strings.changeProfilePhoto}</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{strings.parentFullName || 'Full Name'}</Text>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{strings.mobileNumber}</Text>
                        <TextInput
                            style={styles.input}
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{strings.email}</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{strings.address}</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={address}
                            onChangeText={setAddress}
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveBtn} onPress={onUpdateProfile} disabled={loading}>
                        <View style={styles.saveBtnContent}>
                            <View style={styles.checkCircle}>
                                <Text style={styles.checkIcon}>✓</Text>
                            </View>
                            <Text style={styles.saveBtnText}>{loading ? "Updating..." : strings.saveChanges}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelBtnText}>{strings.cancel}</Text>
                    </TouchableOpacity>
                </View>

                {/* Info Message */}
                <View style={styles.infoBox}>
                    <View style={styles.infoIconCircle}>
                        <Text style={styles.infoIcon}>i</Text>
                    </View>
                    <Text style={styles.infoText}>
                        {strings.editProfileInfoMsg}
                    </Text>
                </View>

                {/* Extra space for bottom nav */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <ParentBottom activeTab="PROFILE" />
        </ScreenWrapper>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 1,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backBtn: {
        padding: 5,
        zIndex: 1,
    },
    backIcon: {
        fontSize: 24,
        color: '#0056B3',
        fontWeight: 'bold',
    },
    headerTitleContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    headerLogoContainer: {
        marginLeft: 'auto',
    },
    headerLogo: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#0056B3',
    },
    scrollContent: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#000', // Dark background as seen in the image
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    editBtn: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#0056B3',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
        elevation: 4,
    },
    editIcon: {
        fontSize: 16,
        color: Colors.white,
    },
    changePhotoText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#0056B3',
    },
    form: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1E293B',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        gap: 12,
        marginBottom: 30,
    },
    saveBtn: {
        backgroundColor: '#0056B3',
        borderRadius: 4,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkIcon: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    saveBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    cancelBtn: {
        backgroundColor: '#DDE6ED',
        borderRadius: 4,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelBtnText: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#0056B3',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#EBF2FF',
        borderRadius: 4,
        padding: 15,
        alignItems: 'center',
    },
    infoIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#0056B3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoIcon: {
        color: '#0056B3',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#475569',
        lineHeight: 18,
    },
});
