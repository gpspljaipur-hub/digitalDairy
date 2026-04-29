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
        { id: 'HOME', label: Strings.home.toUpperCase(), icon: '🏠', screen: 'ParentDashboard' },
        { id: 'MESSAGES', label: Strings.messages.toUpperCase(), icon: '💬', screen: '' },
        { id: 'NOTICE', label: 'NOTICES', icon: '📢', screen: 'NoticeScreen' },
        { id: 'PROGRESS', label: 'PROGRESS', icon: '📊', screen: '' },
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
                        style={[styles.tabItem, isActive && styles.activeTabItem]}
                        activeOpacity={0.7}
                        onPress={() => handlePress(tab)}
                    >
                        <Text style={[styles.icon, isActive && styles.activeIcon]}>
                            {tab.icon}
                        </Text>
                        <Text style={[styles.label, isActive && styles.activeLabel]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ParentBottom

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F9FBFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEF2F6',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 12,
        marginHorizontal: 5,
    },
    activeTabItem: {
        backgroundColor: '#F0F5FF',
    },
    icon: {
        fontSize: 20,
        marginBottom: 4,
        opacity: 0.6,
    },
    activeIcon: {
        opacity: 1,
    },
    label: {
        fontSize: 10,
        fontFamily: Fonts.LexendBold,
        color: '#64748B',
        letterSpacing: 0.5,
    },
    activeLabel: {
        color: '#2563EB',
        fontFamily: Fonts.LexendBold,
    },
})
