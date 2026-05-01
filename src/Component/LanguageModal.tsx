import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Colors } from '../comman/Colors';
import Fonts from '../comman/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/Store';
import { setLanguage } from '../Redux/Reducers/Userslice';
import useStrings from '../comman/useStrings';

interface LanguageModalProps {
    visible: boolean;
    onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
    const strings = useStrings();
    const dispatch = useDispatch();
    const selectedLanguage = useSelector((state: RootState) => state.user.language);

    const languages: { id: 'en' | 'hi' | 'pa'; label: string; icon: string }[] = [
        { id: 'en', label: 'English', icon: 'A' },
        { id: 'hi', label: 'Hindi (हिन्दी)', icon: 'अ' },
        { id: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)', icon: 'ਅ' },
    ];

    const handleLanguageSelect = (langId: 'en' | 'hi' | 'pa') => {
        dispatch(setLanguage(langId));
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable 
                style={styles.modalOverlay} 
                onPress={onClose}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{strings.selectLanguage}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.languageList}>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.id}
                                style={[
                                    styles.languageOption,
                                    selectedLanguage === lang.id && styles.selectedOption
                                ]}
                                onPress={() => handleLanguageSelect(lang.id)}
                            >
                                <View style={[
                                    styles.modalLangIconWrapper,
                                    selectedLanguage === lang.id && styles.selectedIconWrapper
                                ]}>
                                    <Text style={styles.modalLangIcon}>{lang.icon}</Text>
                                </View>
                                <Text style={[
                                    styles.langLabel,
                                    selectedLanguage === lang.id && styles.selectedLangLabel
                                ]}>{lang.label}</Text>
                                {selectedLanguage === lang.id && (
                                    <View style={styles.checkCircle}>
                                        <Text style={styles.checkMark}>✓</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

export default LanguageModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: 40,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    closeButton: {
        fontSize: 20,
        color: '#64748B',
        padding: 4,
    },
    languageList: {
        gap: 12,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: Colors.white,
    },
    selectedOption: {
        borderColor: '#2563EB',
        backgroundColor: '#F0F7FF',
        borderWidth: 2,
    },
    modalLangIconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: '#EEF2FF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    selectedIconWrapper: {
        backgroundColor: '#2563EB',
    },
    modalLangIcon: {
        fontSize: 18,
    },
    langLabel: {
        flex: 1,
        fontSize: 16,
        fontFamily: Fonts.Lexend_Medium,
        color: '#334155',
    },
    selectedLangLabel: {
        color: '#2563EB',
        fontFamily: Fonts.LexendBold,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMark: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
