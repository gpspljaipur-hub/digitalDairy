import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import ParentBottom from '../../Component/ParentBottom';
import useStrings from '../../comman/useStrings';
import { useSelector } from 'react-redux';

const ParentDetails = () => {
    const strings = useStrings();
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const parentData = parent?.data || parent || {};

    return (
        <ScreenWrapper scroll={false} style={styles.container}>
            <Header
                title={strings.personalDetails}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.imageWrapper}>
                        <View style={styles.profileImagePlaceholder}>
                            <Text style={styles.profileEmoji}>👨‍💼</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedIcon}>✓</Text>
                        </View>
                    </View>
                    <Text style={styles.userName}>{parentData?.parentName || 'Parent Name'}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleIcon}>⚖️</Text>
                        <Text style={styles.roleText}>{strings.role}: {strings.parent}</Text>
                    </View>
                </View>

                {/* Contact Information */}
                <Text style={styles.sectionTitle}>{strings.contactInformation}</Text>
                <View style={styles.infoCard}>
                    <View style={styles.infoItem}>
                        <View style={styles.iconBox}>
                            <Text style={styles.icon}>📱</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>{strings.mobileNumber}</Text>
                            <Text style={styles.infoValue}>{parentData?.mobile || ''}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoItem}>
                        <View style={styles.iconBox}>
                            <Text style={styles.icon}>✉️</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>{strings.email}</Text>
                            <Text style={styles.infoValue}>{parentData?.email || ''}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoItem}>
                        <View style={styles.iconBox}>
                            <Text style={styles.icon}>📍</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>{strings.address}</Text>
                            <Text style={styles.infoValue}>{parentData?.address || ''}</Text>
                        </View>
                    </View>
                </View>

                {/* Linked Students */}
                <Text style={styles.sectionTitle}>{strings.linkedStudents}</Text>
                <TouchableOpacity style={styles.studentCard}>
                    <View style={styles.studentInfo}>
                        <View style={styles.studentImagePlaceholder}>
                            <Text style={styles.studentEmoji}>🧒</Text>
                        </View>
                        <View>
                            <Text style={styles.studentName}>{parentData?.studentFullName || 'Student Name'}</Text>
                            <Text style={styles.studentGrade}>{parentData?.classId?.name || 'N/A'}</Text>
                        </View>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                {/* Buttons */}
                <TouchableOpacity style={styles.editBtn}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <Text style={styles.editBtnIcon}>✏️</Text>
                    <Text style={styles.editBtnText}>{strings.editDetails}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signOutBtn} onPress={() => navigation.navigate('Splash')}>
                    <Text style={styles.signOutIcon}>🚪</Text>
                    <Text style={styles.signOutText}>{strings.signOut}</Text>
                </TouchableOpacity>

                {/* Space for bottom nav */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <ParentBottom activeTab="PROFILE" />
        </ScreenWrapper>
    );
};

export default ParentDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
    },
    scrollContent: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImagePlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 20,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileEmoji: {
        fontSize: 55,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#1E3A8A',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
    },
    verifiedIcon: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 8,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    roleIcon: {
        fontSize: 14,
        marginRight: 8,
    },
    roleText: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#4F46E5',
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: Fonts.LexendBold,
        color: '#64748B',
        marginBottom: 15,
        marginTop: 10,
        letterSpacing: 1,
    },
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 5,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 20,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: '#94A3B8',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#334155',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginHorizontal: 15,
    },
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 15,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    studentImagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    studentEmoji: {
        fontSize: 30,
    },
    studentName: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#334155',
    },
    studentGrade: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: '#94A3B8',
    },
    editBtn: {
        backgroundColor: '#0056B3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
    },
    editBtnIcon: {
        fontSize: 18,
        color: Colors.white,
        marginRight: 10,
    },
    editBtnText: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    signOutBtn: {
        backgroundColor: '#E2E8F0',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
    },
    signOutIcon: {
        fontSize: 18,
        marginRight: 10,
        opacity: 0.7,
    },
    signOutText: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#475569',
    },
});
