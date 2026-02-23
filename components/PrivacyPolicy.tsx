import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{width: 40}} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.paragraph}>
          This Privacy Policy ("Privacy Policy") describes the types of information that Zingle ("App"), may collect from a user ("You", "Your", or "User") on or through the App, either directly or in connection with other services rendered by Us, (each a "Service", and collectively the "Services"), and how We use, process, disclose and try to protect such information.
        </Text>
        <Text style={styles.paragraph}>
          You acknowledge and agree that Zingle is responsible for the operation and maintenance of the App, and that any information collected and processed on the App is gathered and used only for the purposes of Our business.
        </Text>
        <Text style={styles.paragraph}>
          By accessing or using the App or Services, You acknowledge that You have read, comprehended, and agreed to the privacy policies contained in this Privacy Policy (and to the collection, storage, and processing of Your information in accordance with them).
        </Text>
        <Text style={styles.subHeader}>Compliance</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy is in compliance with the following Laws and Regulations:
        </Text>
        <Text style={styles.listItem}>• Digital Data Protection Act, 2023 (“DPDP Act”)</Text>
        <Text style={styles.listItem}>• Regulation 3(1) of the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021 (“Intermediaries Guidelines”)</Text>
        <Text style={styles.listItem}>• Section 43A and Section 72A of the Information Technology Act, 2000 (“IT Act”)</Text>
        <Text style={styles.listItem}>• Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (“SPDI Rules”)</Text>
        <Text style={styles.paragraph}>
          Capitalised terms not defined here, including the terms Personal Data, shall have the meaning stated in the Digital Data Protection Act, 2023.
        </Text>
        <Text style={styles.paragraph}>
          In compliance with section 5 of the DPDP Act, this policy acts as a notice on collection of your Personal Data and the purpose of its collection; the manner in which rights under section 6(4) & 13 may be exercised; and the manner in which you may make a complaint to the Board.
        </Text>
        <Text style={styles.subHeader}>General Terms</Text>
        <Text style={styles.paragraph}>
          By using the App or Service or providing Us with Your information You confirm that You have read, understood, and agreed to the practises and policies outlined in our Terms of Service and this Privacy Policy and agree to abide by them.
        </Text>
        <Text style={styles.paragraph}>
          If You access or use Services or the App from an overseas location, You are entirely responsible for compliance with any local laws of your location.
        </Text>
        <Text style={styles.paragraph}>
          You consent to the collection, use, sharing, and disclosure of Your information in accordance with this Privacy Policy. We retain the right to alter this Privacy Policy at any time.
        </Text>
        <Text style={styles.subHeader}>Your Consent</Text>
        <Text style={styles.paragraph}>
          By accessing the App, submitting onboarding forms, OTPs, or providing information, you agree to the collection, use, storage, disclosure, and processing of your Personal Information.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Specific Consent:</Text> You consent to us contacting you through SMS, instant messaging, in-app calls, video calls, or email for providing Services or showcasing additional Services.
        </Text>
        <Text style={styles.subHeader}>Information Handling</Text>
        <Text style={styles.paragraph}>
          In order to provide Services, we may require you to provide your contact information to third parties. By using our services, you explicitly consent to such sharing.
        </Text>
        <Text style={styles.paragraph}>
          We may collect Sensitive Personal Data or Information as defined under SPDI Rules, including payment details, contact lists, and service-related records.
        </Text>
        <Text style={styles.subHeader}>Sensitive Personal Data</Text>
        <Text style={styles.listItem}>• Password</Text>
        <Text style={styles.listItem}>• Financial information</Text>
        <Text style={styles.listItem}>• Health information</Text>
        <Text style={styles.listItem}>• Gender / Sexual orientation</Text>
        <Text style={styles.listItem}>• Biometric information</Text>
        <Text style={styles.listItem}>• Medical records</Text>
        <Text style={styles.subHeader}>Disclosure of Information</Text>
        <Text style={styles.paragraph}>
          We may disclose Personal Information to comply with legal obligations, protect national security, prevent crime, or ensure user safety.
        </Text>
        <Text style={styles.paragraph}>
          Subject to applicable laws, Personal Information may be transferred to other corporate bodies in India or abroad that ensure comparable data protection.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: 'white',
    fontSize: 28,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 24,
  },
  subHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  listItem: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 16,
  },
  bold: {
      fontWeight: 'bold',
      color: 'white',
  }
});

export default PrivacyPolicy;
