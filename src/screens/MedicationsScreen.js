import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MedicationForm from '../components/MedicationForm';
import MedicationList from '../components/MedicationList';
import { useInventory } from '../hooks/InventoryContext';

const MedicationsScreen = () => {
  const { medications, addMedication, lowStock, expiringSoon } = useInventory();

  const handleSubmit = async (payload) => {
    try {
      await addMedication(payload);
      Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso.');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <MedicationForm onSubmit={handleSubmit} />
        <View style={styles.listWrapper}>
          <Text style={styles.sectionTitle}>Medicamentos cadastrados</Text>
          <MedicationList data={medications} lowStock={lowStock} expiringSoon={expiringSoon} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  content: {
    padding: 16,
    paddingBottom: 60
  },
  listWrapper: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12
  }
});

export default MedicationsScreen;
