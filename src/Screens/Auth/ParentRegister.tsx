import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import Strings from '../../comman/String'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const ParentRegister = ({ navigation }: any) => {
    const [fullName, setFullName] = useState('')
    const [mobile, setMobile] = useState('')
    const [relationship, setRelationship] = useState('')
    const [isPickerVisible, setIsPickerVisible] = useState(false)

    const s = Strings.en;

    const relationships = [
        { id: '1', name: s.father },
        { id: '2', name: s.mother },
        { id: '3', name: s.guardian },
        { id: '4', name: s.other },
    ];

    return (
        <ScreenWrapper scroll={true} style={styles.container}>
            <Header
                title={s.parentRegistration}
                showBack={true}
                onBack={() => navigation?.goBack()}
                showNotification={false}
                showProfile={false}
            />

            <View style={styles.content}>
                {/* Progress Section */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressTextRow}>
                        <Text style={styles.stepText}>{s.step2of2}</Text>
                        <Text style={styles.percentageText}>{s.hundredPercentComplete}</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{s.parentGuardianInfo}</Text>
                    <Text style={styles.subtitle}>{s.parentRegistrationSubtitle}</Text>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{s.parentFullName}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={s.parentFullNamePlaceholder}
                            placeholderTextColor={Colors.lightGreyText}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{s.mobileNumber}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={s.mobilePlaceholder}
                            placeholderTextColor={Colors.lightGreyText}
                            value={mobile}
                            onChangeText={setMobile}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{s.relationshipToStudent}</Text>
                        <TouchableOpacity
                            style={[styles.dropdown, isPickerVisible && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                            onPress={() => setIsPickerVisible(!isPickerVisible)}
                        >
                            <Text style={[styles.dropdownText, !relationship && { color: Colors.lightGreyText }]}>
                                {relationship || s.selectRelationship}
                            </Text>
                            <Text style={styles.dropdownIcon}>{isPickerVisible ? '⌃' : '⌄'}</Text>
                        </TouchableOpacity>

                        {isPickerVisible && (
                            <View style={styles.dropdownList}>
                                {relationships.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.option}
                                        onPress={() => {
                                            setRelationship(item.name);
                                            setIsPickerVisible(false);
                                        }}
                                    >
                                        <Text style={styles.optionText}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                {/* Data Protection Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>
                        <Text style={{ fontSize: 24 }}>🔒</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>{s.dataProtection}</Text>
                        <Text style={styles.infoDesc}>{s.dataProtectionNote}</Text>
                    </View>
                </View>

                {/* Complete Button */}
                <TouchableOpacity
                    style={styles.completeBtn}
                    onPress={() => navigation.navigate('ParentDashboard')}
                >
                    <Text style={styles.completeBtnText}>{s.completeRegistration}</Text>
                </TouchableOpacity>

                {/* Building Image */}
                <Image
                    source={require('../../assets/WelcomeSchool.png')}
                    style={styles.buildingImage}
                    resizeMode="cover"
                />
            </View>
        </ScreenWrapper>
    )
}

export default ParentRegister

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    progressContainer: {
        marginBottom: 25,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    stepText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    percentageText: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1E40AF',
        borderRadius: 4,
    },
    titleSection: {
        marginBottom: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#4B5563',
        lineHeight: 22,
    },
    form: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Medium,
        color: '#1F2937',
        marginBottom: 8,
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
        backgroundColor: Colors.white,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 52,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
    },
    dropdownText: {
        fontSize: 16,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
    },
    dropdownIcon: {
        fontSize: 20,
        color: '#6B7280',
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: Colors.white,
        overflow: 'hidden',
    },
    option: {
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    optionText: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    infoIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
        marginBottom: 4,
    },
    infoDesc: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#4B5563',
        lineHeight: 18,
    },
    completeBtn: {
        backgroundColor: '#0056D2',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    completeBtnText: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
    },
    buildingImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 10,
    },
})