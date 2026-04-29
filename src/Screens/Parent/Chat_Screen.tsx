import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef } from 'react'
import ScreenWrapper from '../../comman/ScreenWrapper'
import Header from '../../comman/Header'
import Fonts from '../../comman/fonts'
import { useNavigation } from '@react-navigation/native'

const Chat_Screen = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const [messages, setMessages] = useState<any[]>([]);

    const handleSend = () => {
        if (message.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            type: 'outgoing',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setMessage('');
        setTimeout(() => {
            const dummyReply = {
                id: (Date.now() + 1).toString(),
                type: 'incoming',
                text: "Thank you for your message. We will get back to you soon.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: '👩‍🏫',
            };
            setMessages(prev => [...prev, dummyReply]);
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }, 1000);
    };

    const renderMessage = ({ item }: { item: any }) => {
        const isIncoming = item.type === 'incoming';

        return (
            <View style={[styles.messageRow, isIncoming ? styles.incomingRow : styles.outgoingRow]}>
                {isIncoming && (
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>{item.avatar}</Text>
                    </View>
                )}
                <View style={[styles.messageContent, isIncoming ? styles.incomingContent : styles.outgoingContent]}>
                    <View style={[styles.bubble, isIncoming ? styles.incomingBubble : styles.outgoingBubble]}>
                        <Text style={[styles.messageText, isIncoming ? styles.incomingText : styles.outgoingText]}>
                            {item.text}
                        </Text>
                    </View>
                    <View style={[styles.timeRow, isIncoming ? styles.incomingTimeRow : styles.outgoingTimeRow]}>
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper scroll={false} style={{ backgroundColor: '#F8FAFF' }}>
            <Header
                title="Mrs. Sharma - Grade 10B"
                subtitle="ONLINE"
                showBack={true}
                onBack={() => navigation.goBack()}
                showProfile={false}
                rightIcon="ⓘ"
                titleStyle={styles.headerTitleOverride}
            />

            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={40}
                style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.addButton}>
                        <View style={styles.circlePlus}>
                            <Text style={styles.addButtonIcon}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your message..."
                            placeholderTextColor="#94A3B8"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                        />
                    </View>
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <View style={styles.sendIconBg}>
                            <Text style={styles.sendButtonIcon}>➤</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default Chat_Screen

const styles = StyleSheet.create({
    headerTitleOverride: {
        color: '#1E40AF',
        fontSize: 17,
        fontFamily: Fonts.LexendBold,
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        marginTop: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 16,
        maxWidth: '85%',
    },
    incomingRow: {
        alignSelf: 'flex-start',
    },
    outgoingRow: {
        alignSelf: 'flex-end',
    },
    avatarContainer: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    avatarEmoji: {
        fontSize: 22,
    },
    messageContent: {
        flexShrink: 1,
    },
    incomingContent: {
        alignItems: 'flex-start',
    },
    outgoingContent: {
        alignItems: 'flex-end',
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 3,
    },
    incomingBubble: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    outgoingBubble: {
        backgroundColor: '#0056D2',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
        fontFamily: Fonts.Lexend_Regular,
    },
    incomingText: {
        color: '#1E293B',
    },
    outgoingText: {
        color: '#FFFFFF',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    incomingTimeRow: {
        alignSelf: 'flex-start',
    },
    outgoingTimeRow: {
        alignSelf: 'flex-end',
    },
    timeText: {
        fontSize: 11,
        color: '#94A3B8',
        fontFamily: Fonts.Lexend_Regular,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    addButton: {
        marginRight: 12,
    },
    circlePlus: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: '#94A3B8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonIcon: {
        fontSize: 24,
        color: '#64748B',
        marginTop: -2,
    },
    inputWrapper: {
        flex: 1,
        backgroundColor: '#EFF6FF',
        borderRadius: 15,
        paddingHorizontal: 16,
        maxHeight: 120,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    input: {
        fontSize: 15,
        color: '#1E293B',
        fontFamily: Fonts.Lexend_Regular,
        paddingVertical: 10,
    },
    sendButton: {
        marginLeft: 12,
    },
    sendIconBg: {
        width: 46,
        height: 46,
        borderRadius: 12,
        backgroundColor: '#0056D2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0056D2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    sendButtonIcon: {
        fontSize: 22,
        color: '#FFFFFF',
        transform: [{ rotate: '-15deg' }, { translateX: 2 }],
    },
})