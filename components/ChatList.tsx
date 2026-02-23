import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { MOCK_CHATS, MOCK_HOSTS } from '../constants';
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

const ChatList: React.FC = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: any }) => {
    const host = getHost(item.hostId);
    if (!host) return null;

    return (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => navigation.navigate('ChatInterface', { host })}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: host.avatarUrl }} style={styles.avatar} />
            {host.status === 'online' && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={styles.name}>{host.name}</Text>
              <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
            </View>
            <View style={styles.chatFooter}>
              <Text style={[styles.lastMessage, item.unread > 0 && styles.unreadMessage]} numberOfLines={1}>
                {item.lastMessage}
              </Text>
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
    );
  };

  const EmptyListComponent = () => (
      <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyText}>No messages yet</Text>
          <Text style={styles.emptySubtext}>When a host messages you, it will appear here.</Text>
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <FlatList
        data={MOCK_CHATS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    alignItems: 'flex-start'
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#64748b',
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#94a3b8',
    fontSize: 14,
    flex: 1,
  },
  unreadMessage: {
      color: 'white',
      fontWeight: 'bold'
  },
  unreadBadge: {
    backgroundColor: '#db2777',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
  },
  emptyIcon: {
      fontSize: 48,
      opacity: 0.5,
      marginBottom: 16,
  },
  emptyText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
  },
  emptySubtext: {
      color: '#64748b',
      textAlign: 'center',
      marginTop: 8,
  }
});

export default ChatList;
