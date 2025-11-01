import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useInventory } from '../hooks/InventoryContext';

const MovementsScreen = () => {
  const { medications, transactions, recordMovement } = useInventory();

  const handleSubmit = async (movement) => {
    try {
      await recordMovement(movement);
      Alert.alert('Sucesso', 'Movimentação registrada.');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TransactionForm medications={medications} onSubmit={handleSubmit} />
        <View style={styles.listWrapper}>
          <Text style={styles.sectionTitle}>Últimas movimentações</Text>
          <TransactionList data={transactions} />
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

export default MovementsScreen;
