import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView, 
    Image, 
    ImageBackground, 
    Modal 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { MOCK_HOSTS } from '../constants'; // For testing
import { Host } from '../types';

interface CreatorProfileProps {
  route: { params: { host: Host } };
  navigation: any;
}

// NOTE: This component is currently using mock data and state management.
// In a real app, this would be driven by a proper state management solution (e.g., Redux, Context API).
const CreatorProfile: React.FC<CreatorProfileProps> = ({ route, navigation }) => {
  const { host } = route.params;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);

  const startPrice = Math.min(host.pricePerMinute, host.audioPricePerMinute);

  const onCall = (callType: 'video' | 'audio') => {
      setShowCallOptions(false);
      navigation.navigate('LiveCall', { host, callType });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: host.coverUrl }} style={styles.coverImage}>
            <View style={styles.coverOverlay} />
        </ImageBackground>

        <View style={styles.profileContent}>
            <View style={styles.profileHeader}>
                <Image source={{ uri: host.avatarUrl }} style={styles.avatar} />
                <View style={[styles.statusIndicator, { backgroundColor: host.status === 'online' ? '#22c55e' : '#64748b' }]} />
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}><Text style={styles.statValue}>{host.followers}</Text><Text style={styles.statLabel}>Followers</Text></View>
                    <View style={styles.statItem}><Text style={styles.statValue}>{host.rating} ★</Text><Text style={styles.statLabel}>Rating</Text></View>
                </View>
            </View>

            <Text style={styles.hostName}>{host.name}</Text>
            <Text style={styles.hostUsername}>{host.username}</Text>

            <View style={styles.tagsContainer}>
                {host.tags.map(tag => <View key={tag} style={styles.tag}><Text style={styles.tagText}>#{tag}</Text></View>)}
            </View>

            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{host.bio}</Text>

            <Text style={styles.sectionTitle}>Photos</Text>
            <View style={styles.photoGrid}>
                <Image style={styles.photo} source={{uri: `https://picsum.photos/seed/${host.id}1/200`}} />
                <Image style={styles.photo} source={{uri: `https://picsum.photos/seed/${host.id}2/200`}} />
                <ImageBackground style={styles.photo} source={{uri: `https://picsum.photos/seed/${host.id}3/200`}}><View style={styles.photoOverlay}><Text style={styles.photoOverlayText}>+12</Text></View></ImageBackground>
            </View>

            <TouchableOpacity style={styles.reviewsButton}>
                <Text style={styles.reviewsButtonText}>See All Reviews</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={[styles.iconButton, isFavorite && {backgroundColor: '#db2777'}]}>
            <Text style={styles.actionIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFollowing(!isFollowing)} style={[styles.followButton, isFollowing && {backgroundColor: '#334155'}]}>
            <Text style={[styles.followButtonText, isFollowing && {color: 'white'}]}>{isFollowing ? '✓ Following' : '+ Follow'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatInterface', { host })} style={styles.chatButton}>
            <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCallOptions(true)} style={styles.callButton}>
            <Text style={styles.callButtonText}>📞 Call Now</Text>
            <Text style={styles.callButtonSubtext}>From {startPrice} 🪙/min</Text>
        </TouchableOpacity>
      </View>
      
      {/* Header Buttons */}
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.actionIcon}>‹</Text></TouchableOpacity>

      {/* Call Options Modal */}
      <Modal visible={showCallOptions} transparent={true} animationType="slide" onRequestClose={() => setShowCallOptions(false)}>
          <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                  <View style={styles.modalHandle} />
                  <Text style={styles.modalTitle}>Select Call Type</Text>
                  <TouchableOpacity onPress={() => onCall('video')} style={styles.callOption}>
                      <View style={styles.callOptionIcon}><Text>📹</Text></View>
                      <View><Text style={styles.callOptionTitle}>Video Call</Text><Text style={styles.callOptionDesc}>Face to face interaction</Text></View>
                      <View style={styles.callOptionPrice}><Text style={styles.priceText}>{host.pricePerMinute} 🪙/min</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onCall('audio')} style={styles.callOption}>
                      <View style={styles.callOptionIcon}><Text>🎧</Text></View>
                      <View><Text style={styles.callOptionTitle}>Audio Call</Text><Text style={styles.callOptionDesc}>Voice only conversation</Text></View>
                      <View style={styles.callOptionPrice}><Text style={styles.priceText}>{host.audioPricePerMinute} 🪙/min</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowCallOptions(false)} style={styles.cancelButton}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
              </View>
          </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    coverImage: { height: 288, justifyContent: 'flex-end' },
    coverOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15,23,42,0.4)' },
    backButton: { position:'absolute', top: 50, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    profileContent: { padding: 24, marginTop: -40, backgroundColor: '#0f172a', borderRadius: 24, zIndex: 10 },
    profileHeader: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 },
    avatar: { width: 96, height: 96, borderRadius: 24, borderWidth: 4, borderColor: '#0f172a', shadowColor: '#000', shadowRadius: 10, shadowOpacity: 0.5 },
    statusIndicator: { position: 'absolute', left: 80, top: 80, width: 24, height: 24, borderRadius: 12, borderWidth: 4, borderColor: '#0f172a' },
    statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
    statItem: { alignItems: 'center' },
    statValue: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    statLabel: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase' },
    hostName: { color: 'white', fontSize: 28, fontWeight: 'bold' },
    hostUsername: { color: '#94a3b8', fontSize: 16, marginBottom: 16 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
    tag: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8, marginBottom: 8 },
    tagText: { color: '#cbd5e1', fontSize: 12 },
    sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    bioText: { color: '#cbd5e1', lineHeight: 22, marginBottom: 24 },
    photoGrid: { flexDirection: 'row', marginBottom: 24, justifyContent: 'space-between' },
    photo: { flex: 1, aspectRatio: 1, backgroundColor: '#1e293b', borderRadius: 12, marginHorizontal: 4 },
    photoOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    photoOverlayText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    reviewsButton: { backgroundColor: '#1e293b', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 80 },
    reviewsButtonText: { color: 'white', fontWeight: 'bold' },
    bottomActions: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 16, backgroundColor: '#0f172a', borderTopWidth: 1, borderTopColor: '#1e293b' },
    iconButton: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e293b', marginRight: 8 },
    followButton: { flex: 1, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginRight: 8 },
    followButtonText: { color: '#0f172a', fontWeight: 'bold' },
    chatButton: { flex: 1, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#334155', marginRight: 8 },
    chatButtonText: { color: 'white', fontWeight: 'bold' },
    callButton: { flex: 1.5, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#db2777' },
    callButtonText: { color: 'white', fontWeight: 'bold' },
    callButtonSubtext: { color: 'rgba(255,255,255,0.7)', fontSize: 10 },
    actionIcon: { fontSize: 24, color: 'white' },
    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' },
    modalContent: { backgroundColor: '#1e293b', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingTop: 12 },
    modalHandle: { width: 48, height: 4, backgroundColor: '#475569', borderRadius: 2, alignSelf: 'center', marginBottom: 24 },
    modalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
    callOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#334155', borderRadius: 16, padding: 16, marginBottom: 12 },
    callOptionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    callOptionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    callOptionDesc: { color: '#94a3b8' },
    callOptionPrice: { marginLeft: 'auto', alignItems: 'flex-end' },
    priceText: { color: '#fbbf24', fontWeight: 'bold' },
    cancelButton: { marginTop: 16, padding: 16 },
    cancelButtonText: { color: '#94a3b8', textAlign: 'center', fontWeight: 'bold' },
});

export default CreatorProfile;
