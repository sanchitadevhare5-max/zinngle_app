import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    TextInput, ScrollView, Platform, Alert, Modal
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useUser } from './UserContext';
import { supabase } from '../supabase';
import { ViewState } from '../types';

const INTERESTS = ['Music', 'Gaming', 'Art', 'Travel', 'Food', 'Comedy', 'Tech', 'Sports', 'Fashion'];

const MAX_DATE = new Date();
const MIN_DATE = new Date(MAX_DATE.getFullYear() - 100, 0, 1);
const DEFAULT_DATE = new Date(MAX_DATE.getFullYear() - 18, MAX_DATE.getMonth(), MAX_DATE.getDate());

interface OnboardingProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onComplete: (userType: 'user' | 'host') => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ currentView, onChangeView, onComplete }) => {
  const { user, fetchProfile } = useUser();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [tempDob, setTempDob] = useState<Date>(DEFAULT_DATE);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name && !username) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedUsername = name.toLowerCase().replace(/\s+/g, '') + randomSuffix;
      setUsername(generatedUsername);
    }
  }, [name]);

  const handleFinishSetup = async () => {
    if (!user) {
        Alert.alert('Error', 'You must be signed in to create a profile.');
        return;
    }
    if (!name || !username || !dob) {
        Alert.alert('Incomplete Profile', 'Please fill out all the required fields.');
        return;
    }

    setLoading(true);
    try {
        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            full_name: name,
            username: username,
            date_of_birth: dob.toISOString(),
            updated_at: new Date(),
        });

        if (error) throw error;
        
        await fetchProfile();
        onComplete('user');

    } catch (error: any) {
        Alert.alert('Error Creating Profile', error.message);
    } finally {
        setLoading(false);
    }
  };

  const handleAndroidDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      setDob(selectedDate);
    }
  };

  const handleIosDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDob(selectedDate);
    }
  };

  const confirmIosDate = () => {
    setDob(tempDob);
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setTempDob(dob || DEFAULT_DATE);
    setShowDatePicker(true);
  };

  const formattedDate = dob
    ? dob.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Select your birth date';

  const renderContent = () => {
    switch (currentView) {
      case ViewState.USER_TYPE_SELECT:
        return (
          <View style={styles.centerContainer}>
            <Text style={styles.title}>How will you use Zinngle?</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => onChangeView(ViewState.PROFILE_SETUP)}>
              <Text style={styles.optionIcon}>👤</Text>
              <Text style={styles.optionText}>I'm a user</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => onComplete('host')}>
              <Text style={styles.optionIcon}>⭐</Text>
              <Text style={styles.optionText}>I'm a host</Text>
            </TouchableOpacity>
          </View>
        );

      case ViewState.PROFILE_SETUP:
        return (
            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.title}>Complete Your Profile</Text>
                <Text style={styles.subtitle}>Let's get to know you better.</Text>

                <Text style={styles.label}>FULL NAME</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g., John Doe" placeholderTextColor="#475569"/>
                
                <Text style={styles.label}>USERNAME</Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="e.g., @johndoe" placeholderTextColor="#475569" autoCapitalize="none"/>
                
                <Text style={styles.label}>DATE OF BIRTH</Text>
                <TouchableOpacity onPress={openDatePicker} style={styles.input}>
                    <Text style={[styles.dateText, !dob && {color: '#475569'}]}>{formattedDate}</Text>
                </TouchableOpacity>

                {Platform.OS === 'android' && showDatePicker && (
                    <DateTimePicker
                        value={dob || DEFAULT_DATE}
                        mode="date"
                        display="calendar"
                        onChange={handleAndroidDateChange}
                        maximumDate={MAX_DATE}
                        minimumDate={MIN_DATE}
                    />
                )}

                {Platform.OS === 'ios' && (
                    <Modal
                        transparent
                        animationType="slide"
                        visible={showDatePicker}
                        onRequestClose={() => setShowDatePicker(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                        <Text style={styles.modalCancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.modalTitle}>Date of Birth</Text>
                                    <TouchableOpacity onPress={confirmIosDate}>
                                        <Text style={styles.modalDoneText}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                                <DateTimePicker
                                    value={tempDob}
                                    mode="date"
                                    display="spinner"
                                    onChange={handleIosDateChange}
                                    maximumDate={MAX_DATE}
                                    minimumDate={MIN_DATE}
                                    textColor="white"
                                />
                            </View>
                        </View>
                    </Modal>
                )}

                <TouchableOpacity style={styles.mainButton} onPress={() => onChangeView(ViewState.INTERESTS_SELECT)}>
                    <Text style={styles.mainButtonText}>Continue</Text>
                </TouchableOpacity>
          </ScrollView>
        );

      case ViewState.INTERESTS_SELECT:
        return (
          <View style={styles.centerContainer}>
            <Text style={styles.title}>What are you into?</Text>
            <View style={styles.interestGrid}>
              {INTERESTS.map(interest => (
                <TouchableOpacity 
                    key={interest} 
                    style={[styles.interestChip, selectedInterests.includes(interest) && styles.selectedChip]}
                    onPress={() => {
                        setSelectedInterests(prev => 
                            prev.includes(interest) 
                            ? prev.filter(i => i !== interest) 
                            : [...prev, interest]
                        );
                    }}
                >
                  <Text style={[styles.chipText, selectedInterests.includes(interest) && styles.selectedChipText]}>{interest}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.mainButton} onPress={handleFinishSetup} disabled={loading}>
              <Text style={styles.mainButtonText}>{loading ? 'Saving...' : 'Finish Setup'}</Text>
            </TouchableOpacity>
          </View>
        );

      default: return null;
    }
  };

  return <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>;
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    formContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    title: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 16 },
    subtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 32 },
    optionButton: { width: '100%', backgroundColor: '#1e293b', padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
    optionIcon: { fontSize: 40, marginBottom: 12 },
    optionText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    input: { backgroundColor: '#1e293b', color: 'white', paddingHorizontal: 16, paddingVertical: 18, borderRadius: 12, fontSize: 16, marginBottom: 16 },
    dateText: { color: 'white', fontSize: 16 },
    label: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
    mainButton: { backgroundColor: '#db2777', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 16 },
    mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    interestGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 },
    interestChip: { backgroundColor: '#1e293b', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 99, margin: 6, borderWidth: 1, borderColor: '#334155' },
    selectedChip: { backgroundColor: '#db2777', borderColor: '#db2777' },
    chipText: { color: 'white', fontWeight: 'bold' },
    selectedChipText: { color: 'white' },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
    modalContent: { backgroundColor: '#1e293b', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 32 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
    modalTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    modalCancelText: { color: '#94a3b8', fontSize: 16 },
    modalDoneText: { color: '#db2777', fontSize: 16, fontWeight: 'bold' },
});

export default Onboarding;
