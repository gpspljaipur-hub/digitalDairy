import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from './Colors'
import Fonts from './fonts'

interface HeaderProps {
    title?: string;
    showNotification?: boolean;
    onNotificationPress?: () => void;
    showProfile?: boolean;
    onProfilePress?: () => void;
    profileImage?: any;
    showBack?: boolean;
    onBack?: () => void;
    rightIcon?: string;
    onRightIconPress?: () => void;
    subtitle?: string;
    titleStyle?: any;
}

const Header = ({
    title = 'School Portal',
    showNotification = true,
    onNotificationPress,
    showProfile = false,
    onProfilePress,
    profileImage,
    showBack = false,
    onBack,
    rightIcon,
    onRightIconPress,
    subtitle,
    titleStyle
}: HeaderProps) => {
    const navigation = useNavigation<any>();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigation.goBack();
        }
    };

    const handleNotificationPress = () => {
        if (onNotificationPress) {
            onNotificationPress();
        } else {
            navigation.navigate('Notification');
        }
    };

    const handleProfilePress = () => {
        if (onProfilePress) {
            onProfilePress();
        } else {
            navigation.navigate('Profile');
        }
    };

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {showBack && (
                    <TouchableOpacity onPress={handleBack} style={styles.backBtn} activeOpacity={0.7}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                )}
                {showProfile && (
                    <TouchableOpacity onPress={handleProfilePress} style={styles.avatarContainer}>
                        {profileImage ? (
                            <Image source={profileImage} style={styles.avatarImage} />
                        ) : (
                            <Text style={styles.avatarEmoji}>👨‍🏫</Text>
                        )}
                    </TouchableOpacity>
                )}
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={[styles.headerTitle, titleStyle]}>{title}</Text>
                    {subtitle && <Text numberOfLines={1} style={styles.headerSubtitle}>{subtitle}</Text>}
                </View>
            </View>

            <View style={styles.headerRight}>
                {rightIcon ? (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.notificationBtn}>
                        <Text style={styles.bellIcon}>{rightIcon}</Text>
                    </TouchableOpacity>
                ) : showNotification && (
                    <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationBtn}>
                        <Text style={styles.bellIcon}>🔔</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    titleContainer: {
        flex: 1,
    },
    avatarContainer: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarEmoji: {
        fontSize: 18,
    },
    headerTitle: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    headerSubtitle: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: -2,
    },
    backBtn: {
        paddingRight: 12,
        paddingVertical: 5,
    },
    backIcon: {
        fontSize: 22,
        color: Colors.primary,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationBtn: {
        padding: 6,
    },
    bellIcon: {
        fontSize: 20,
    },
})

