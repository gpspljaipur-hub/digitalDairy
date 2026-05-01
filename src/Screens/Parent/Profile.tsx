import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import ParentBottom from '../../Component/ParentBottom';
import Helper from '../../Lib/HelperFiles/Helper';
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper';
import Config from '../../Lib/ApiService/Config';
import { logout } from '../../Redux/Reducers/Userslice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStrings from '../../comman/useStrings';

const Profile = () => {
    const strings = useStrings();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const [profileDetails, setProfileDetails] = useState<any>()
    useEffect(() => {
        const getRole = async () => {
            const role = await AsyncStorageHelper.getData(Config.USER_DATA);
            setProfileDetails(role)
        };

        getRole();
    }, []);

    const menuItems = [
        {
            title: strings.personalDetails,
            subtitle: strings.personalDetailsSubtitle,
            icon: '👤',
            onPress: () => navigation.navigate('ParentDetails', {
                profileDetails
            }),
            showChevron: true,
        },
        {
            title: strings.switchRoleToTeacher,
            subtitle: '',
            icon: '🔄',
            onPress: () => navigation.navigate('Welcomeback'),
            showChevron: false,
        },
        {
            title: strings.language,
            subtitle: strings.language || 'English',
            icon: '🌐',
            onPress: () => navigation.navigate('LanguageSelection'),
            showChevron: false,
        },
        {
            title: strings.helpSupport,
            subtitle: strings.helpSupportSubtitle,
            icon: '❓',
            onPress: () => navigation.navigate('FAQScreen'),
            showExternal: true,
        },
    ];

    const LogoutFun = async () => {
        await AsyncStorageHelper.removeItemValue(Config.USER_DATA);
        await AsyncStorageHelper.removeItemValue(Config.TOKEN);
        await AsyncStorageHelper.removeItemValue(Config.ROLE);
        dispatch(logout());
        Helper.showToast(strings.logout);
        navigation.navigate('Welcomeback');
    }

    return (
        <ScreenWrapper scroll={false} style={styles.container}>
            <Header
                title={strings.account}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
                rightIcon="⚙️"
                onRightIconPress={() => { }}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.imageWrapper}>
                        <View style={styles.profileImagePlaceholder}>
                            <Text style={styles.profileEmoji}>👨‍💼</Text>
                        </View>
                        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.editIcon}>✏️</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{profileDetails?.parentName || 'Parent'}</Text>
                    {/* <View style={styles.roleRow}>
                        <Text style={styles.roleIcon}>👥</Text>
                        <Text style={styles.roleText}>{profileDetails?.className?.name}</Text>
                    </View> */}
                </View>

                {/* Menu List */}
                <View style={styles.menuList}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                            <View style={styles.menuIconBox}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                {item.subtitle ? <Text style={styles.menuSubtitle}>{item.subtitle}</Text> : null}
                            </View>
                            {item.showChevron && <Text style={styles.chevron}>›</Text>}
                            {item.showExternal && <Text style={styles.externalIcon}>↗️</Text>}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutBtn} onPress={() => { LogoutFun() }}>
                    <Text style={styles.logoutIcon}>🚪</Text>
                    <Text style={styles.logoutText}>{strings.logout}</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>App Version 2.4.0 (Build 892)</Text>

                {/* Extra space for bottom nav */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <ParentBottom activeTab="PROFILE" />
        </ScreenWrapper>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
    },
    scrollContent: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 35,
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 20,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    profileEmoji: {
        fontSize: 60,
    },
    editBtn: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#2563EB',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
        elevation: 5,
    },
    editIcon: {
        fontSize: 14,
        color: Colors.white,
    },
    userName: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 5,
    },
    roleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roleIcon: {
        fontSize: 16,
        marginRight: 8,
        opacity: 0.7,
    },
    roleText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    menuList: {
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    menuIconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuIcon: {
        fontSize: 20,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#334155',
    },
    menuSubtitle: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#94A3B8',
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: '#94A3B8',
    },
    externalIcon: {
        fontSize: 18,
        color: '#94A3B8',
    },
    logoutBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#EF4444',
        marginBottom: 25,
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    logoutText: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#EF4444',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        marginBottom: 20,
    },
});
