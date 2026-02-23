import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Host } from '../types';

interface LiveCallProps {
  route: { params: { host: Host, callType: 'video' | 'audio' } };
  navigation: any;
}

const LiveCall: React.FC<LiveCallProps> = ({ route, navigation }) => {
  const { host, callType } = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isVideo, setIsVideo] = useState(callType === 'video');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
  }

  return (
    <SafeAreaView style={styles.container}>
        {isVideo ? (
            <Image source={{uri: host.avatarUrl}} style={styles.videoBackground} blurRadius={20}/>
        ) : (
            <View style={[styles.videoBackground, {backgroundColor: '#1e293b'}]} />
        )}

        <View style={styles.header}>
            <View style={styles.hostInfo}>
                <Image source={{uri: host.avatarUrl}} style={styles.avatar} />
                <View>
                    <Text style={styles.hostName}>{host.name}</Text>
                    <Text style={styles.callStatus}>Ringing...</Text>
                </View>
            </View>
            <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>

        <View style={styles.mainContent}>
            {/* In a real app, this would be a video stream */}
            <Image source={{uri: host.avatarUrl}} style={styles.localVideo} />
        </View>

        <View style={styles.footer}>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlBtn} onPress={() => setIsMuted(!isMuted)}><Text style={styles.controlIcon}>{isMuted ? '🔇' : '🎤'}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={() => setIsVideo(!isVideo)}><Text style={styles.controlIcon}>{isVideo ? '📷' : '📸'}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={() => setIsSpeaker(!isSpeaker)}><Text style={styles.controlIcon}>{isSpeaker ? '🔊' : '🔈'}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={() => { /* Add gift logic */ }}><Text style={styles.controlIcon}>🎁</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.endCallBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.endCallText}>End Call</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    videoBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 24 },
    hostInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
    hostName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    callStatus: { color: '#94a3b8' },
    timer: { color: 'white', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, overflow: 'hidden' },
    mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    localVideo: { width: 150, height: 200, borderRadius: 12, position: 'absolute', bottom: 180, right: 24, borderWidth: 2, borderColor: 'white' },
    footer: { padding: 24 },
    controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, marginBottom: 16 },
    controlBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8 },
    controlIcon: { fontSize: 28 },
    endCallBtn: { backgroundColor: '#ef4444', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
    endCallText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default LiveCall;
