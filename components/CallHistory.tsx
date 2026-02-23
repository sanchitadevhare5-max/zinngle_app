import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MOCK_CALL_HISTORY, MOCK_HOSTS } from '../constants';
import { Host } from '../types';

const getHost = (id: string): Host | undefined => MOCK_HOSTS.find((h: Host) => h.id === id);

const formatTime = (ts: number) => {
    const date = new Date(ts);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
}

const CallHistory: React.FC = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: any }) => {
    const host = getHost(item.hostId);
    if (!host) return null;

    const callIcon = item.type === 'video' ? '📹' : '📞';
    const statusColor = item.status === 'completed' ? '#22c55e' : (item.status === 'missed' ? '#ef4444' : '#f59e0b');

    return (
        <TouchableOpacity
          style={styles.callItem}
          onPress={() => navigation.navigate('CreatorProfile', { host })}
        >
            <Image source={{ uri: host.avatarUrl }} style={styles.avatar} />
            <View style={styles.callInfo}>
                <Text style={styles.name}>{host.name}</Text>
                <View style={styles.callMeta}>
                    <Text style={{color: statusColor, marginRight: 5}}>{callIcon}</Text>
                    <Text style={styles.metaText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
                    <Text style={styles.metaText}>• {formatTime(item.timestamp)}</Text>
                </View>
            </View>
            <View style={styles.durationContainer}>
                <Text style={styles.durationText}>{Math.floor(item.durationSeconds / 60)}m</Text>
            </View>
        </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Call History</Text>
      </View>
      <FlatList
        data={MOCK_CALL_HISTORY}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📞</Text>
                <Text style={styles.emptyText}>No call history</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 24, alignItems: 'flex-start' },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  callItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 16, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
  callInfo: { flex: 1 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  callMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { color: '#94a3b8', fontSize: 12 },
  durationContainer: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#334155', borderRadius: 8 },
  durationText: { color: 'white', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '40%' },
  emptyIcon: { fontSize: 48, opacity: 0.5 },
  emptyText: { color: '#64748b', marginTop: 16, fontSize: 16, fontWeight: 'bold' }
});

export default CallHistory;
