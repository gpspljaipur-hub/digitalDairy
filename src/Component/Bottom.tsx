import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../comman/Colors'
import StringsRaw from '../comman/String'
import Fonts from '../comman/fonts'
import FontsSize from '../comman/FontsSize'

const Strings = StringsRaw.en

const BottomTab = ({ activeTab = 'HOME' }: { activeTab?: string }) => {
    const tabs = [
        { id: 'HOME', label: Strings.home, icon: '🏠' },
        { id: 'MESSAGES', label: Strings.messages, icon: '✉️' },
        { id: 'SCHEDULE', label: Strings.schedule, icon: '📅' },
        { id: 'ACCOUNT', label: Strings.account, icon: '👤' },
    ]

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                            <Text style={[styles.icon, isActive && styles.activeIcon]}>
                                {tab.icon}
                            </Text>
                        </View>
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
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 40,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 2,
    },
    activeIconContainer: {
        backgroundColor: Colors.primaryLight,
    },
    icon: {
        fontSize: 22,
        color: '#A0A0A0',
    },
    activeIcon: {
        color: Colors.primary,
    },
    label: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Medium,
        color: '#8E8E93',
    },
    activeLabel: {
        color: Colors.primary,
        fontFamily: Fonts.Lexend_SemiBold,
    },
})
