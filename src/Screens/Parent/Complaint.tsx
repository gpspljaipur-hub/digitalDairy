import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Auth_ApiRequest, Get_Send_Api } from '../../Lib/ApiService/ApiRequest'
import ApiUrl from '../../Lib/ApiService/ApiUrl'
import Helper from '../../Lib/HelperFiles/Helper'
import { ActivityIndicator } from 'react-native'
import { pick, types } from '@react-native-documents/picker'

import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import moment from 'moment'
import useStrings from '../../comman/useStrings'

const Complaint = () => {
    const strings = useStrings()
    const navigation = useNavigation<any>();
    const { parent } = useSelector((state: any) => state.user);
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const [complaintList, setComplaintList] = useState<any[]>([]);
    const [attachment, setAttachment] = useState<any>(null);

    useEffect(() => {
        fetchCategories();
        fetchComplaints();
    }, []);

    const pickDocument = async () => {
        try {
            const [file] = await pick({
                allowMultiSelection: false,
                type: [types.pdf, types.images],
            });
            console.log('Picked Document:', file);
            setAttachment(file);
        } catch (err) {

        }
    };

    const fetchCategories = async () => {
        try {
            const res = await Get_Send_Api(ApiUrl.ComplaintCategoryList, {});
            console.log('Categories Response:', res);
            if (res && !res.error) {
                setCategoryList(res || res || []);
            }
        } catch (error) {
            console.error('Fetch Categories Error:', error);
        }
    };

    const fetchComplaints = async () => {
        try {
            const res = await Get_Send_Api(ApiUrl.ComplaintList, {});
            console.log('Complaints Response:', res);
            if (res && !res.error) {
                setComplaintList(res.data || res || []);
            }
        } catch (error) {
            console.error('Fetch Complaints Error:', error);
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { color: '#FBC02D', bg: '#FFFDE7' };
            case 'resolved':
                return { color: '#4CAF50', bg: '#E8F5E9' };
            case 'in progress':
                return { color: '#2196F3', bg: '#E3F2FD' };
            default:
                return { color: '#666666', bg: '#EEEEEE' };
        }
    };

    const handleSubmit = async () => {
        if (!categoryId || !description) {
            Helper.showToast('Please select a category and enter description');
            return;
        }

        setIsSubmitting(true);
        const studentId = parent?.data?.studentId || parent?.studentId;

        const payload = {
            categoryId: categoryId,
            message: description
        };

        try {
            const res = await Auth_ApiRequest(ApiUrl.ComplaintAdd, payload);
            console.log('Complaint Add Response:', res);
            if (res && !res.error) {
                Helper.showToast(res.message || 'Complaint submitted successfully');
                const currentDate = new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                navigation.navigate('SubmitComplaint', {
                    category: category,
                    date: currentDate,
                    res: res
                });
                setDescription('');
                setCategory('');
                setCategoryId('');
            } else {
                Helper.showToast(res?.message || 'Failed to submit complaint');
            }
        } catch (error) {
            console.error('Submit Complaint Error:', error);
            Helper.showToast('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ScreenWrapper scroll={!showDropdown} style={styles.mainContainer}>
            <Header
                title={strings.schoolSupport}
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <View style={styles.container}>
                {/* Intro Section */}
                <View style={styles.introSection}>
                    <Text style={styles.title}>{strings.reportConcern}</Text>
                    <Text style={styles.subtitle}>
                        {strings.feedbackSubtitle}
                    </Text>
                </View>

                {/* Form Card */}
                <View style={styles.formCard}>
                    <Text style={styles.label}>{strings.complaintSubject}</Text>
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
                                {category || strings.selectCategoryPlaceholder}
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
                                    {categoryList.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dropdownItem,
                                                categoryId === item._id && styles.activeDropdownItem,
                                                index === categoryList.length - 1 && { borderBottomWidth: 0 }
                                            ]}
                                            onPress={() => {
                                                setCategory(item.name);
                                                setCategoryId(item._id);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <Text style={[
                                                styles.dropdownItemText,
                                                categoryId === item._id && styles.activeDropdownItemText
                                            ]}>
                                                {item.name}
                                            </Text>
                                            {categoryId === item._id && <Text style={styles.checkIcon}>✓</Text>}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    <Text style={styles.label}>{strings.detailsOfComplaint}</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder={strings.describeIssuePlaceholder}
                        placeholderTextColor={Colors.lightGreyText}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity
                        style={[styles.attachBtn, attachment && { borderColor: Colors.primary, borderStyle: 'solid' }]}
                        onPress={pickDocument}
                    >
                        <Text style={styles.attachIcon}>{attachment ? '📎' : '📎'}</Text>
                        <Text style={[styles.attachText, attachment && { color: Colors.primary }]}>
                            {attachment ? attachment.name : 'Attach Photo/Document'}
                        </Text>
                        {attachment && (
                            <TouchableOpacity onPress={() => setAttachment(null)} style={{ padding: 5 }}>
                                <Text style={{ color: '#DC2626', fontSize: 12 }}>Remove</Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.attachNote}>{strings.optionalMaxSize}</Text>

                    <TouchableOpacity
                        style={[styles.submitBtn, (!categoryId || !description) && styles.disabledBtn, isSubmitting && { opacity: 0.7 }]}
                        onPress={handleSubmit}
                        disabled={isSubmitting || !categoryId || !description}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitBtnText}>{strings.submitComplaint}</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Recent Complaints Section */}
                <View style={styles.recentHeader}>
                    <Text style={styles.sectionTitle}>{strings.myRecentComplaints}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewMyComplaint')}>
                        <Text style={styles.viewAllText}>{strings.viewAll}</Text>
                    </TouchableOpacity>
                </View>

                {complaintList.slice(0, 5).map((item) => {
                    const statusStyles = getStatusStyles(item.status);
                    return (
                        <TouchableOpacity key={item._id} style={styles.complaintCard}>
                            <View style={styles.complaintIconBox}>
                                <Text style={styles.complaintIcon}>📋</Text>
                            </View>
                            <View style={styles.complaintInfo}>
                                <View style={styles.complaintHeaderRow}>
                                    <Text style={styles.complaintTitle} numberOfLines={1}>{item.message}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: statusStyles.bg }]}>
                                        <Text style={[styles.statusText, { color: statusStyles.color }]}>
                                            {item.status || 'Pending'}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.complaintMeta}>
                                    {item.categoryName || 'Other'} • {moment(item.createdAt).format('MMM DD, YYYY')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {complaintList.length === 0 && (
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{ fontFamily: Fonts.Lexend_Medium, color: Colors.lightGreyText }}>
                            No complaints found.
                        </Text>
                    </View>
                )}

                {/* Trust Footer */}
                <View style={styles.trustCard}>
                    <Text style={styles.trustTitle}>{strings.commitmentToService}</Text>
                    <Text style={styles.trustDesc}>
                        {strings.trustDescription}
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

