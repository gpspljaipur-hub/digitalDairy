import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../comman/Colors'
import StringsRaw from '../comman/String'
import Fonts from '../comman/fonts'
import FontsSize from '../comman/FontsSize'

const Strings = StringsRaw.en

const ParentBottom = ({ activeTab = 'HOME' }: { activeTab?: string }) => {
    const navigation = useNavigation<any>()

    const tabs = [
        { id: 'HOME', label: 'Home', icon: '🏠', screen: 'ParentDashboard' },
        { id: 'MESSAGES', label: 'Messages', icon: '💬', screen: 'Chat_Screen' },
        { id: 'NOTICE', label: 'Notices', icon: '📢', screen: 'NoticeScreen' },
        { id: 'PROFILE', label: 'Profile', icon: '👤', screen: 'Profile' },
    ]

    const handlePress = (tab: any) => {
        if (tab.screen && activeTab !== tab.id) {
            navigation.navigate(tab.screen)
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tabItem}
                            activeOpacity={0.8}
                            onPress={() => handlePress(tab)}
                        >
                            <View style={[
                                styles.iconContainer,
                                isActive && styles.activeIconContainer
                            ]}>
                                <Text style={[styles.icon, isActive && styles.activeIcon]}>
                                    {tab.icon}
                                </Text>
                            </View>
                            <Text style={[styles.label, isActive && styles.activeLabel]}>
                                {tab.label}
                            </Text>
                            {isActive && <View style={styles.activeDot} />}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default ParentBottom

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 85,
        elevation: 25,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 46,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    activeIconContainer: {
        backgroundColor: Colors.primaryLight,
    },
    icon: {
        fontSize: 22,
        opacity: 0.85, 
    },
    activeIcon: {
        opacity: 1,
    },
    label: {
        fontSize: 10,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        letterSpacing: 0.2,
    },
    activeLabel: {
        color: Colors.primary,
        fontFamily: Fonts.LexendBold,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: Colors.primary,
        marginTop: 4,
        position: 'absolute',
        bottom: -8,
    },
})



