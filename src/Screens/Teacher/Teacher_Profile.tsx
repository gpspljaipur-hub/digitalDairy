import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import { useNavigation } from '@react-navigation/native'
import useStrings from '../../comman/useStrings'
import { useSelector } from 'react-redux'
import Header from '../../comman/Header'
import HWSize from '../../comman/HWSize'
import FontsSize from '../../comman/FontsSize'
import Config from '../../Lib/ApiService/Config'
import AsyncStorageHelper from '../../Lib/HelperFiles/AsyncStorageHelper'
import { logout } from '../../Redux/Reducers/Userslice'
import { useDispatch } from 'react-redux'
import Helper from '../../Lib/HelperFiles/Helper'

const Teacher_Profile = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { teacher } = useSelector((state: any) => state.user);
    const strings = useStrings();

    const handleLogout = async () => {
        await AsyncStorageHelper.removeItemValue(Config.USER_DATA);
        await AsyncStorageHelper.removeItemValue(Config.TOKEN);
        await AsyncStorageHelper.removeItemValue(Config.ROLE);
        dispatch(logout());
        Helper.showToast('Logout Success');
        navigation.reset({ index: 0, routes: [{ name: 'Welcomeback' }], });
    }

    return (
        <ScreenWrapper style={styles.container}>
            <Header
                title={strings.account}
                showBack={true}
                showNotification={false}
            />

            <View style={styles.content}>
                {/* Profile Header Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarCircle}>
                            <Text style={styles.avatarEmoji}>👨‍🏫</Text>
                        </View>
                        <TouchableOpacity style={styles.editAvatarBtn} activeOpacity={0.8}>
                            <Text style={styles.editEmoji}>✏️</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.teacherName}>{teacher?.name || 'Teacher'}</Text>
                    <Text style={styles.designation}>{teacher?.subject ? `${teacher.subject} Teacher` : "Teacher"}</Text>
                    <View style={styles.badgeContainer}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>ID: {teacher?._id ? teacher._id.substring(teacher._id.length - 6).toUpperCase() : "T-1000"}</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{teacher?.experience || '5+'}</Text>
                        <Text style={styles.statLabel}>Years Exp.</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>1</Text>
                        <Text style={styles.statLabel}>Class</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{teacher?.subject || 'All'}</Text>
                        <Text style={styles.statLabel}>Subject</Text>
                    </View>
                </View>

                {/* Info Sections */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    <View style={styles.infoCard}>
                        <InfoRow emoji="📧" label="Email" value={teacher?.email || 'N/A'} />
                        <InfoRow emoji="📱" label="Phone" value={teacher?.phone || teacher?.mobile || 'N/A'} isLast />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Academic Info</Text>
                    <View style={styles.infoCard}>
                        <InfoRow emoji="📚" label="Subjects" value={teacher?.subject || 'N/A'} />
                        <InfoRow emoji="🎓" label="Qualification" value={teacher?.qualification || "B.Ed"} isLast />
                    </View>
                </View>

                {/* Actions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings & Actions</Text>
                    <View style={styles.actionCard}>
                        <ActionRow emoji="👤" label="Edit Profile" onPress={() => { }} />
                        <ActionRow emoji="🛡️" label="Privacy Policy" onPress={() => { }} />
                        <ActionRow emoji="🚪" label={strings.logoutLabel} onPress={handleLogout} color={Colors.red} isLast />
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

const InfoRow = ({ emoji, label, value, isLast }: any) => (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
        <View style={styles.infoIconBg}>
            <Text style={styles.infoEmoji}>{emoji}</Text>
        </View>
        <View style={styles.infoTextWrapper}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
)

const ActionRow = ({ emoji, label, onPress, color, isLast }: any) => (
    <TouchableOpacity
        style={[styles.actionRow, isLast && { borderBottomWidth: 0 }]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.actionLeft}>
            <View style={styles.actionIconBg}>
                <Text style={styles.actionEmoji}>{emoji}</Text>
            </View>
            <Text style={[styles.actionLabel, color && { color }]}>{label}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        padding: HWSize.W_Width20,
        paddingBottom: HWSize.H_Height40,
    },
    profileCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 6,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarEmoji: {
        fontSize: 50,
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: Colors.primary,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    editEmoji: {
        fontSize: 16,
    },
    teacherName: {
        fontSize: FontsSize.size24,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        marginBottom: 4,
    },
    designation: {
        fontSize: FontsSize.size16,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginBottom: 12,
    },
    badgeContainer: {
        flexDirection: 'row',
    },
    badge: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: FontsSize.size14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.primary,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    statCard: {
        backgroundColor: Colors.white,
        width: '31%',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statValue: {
        fontSize: FontsSize.size20,
        fontFamily: Fonts.LexendBold,
        color: Colors.primary,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: FontsSize.size12,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: FontsSize.size18,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
        marginBottom: 14,
        marginLeft: 4,
    },
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    infoIconBg: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    infoEmoji: {
        fontSize: 20,
    },
    infoTextWrapper: {
        flex: 1,
    },
    infoLabel: {
        fontSize: FontsSize.size12,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: FontsSize.size16,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textMain,
    },
    actionCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIconBg: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    actionEmoji: {
        fontSize: 18,
    },
    actionLabel: {
        fontSize: FontsSize.size14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textMain,
    },
    chevron: {
        fontSize: 22,
        color: '#CBD5E1',
        fontFamily: Fonts.Lexend_Regular,
    },
    footerText: {
        textAlign: 'center',
        fontSize: FontsSize.size12,
        fontFamily: Fonts.Lexend_Regular,
        color: Colors.textSecondary,
        marginTop: 10,
        marginBottom: 20,
    }
})

export default Teacher_Profile

