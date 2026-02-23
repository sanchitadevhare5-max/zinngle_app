import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { MOCK_HOSTS } from '../constants';
import { Host } from '../types';

const Search: React.FC = () => {
    const navigation = useNavigation<any>();
    const [query, setQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(['Yoga', 'Music', 'Aria']);

    const results: Host[] = query 
        ? MOCK_HOSTS.filter((h: Host) => 
            h.name.toLowerCase().includes(query.toLowerCase()) || 
            h.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
          )
        : [];

    const onSelectHost = (host: Host) => {
        navigation.navigate('CreatorProfile', { host });
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header / Search Bar */}
            <View style={styles.header}>
                <View style={styles.searchBarContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput 
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                        placeholder="Search hosts, tags..."
                        placeholderTextColor="#64748b"
                        style={styles.input}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity style={styles.clearIconContainer} onPress={() => setQuery('')}>
                            <Text style={styles.clearIcon}>ⓧ</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            {/* Conditional Content */}
            {query.length === 0 ? (
                <ScrollView style={styles.content}>
                    <View style={styles.sectionHeader}>
                         <Text style={styles.sectionTitle}>Recent</Text>
                         <TouchableOpacity onPress={() => setRecentSearches([])}>
                            <Text style={styles.clearButtonText}>Clear</Text>
                         </TouchableOpacity>
                    </View>
                    <View style={styles.tagGrid}>
                        {recentSearches.map((term, i) => (
                            <TouchableOpacity key={i} onPress={() => setQuery(term)} style={styles.recentItem}>
                                <Text style={styles.recentText}>{term}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <Text style={[styles.sectionTitle, { marginTop: 32, marginBottom: 16 }]}>Trending Tags</Text>
                    <View style={styles.tagGrid}>
                         {['#music', '#gaming', '#chill', '#advice', '#love'].map(tag => (
                             <TouchableOpacity key={tag} onPress={() => setQuery(tag.replace('#', ''))} style={styles.tagItem}>
                                 <Text style={styles.tagText}>{tag}</Text>
                             </TouchableOpacity>
                         ))}
                    </View>
                </ScrollView>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.content}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>👻</Text>
                            <Text style={styles.emptyText}>No results found for "{query}"</Text>
                        </View>
                    )}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => onSelectHost(item)} style={styles.hostItem}>
                            <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                            <View style={styles.hostInfo}>
                                <Text style={styles.hostName}>{item.name}</Text>
                                <Text style={styles.hostUsername}>@{item.username}</Text>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  searchBarContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  input: { flex: 1, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', borderRadius: 99, paddingLeft: 40, height: 44, color: 'white', fontSize: 16 },
  searchIcon: { position: 'absolute', left: 16, zIndex: 1, fontSize: 16 },
  clearIconContainer: { position: 'absolute', right: 12, zIndex: 1, padding: 4 },
  clearIcon: { color: '#64748b', fontSize: 18 },
  cancelText: { color: '#94a3b8', fontSize: 16, fontWeight: 'bold' },
  content: { padding: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  clearButtonText: { color: '#db2777', fontSize: 12, fontWeight: 'bold' },
  tagGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  recentItem: { backgroundColor: '#1e293b', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, marginRight: 12, marginBottom: 12 },
  recentText: { color: '#cbd5e1', fontSize: 16, fontWeight: '500' },
  tagItem: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1, borderColor: '#334155', marginRight: 12, marginBottom: 12 },
  tagText: { color: '#94a3b8', fontSize: 14 },
  hostItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#1e293b', borderRadius: 16, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  hostInfo: { flex: 1 },
  hostName: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  hostUsername: { color: '#64748b', fontSize: 14 },
  chevron: { color: '#64748b', fontSize: 20 },
  emptyContainer: { alignItems: 'center', paddingTop: 64 },
  emptyIcon: { fontSize: 48, marginBottom: 16, opacity: 0.5 },
  emptyText: { color: '#64748b', fontSize: 16, fontWeight: '500' },
});

export default Search;
