import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Host, ChatMessage, Gift } from '../types';

interface ChatInterfaceProps {
  route: { params: { host: Host } };
  navigation: any;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ route, navigation }) => {
  const { host } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([
      { id: '1', sender: 'host', text: `Hey there! I'm ${host.name}. What would you like to talk about?`, timestamp: Date.now() - 2000 },
      { id: '2', sender: 'user', text: 'Hi! Just wanted to say I love your work.', timestamp: Date.now() - 1000 },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;
    const newMessage: ChatMessage = {
        id: (messages.length + 1).toString(),
        sender: 'user',
        text: inputText,
        timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.hostBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}} keyboardVerticalOffset={90}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backButton}>‹</Text></TouchableOpacity>
            <Image source={{uri: host.avatarUrl}} style={styles.avatar} />
            <Text style={styles.headerTitle}>{host.name}</Text>
        </View>

        <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messageList}
            inverted
        />
        
        <View style={styles.inputRow}>
            <TouchableOpacity style={styles.iconButton} onPress={() => {}}><Text style={styles.iconText}>🎁</Text></TouchableOpacity>
            <TextInput 
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder={`Message ${host.name}...`}
                placeholderTextColor="#64748b"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}><Text style={styles.sendButtonText}>Send</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    backButton: { color: 'white', fontSize: 32, marginRight: 12 },
    avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    messageList: { padding: 16 },
    messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 16, marginBottom: 12 },
    userBubble: { alignSelf: 'flex-end', backgroundColor: '#db2777' },
    hostBubble: { alignSelf: 'flex-start', backgroundColor: '#334155' },
    messageText: { color: 'white', fontSize: 15, lineHeight: 22 },
    inputRow: { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 12, alignItems: 'center' },
    input: { flex: 1, backgroundColor: '#1e293b', borderRadius: 99, paddingHorizontal: 20, paddingVertical: 12, color: 'white', marginRight: 8 },
    iconButton: { padding: 12 },
    iconText: { fontSize: 24 },
    sendButton: { backgroundColor: '#db2777', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 99 },
    sendButtonText: { color: 'white', fontWeight: 'bold' }
});

export default ChatInterface;
