import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../comman/Colors'
import Fonts from '../comman/fonts'
import useStrings from '../comman/useStrings'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const BottomTab = ({ activeTab = 'HOME' }: { activeTab?: string }) => {
    const Strings = useStrings();
    const navigation = useNavigation<any>();

    const tabs = [
        { id: 'HOME', label: Strings.home, icon: '🏠', screen: 'Dashboard' },
        { id: 'MESSAGES', label: Strings.messages, icon: '✉️', screen: 'Chat_Screen' },
        { id: 'SCHEDULE', label: Strings.schedule, icon: '📅', screen: 'Schedule' },
        { id: 'ACCOUNT', label: Strings.account, icon: '👤', screen: 'Teacher_Profile' },
    ]

    const handlePress = (tab: any) => {
        if (tab.screen && activeTab !== tab.id) {
            navigation.navigate(tab.screen)
        }
    }

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                        onPress={() => handlePress(tab)}
                    >
                        <Animated.View style={[
                            styles.iconContainer,
                            isActive && styles.activeIconContainer,
                            {
                                transform: [{ scale: isActive ? 1.15 : 1 }]
                            }
                        ]}>
                            <Text style={[styles.icon, isActive && styles.activeIcon]}>
                                {tab.icon}
                            </Text>
                        </Animated.View>
                        <Text style={[styles.label, isActive && styles.activeLabel]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingBottom: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 42,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    activeIconContainer: {
        backgroundColor: Colors.primaryLight,
    },
    icon: {
        fontSize: 22,
        color: '#94A3B8',
    },
    activeIcon: {
        color: Colors.primary,
    },
    label: {
        fontSize: 10,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        marginTop: 4,
    },
    activeLabel: {
        color: Colors.primary,
        fontFamily: Fonts.Lexend_SemiBold,
    },
})
