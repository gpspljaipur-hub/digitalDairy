import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import { Colors } from '../../comman/Colors'
import Fonts from '../../comman/fonts'
import HWSize from '../../comman/HWSize'
import { useNavigation } from '@react-navigation/native'

const CreateNotice = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState(['']);

    const classes = [
        'Grade 10-A', 'Grade 10-B',
        'Grade 11-A', 'All Classes'
    ];

    const toggleClass = (className: string) => {
        if (selectedClasses.includes(className)) {
            setSelectedClasses(selectedClasses.filter(c => c !== className));
        } else {
            setSelectedClasses([...selectedClasses, className]);
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Notice</Text>
                <TouchableOpacity style={styles.profileBtn}>
                    <View style={styles.profileIconOutline}>
                        <Text style={styles.profileEmoji}>👤</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Broadcasting Banner */}
                <View style={styles.banner}>
                    <View style={styles.bannerIconBg}>
                        <Text style={styles.megaphoneIcon}>📢</Text>
                    </View>
                    <View style={styles.bannerTextContent}>
                        <Text style={styles.bannerTitle}>Broadcasting to Community</Text>
                        <Text style={styles.bannerSubtitle}>
                            Your notice will be sent immediately to the selected classes.
                        </Text>
                    </View>
                </View>

                {/* Notice Title Section */}
                <Text style={styles.sectionLabel}>Notice Title</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Annual Sports Day Postponed"
                        placeholderTextColor={Colors.lightGreyText}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Select Class Section */}
                <Text style={styles.sectionLabel}>Select Class</Text>
                <View style={styles.classesGrid}>
                    {classes.map((className) => {
                        const isSelected = selectedClasses.includes(className);
                        return (
                            <TouchableOpacity
                                key={className}
                                style={[styles.classItem, isSelected && styles.classItemActive]}
                                onPress={() => toggleClass(className)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                                    {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                </View>
                                <Text style={[styles.classText, isSelected && styles.classTextActive]}>
                                    {className}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Notice Content Section */}
                <Text style={styles.sectionLabel}>Notice Content</Text>
                <View style={styles.editorContainer}>
                    <View style={styles.toolbar}>
                        <TouchableOpacity style={styles.toolbarBtn}><Text style={styles.toolbarIcon}>B</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarBtn}><Text style={[styles.toolbarIcon, { fontStyle: 'italic' }]}>I</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarBtn}><Text style={styles.toolbarIcon}>≡</Text></TouchableOpacity>
                        <View style={styles.toolbarDivider} />
                        <TouchableOpacity style={styles.toolbarBtn}><Text style={styles.toolbarIcon}>📎</Text></TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Write the important message for students and parents here..."
                        placeholderTextColor={Colors.lightGreyText}
                        multiline
                        textAlignVertical="top"
                        value={content}
                        onChangeText={setContent}
                    />
                    <View style={styles.textAreaFooter}>
                        <Text style={styles.resizeHandle}>◢</Text>
                    </View>
                </View>

                {/* Mark as Important Section */}
                <View style={styles.importantCard}>
                    <View style={styles.importantIconBg}>
                        <Text style={styles.warningIcon}>!</Text>
                    </View>
                    <View style={styles.importantTextContent}>
                        <Text style={styles.importantTitle}>Mark as Important</Text>
                        <Text style={styles.importantSubtitle}>Sends an SMS alert to parents.</Text>
                    </View>
                    <Switch
                        value={isImportant}
                        onValueChange={setIsImportant}
                        trackColor={{ false: '#D1D5DB', true: '#BFC5FF' }}
                        thumbColor={isImportant ? Colors.primary : '#F4F3F4'}
                    />
                </View>

                {/* Send Button */}
                <TouchableOpacity
                    style={styles.sendButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('SendNotice')}
                >
                    <Text style={styles.sendButtonIcon}>➤</Text>
                    <Text style={styles.sendButtonText}>Send Notice</Text>
                </TouchableOpacity>

                <Text style={styles.footerNote}>
                    This action will be logged and archived for 12 months.
                </Text>
            </View>
        </ScreenWrapper>
    )
}

export default CreateNotice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 1,
        backgroundColor: Colors.white,
    },
    backBtn: {
        padding: 5,
    },
    backIcon: {
        fontSize: 24,
        color: '#1E40AF',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E40AF',
        flex: 1,
        marginLeft: 15,
    },
    profileBtn: {
        padding: 5,
    },
    profileIconOutline: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#1E40AF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileEmoji: {
        fontSize: 14,
        color: '#1E40AF',
    },
    content: {
        padding: 20,
    },
    banner: {
        flexDirection: 'row',
        backgroundColor: '#EEF2FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E0E7FF',
    },
    bannerIconBg: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: '#0047AB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    megaphoneIcon: {
        fontSize: 20,
    },
    bannerTextContent: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#1F2937',
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 13,
        fontFamily: Fonts.Lexend_Regular,
        color: '#4B5563',
        lineHeight: 18,
    },
    sectionLabel: {
        fontSize: 15,
        fontFamily: Fonts.Lexend_SemiBold,
        color: '#111827',
        marginBottom: 10,
    },
    inputContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: 20,
        overflow: 'hidden',
    },
    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
    },
    classesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    classItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        width: '48%',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 12,
    },
    classItemActive: {
        backgroundColor: '#EEF2FF',
        borderColor: '#3B82F6',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#9CA3AF',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        borderColor: '#0047AB',
        backgroundColor: '#0047AB',
    },
    checkMark: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    classText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Medium,
        color: '#4B5563',
    },
    classTextActive: {
        color: '#1F2937',
        fontFamily: Fonts.Lexend_SemiBold,
    },
    editorContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: 24,
        overflow: 'hidden',
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#F3F4F6',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    toolbarBtn: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    toolbarIcon: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    toolbarDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 8,
    },
    textArea: {
        padding: 15,
        height: 180,
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#1F2937',
    },
    textAreaFooter: {
        alignItems: 'flex-end',
        paddingRight: 4,
        paddingBottom: 4,
    },
    resizeHandle: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    importantCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F5',
        borderRadius: 8,
        padding: 14,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        marginBottom: 30,
    },
    importantIconBg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    warningIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B91C1C',
    },
    importantTextContent: {
        flex: 1,
    },
    importantTitle: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#991B1B',
    },
    importantSubtitle: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Regular,
        color: '#B91C1C',
    },
    sendButton: {
        flexDirection: 'row',
        backgroundColor: '#0056D2',
        borderRadius: 10,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    sendButtonIcon: {
        color: Colors.white,
        fontSize: 18,
        marginRight: 10,
        transform: [{ rotate: '-45deg' }],
    },
    sendButtonText: {
        color: Colors.white,
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
    },
    footerNote: {
        textAlign: 'center',
        fontSize: 13,
        color: '#64748B',
        fontFamily: Fonts.Lexend_Regular,
        marginBottom: 20,
    },
})
