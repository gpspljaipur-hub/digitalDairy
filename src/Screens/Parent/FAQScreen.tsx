import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    LayoutAnimation,
} from 'react-native';
import ScreenWrapper from '../../comman/ScreenWrapper';
import Header from '../../comman/Header';
import { Colors } from '../../comman/Colors';
import Fonts from '../../comman/fonts';
import { useNavigation } from '@react-navigation/native';
import ParentBottom from '../../Component/ParentBottom';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity
            style={[styles.faqItem, expanded && styles.faqItemExpanded]}
            onPress={toggleExpand}
            activeOpacity={0.8}
        >
            <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{question}</Text>
                <Text style={[styles.chevron, expanded && styles.chevronExpanded]}>
                    {expanded ? '▴' : '▾'}
                </Text>
            </View>
            {expanded && (
                <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{answer}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const FAQScreen = () => {
    const navigation = useNavigation<any>();
    const [feedback, setFeedback] = useState('');

    const faqs = [
        {
            question: "How do I see my child's attendance?",
            answer: "Go to 'Home' and tap on the 'Attendance' icon in the student dashboard. You can view daily, monthly and yearly attendance records there."
        },
        {
            question: "Where can I download the exam schedule?",
            answer: "Open the 'Updates' tab and look for the 'Documents' section at the top. All examination schedules and important circulars are posted there."
        },
        {
            question: "What to do if I forgot my password?",
            answer: "Contact the School Admin via the phone button below to reset your credentials. Alternatively, you can use the 'Forgot Password' link on the login screen."
        }
    ];

    return (
        <ScreenWrapper scroll={false} style={styles.container}>
            <Header
                title="Help & Support"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                showNotification={false}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Banner */}
                <View style={styles.heroBanner}>
                    <Text style={styles.heroTitle}>How can we help you?</Text>
                    <Text style={styles.heroSubtitle}>Find answers or contact the school office directly.</Text>
                </View>

                {/* FAQ Section */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionIconBox}>
                        <Text style={styles.sectionIcon}>❓</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                </View>

                <View style={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </View>

                {/* Contact Admin */}
                <Text style={styles.subHeader}>Contact Admin</Text>
                <View style={styles.contactRow}>
                    <TouchableOpacity style={styles.callButton}>
                        <Text style={styles.buttonText}>📞 Call School Office</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.emailButton}>
                        <Text style={[styles.buttonText, { color: '#475569' }]}>✉️ Email Support</Text>
                    </TouchableOpacity>
                </View>

                {/* Ticket Status */}
                <View style={styles.ticketCard}>
                    <View style={styles.ticketHeader}>
                        <Text style={styles.ticketHeaderText}>SUPPORT TICKET STATUS</Text>
                    </View>
                    <View style={styles.ticketBody}>
                        <View style={styles.ticketIconContainer}>
                            <Text style={styles.checkIcon}>✅</Text>
                        </View>
                        <View style={styles.ticketInfo}>
                            <Text style={styles.ticketId}>ID: #45920</Text>
                            <Text style={styles.ticketStatusText}>Resolved: Fee issue</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusBadgeText}>CLOSED</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Feedback Form */}
                <View style={styles.feedbackCard}>
                    <Text style={styles.feedbackTitle}>Send Feedback</Text>
                    <Text style={styles.feedbackSubtitle}>Your voice helps us improve the school digital experience for everyone.</Text>

                    <View style={styles.infoBanner}>
                        <Text style={styles.infoIcon}>📢</Text>
                        <Text style={styles.infoText}>Civic Education Framework Compliant</Text>
                    </View>

                    <Text style={styles.inputLabel}>Message to Administration</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Tell us how we can improve..."
                        multiline
                        numberOfLines={4}
                        value={feedback}
                        onChangeText={setFeedback}
                    />

                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Feedback</Text>
                        <Text style={styles.sendIcon}>➤</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            <ParentBottom activeTab="HELP" />
        </ScreenWrapper>
    );
};

export default FAQScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    heroBanner: {
        backgroundColor: '#0047AB',
        borderRadius: 12,
        padding: 24,
        marginBottom: 25,
        elevation: 4,
        shadowColor: '#0047AB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    heroTitle: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: Fonts.LexendBold,
        marginBottom: 8,
    },
    heroSubtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 15,
        fontFamily: Fonts.Lexend_Regular,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionIcon: {
        fontSize: 18,
        color: '#0047AB',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    faqList: {
        marginBottom: 25,
    },
    faqItem: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginBottom: 12,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    faqItemExpanded: {
        borderColor: '#0047AB',
        backgroundColor: '#F8FAFF',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#0047AB',
        flex: 1,
        paddingRight: 10,
    },
    chevron: {
        fontSize: 20,
        color: '#64748B',
    },
    chevronExpanded: {
        color: '#0047AB',
    },
    faqAnswerContainer: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    faqAnswer: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#475569',
        lineHeight: 22,
    },
    subHeader: {
        fontSize: 18,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginTop: 10,
        marginBottom: 15,
    },
    contactRow: {
        gap: 12,
        marginBottom: 30,
    },
    callButton: {
        backgroundColor: '#0056D2',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    emailButton: {
        backgroundColor: '#E2E8F0',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.Lexend_SemiBold,
    },
    ticketCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        overflow: 'hidden',
        marginBottom: 30,
        elevation: 2,
    },
    ticketHeader: {
        backgroundColor: '#EFF6FF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#BFDBFE',
    },
    ticketHeaderText: {
        fontSize: 12,
        fontFamily: Fonts.LexendBold,
        color: '#475569',
        letterSpacing: 1,
    },
    ticketBody: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    ticketIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
    },
    checkIcon: {
        fontSize: 26,
    },
    ticketInfo: {
        flex: 1,
    },
    ticketId: {
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
    },
    ticketStatusText: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        marginTop: 2,
    },
    statusBadge: {
        backgroundColor: '#065F46',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    statusBadgeText: {
        color: Colors.white,
        fontSize: 11,
        fontFamily: Fonts.LexendBold,
    },
    feedbackCard: {
        backgroundColor: '#F0F7FF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#D1E8FF',
        marginBottom: 30,
    },
    feedbackTitle: {
        fontSize: 20,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 8,
    },
    feedbackSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.Lexend_Regular,
        color: '#64748B',
        lineHeight: 22,
        marginBottom: 20,
    },
    infoBanner: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 24,
    },
    infoIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    infoText: {
        fontSize: 12,
        fontFamily: Fonts.Lexend_Medium,
        color: '#64748B',
    },
    inputLabel: {
        fontSize: 15,
        fontFamily: Fonts.LexendBold,
        color: '#1E293B',
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 18,
        height: 140,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        fontFamily: Fonts.Lexend_Regular,
        color: '#1E293B',
        marginBottom: 24,
    },
    submitButton: {
        backgroundColor: '#0047AB',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 14,
        elevation: 3,
    },
    submitButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.LexendBold,
        marginRight: 12,
    },
    sendIcon: {
        fontSize: 20,
        color: Colors.white,
    },
    footerImageContainer: {
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
    },
    footerGraphic: {
        height: 220,
        backgroundColor: '#22D3EE',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    footerGraphicText: {
        fontSize: 36,
        fontFamily: Fonts.LexendBold,
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        lineHeight: 40,
    }
});
