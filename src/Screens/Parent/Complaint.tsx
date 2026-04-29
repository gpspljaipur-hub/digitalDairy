import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'

const Complaint = () => {
    const navigation = useNavigation<any>();
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const categories = [
        'Infrastructure',
        'Academic',
        'Staff Behavior',
        'Transport',
        'Fee Related',
        'Other'
    ];

    const recentComplaints = [
        {
            id: '1',
            category: 'Infrastructure',
            title: 'Broken window in Room 204',
            date: 'Oct 24, 2023',
            status: 'In Progress',
            statusColor: '#FBC02D',
            statusBg: '#FFFDE7',
            icon: '🏢'
        },
        {
            id: '2',
            category: 'Academic',
            title: 'Missing textbook materials',
            date: 'Oct 15, 2023',
            status: 'Resolved',
            statusColor: '#4CAF50',
            statusBg: '#E8F5E9',
            icon: '📖'
        },
        {
            id: '3',
            category: 'Staff',
            title: 'Staff behavior inquiry',
            date: 'Oct 10, 2023',
            status: 'Received',
            statusColor: '#2196F3',
            statusBg: '#E3F2FD',
            icon: '👤'
        }
    ];

    const handleSubmit = () => {
        if (!category || !description) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            const currentDate = new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            navigation.navigate('SubmitComplaint', {
                category: category,
                date: currentDate
            });
            setDescription('');
            setCategory('');
        }, 1000);
    }

    return (
        <ScreenWrapper scroll={!showDropdown} style={styles.mainContainer}>
            <Header
                title="School Support"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <View style={styles.container}>
                {/* Intro Section */}
                <View style={styles.introSection}>
                    <Text style={styles.title}>Report a Concern</Text>
                    <Text style={styles.subtitle}>
                        Your feedback helps us maintain a safe and productive learning environment for everyone.
                    </Text>
                </View>

                {/* Form Card */}
                <View style={styles.formCard}>
                    <Text style={styles.label}>Complaint Category</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            style={[
                                styles.dropdownTrigger,
                                showDropdown && styles.dropdownTriggerActive
                            ]}
                            onPress={() => setShowDropdown(!showDropdown)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.dropdownText,
                                !category && { color: Colors.lightGreyText }
                            ]}>
                                {category || 'Select a category'}
                            </Text>
                            <Text style={[
                                styles.dropdownIcon,
                                showDropdown && { transform: [{ rotate: '180deg' }] }
                            ]}>▼</Text>
                        </TouchableOpacity>

                        {showDropdown && (
                            <View style={styles.dropdownListContainer}>
                                <ScrollView
                                    style={styles.dropdownScrollView}
                                    nestedScrollEnabled={true}
                                    bounces={false}
                                >
                                    {categories.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dropdownItem,
                                                category === item && styles.activeDropdownItem,
                                                index === categories.length - 1 && { borderBottomWidth: 0 }
                                            ]}
                                            onPress={() => {
                                                setCategory(item);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <Text style={[
                                                styles.dropdownItemText,
                                                category === item && styles.activeDropdownItemText
                                            ]}>
                                                {item}
                                            </Text>
                                            {category === item && <Text style={styles.checkIcon}>✓</Text>}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    <Text style={styles.label}>Details of the Complaint</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Please describe the issue in detail..."
                        placeholderTextColor={Colors.lightGreyText}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity style={styles.attachBtn}>
                        <Text style={styles.attachIcon}>📎</Text>
                        <Text style={styles.attachText}>Attach Photo/Document</Text>
                    </TouchableOpacity>
                    <Text style={styles.attachNote}>Optional: Max size 5MB (PDF, JPG, PNG)</Text>

                    <TouchableOpacity
                        style={[styles.submitBtn, (!category || !description) && styles.disabledBtn]}
                        onPress={handleSubmit}
                        disabled={isSubmitting || !category || !description}
                    >
                        <Text style={styles.submitBtnText}>
                            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Complaints Section */}
                <View style={styles.recentHeader}>
                    <Text style={styles.sectionTitle}>My Recent Complaints</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewMyComplaint')}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {recentComplaints.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.complaintCard}>
                        <View style={styles.complaintIconBox}>
                            <Text style={styles.complaintIcon}>{item.icon}</Text>
                        </View>
                        <View style={styles.complaintInfo}>
                            <View style={styles.complaintHeaderRow}>
                                <Text style={styles.complaintTitle} numberOfLines={1}>{item.title}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                                </View>
                            </View>
                            <Text style={styles.complaintMeta}>
                                {item.category} • {item.date}
                            </Text>
                            {item.status === 'In Progress' && (
                                <View style={styles.progressTrack}>
                                    <View style={[styles.progressFill, { width: '60%' }]} />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Trust Footer */}
                <View style={styles.trustCard}>
                    <Text style={styles.trustTitle}>Commitment to Service</Text>
                    <Text style={styles.trustDesc}>
                        Every report is reviewed by the school administration within 48 business hours. We value your privacy and trust.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </View>
        </ScreenWrapper>
    )
}

export default Complaint

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F8F9FE',
    },
    container: {
        paddingHorizontal: HWSize.W_Width20,
        paddingTop: HWSize.H_Height20,
    },
    introSection: {
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
        marginTop: 6,
        lineHeight: 20,
    },
    formCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.textMain,
        marginBottom: 10,
    },
    dropdownContainer: {
        zIndex: 1000,
        marginBottom: 20,
    },
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    dropdownTriggerActive: {
        borderColor: Colors.primary,
    },
    dropdownText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textMain,
    },
    dropdownIcon: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    dropdownListContainer: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginTop: 5,
        zIndex: 2000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    dropdownScrollView: {
        maxHeight: 300,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    activeDropdownItem: {
        backgroundColor: '#F9F9FF',
    },
    dropdownItemText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    activeDropdownItemText: {
        color: Colors.primary,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    checkIcon: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textArea: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 15,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textMain,
        borderWidth: 1,
        borderColor: Colors.border,
        height: 120,
        marginBottom: 20,
    },
    attachBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.lightBorder,
        borderStyle: 'dashed',
        backgroundColor: '#FCFCFC',
    },
    attachIcon: {
        fontSize: 18,
        marginRight: 8,
        color: Colors.primary,
    },
    attachText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.primary,
    },
    attachNote: {
        fontSize: 11,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.lightGreyText,
        marginTop: 6,
        marginBottom: 25,
        textAlign: 'center',
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    disabledBtn: {
        backgroundColor: '#B0B0B0',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
    },
    viewAllText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_SemiBold,
        color: Colors.primary,
    },
    complaintCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    complaintIconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    complaintIcon: {
        fontSize: 22,
    },
    complaintInfo: {
        flex: 1,
    },
    complaintHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    complaintTitle: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: Colors.textMain,
        flex: 1,
        marginRight: 10,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontFamily: Fonts.LexendBold,
    },
    complaintMeta: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: Colors.textSecondary,
    },
    progressTrack: {
        height: 4,
        backgroundColor: '#F0F0F0',
        borderRadius: 2,
        marginTop: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FBC02D',
        borderRadius: 2,
    },
    trustCard: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        padding: 20,
        marginTop: 15,
        marginBottom: 20,
    },
    trustTitle: {
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        color: Colors.white,
        marginBottom: 8,
    },
    trustDesc: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Medium,
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 18,
    },
})
function alert(arg0: string) {
    throw new Error('Function not implemented.')
}

