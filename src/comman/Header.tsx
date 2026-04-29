import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from './Colors'
import Fonts from './fonts'
import HWSize from './HWSize'

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
}

const Header = ({
    title = 'School Portal',
    showNotification = true,
    onNotificationPress,
    showProfile = true,
    onProfilePress,
    profileImage,
    showBack = false,
    onBack,
    rightIcon,
    onRightIconPress
}: HeaderProps) => {
    const navigation = useNavigation<any>();

    const handleNotificationPress = () => {
        if (onNotificationPress) {
            onNotificationPress();
        } else {
            navigation.navigate('Notification');
        }
    };

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {showBack && (
                    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                )}
                {showProfile && (
                    <TouchableOpacity onPress={onProfilePress} style={styles.avatarContainer}>
                        {profileImage ? (
                            <Image source={profileImage} style={styles.avatarImage} />
                        ) : (
                            <Text style={styles.avatarEmoji}>👨‍🏫</Text>
                        )}
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

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
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: HWSize.W_Width20,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarEmoji: {
        fontSize: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
    },
    backBtn: {
        paddingRight: 15,
        paddingVertical: 5,
    },
    backIcon: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    notificationBtn: {
        padding: 8,
    },
    bellIcon: {
        fontSize: 22,
    },
})
