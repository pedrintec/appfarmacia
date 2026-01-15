import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useInventory } from '../hooks/InventoryContext';
import TransactionList from '../components/TransactionList';

const ReportsScreen = () => {
  const { getTransactionsForPeriod, exportCsv } = useInventory();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [items, setItems] = useState([]);

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      alert('Informe a data inicial e final no formato YYYY-MM-DD.');
      return;
    }
    const data = await getTransactionsForPeriod(startDate, endDate);
    setItems(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Relatórios</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Data inicial</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChangeText={setStartDate}
          />
          <Text style={styles.label}>Data final</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={endDate}
            onChangeText={setEndDate}
          />
          <TouchableOpacity style={styles.button} onPress={handleGenerate}>
            <Text style={styles.buttonText}>Gerar relatório</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondary]} onPress={exportCsv}>
            <Text style={styles.buttonText}>Exportar CSV</Text>
          </TouchableOpacity>
        </View>
        <TransactionList data={items} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16
  },
  form: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#264653'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  button: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  secondary: {
    backgroundColor: '#264653'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ReportsScreen;
