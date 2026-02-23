import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { ViewState } from '../types';

interface SystemStatusProps {
    type: ViewState.UPDATE_REQUIRED | ViewState.MAINTENANCE | ViewState.NO_INTERNET;
    onRetry?: () => void;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ type, onRetry }) => {
    
    // Configuration for each screen type
    const config = {
        [ViewState.UPDATE_REQUIRED]: {
            icon: '🚀',
            color: '#db2777',
            title: 'Update Required',
            desc: 'A new version of Zinngle is available! Please update to continue enjoying the best experience.',
            btnText: 'Update Now',
            action: () => Alert.alert("Redirecting", "This would open the App Store.")
        },
        [ViewState.MAINTENANCE]: {
            icon: '🛠️',
            color: '#f59e0b',
            title: 'Under Maintenance',
            desc: 'We are currently performing scheduled maintenance to improve our services. We will be back shortly!',
            btnText: 'Check Status',
            action: () => Alert.alert("Status", "Services are still under maintenance.")
        },
        [ViewState.NO_INTERNET]: {
            icon: '📶',
            color: '#ef4444',
            title: 'No Internet',
            desc: 'It looks like you are offline. Please check your internet connection and try again.',
            btnText: 'Retry Connection',
            action: onRetry || (() => Alert.alert('No Retry Action', 'Please check your connection.'))
        }
    };

    const current = config[type];

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.glow, { backgroundColor: current.color }]} />

            <View style={styles.iconContainer}>
                <Text style={[styles.icon, { color: current.color }]}>{current.icon}</Text>
            </View>

            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.desc}>{current.desc}</Text>

            <TouchableOpacity 
                onPress={current.action}
                style={styles.actionButton}
            >
                <Text style={styles.actionButtonText}>{current.btnText}</Text>
            </TouchableOpacity>
            
            {type === ViewState.UPDATE_REQUIRED && (
                <Text style={styles.versionText}>Version required: 2.1.0</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        padding: 32,
        position: 'relative'
    },
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.15,
        top: '30%',
        alignSelf: 'center'
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 24,
        backgroundColor: '#1e293b',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#334155'
    },
    icon: {
        fontSize: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
        textAlign: 'center'
    },
    desc: {
        color: '#94a3b8',
        marginBottom: 40,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 320,
    },
    actionButton: {
        width: '100%',
        maxWidth: 320,
        backgroundColor: 'white',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#0f172a',
        fontWeight: 'bold',
        fontSize: 16,
    },
    versionText: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 24,
    }
});

export default SystemStatus;
