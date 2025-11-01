import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useInventory } from '../hooks/InventoryContext';

const DashboardScreen = () => {
  const { medications, transactions, lowStock, expiringSoon, loading } = useInventory();

  const entries = transactions.filter((item) => item.type === 'entrada').length;
  const exits = transactions.filter((item) => item.type === 'saida').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Resumo do estoque</Text>
      {loading ? (
        <Text style={styles.loading}>Carregando dados...</Text>
      ) : (
        <View style={styles.grid}>
          <View style={[styles.card, styles.primary]}>
            <Text style={styles.cardLabel}>Medicamentos cadastrados</Text>
            <Text style={styles.cardValue}>{medications.length}</Text>
          </View>
          <View style={[styles.card, styles.secondary]}>
            <Text style={styles.cardLabel}>Movimentações (entradas)</Text>
            <Text style={styles.cardValue}>{entries}</Text>
          </View>
          <View style={[styles.card, styles.tertiary]}>
            <Text style={styles.cardLabel}>Movimentações (saídas)</Text>
            <Text style={styles.cardValue}>{exits}</Text>
          </View>
        </View>
      )}

      <View style={styles.alertSection}>
        <Text style={styles.sectionTitle}>Alertas</Text>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Baixo estoque</Text>
          <Text style={styles.alertValue}>{lowStock.length}</Text>
          <Text style={styles.alertDescription}>Medicamentos abaixo de 10 unidades.</Text>
        </View>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Vencimento próximo</Text>
          <Text style={styles.alertValue}>{expiringSoon.length}</Text>
          <Text style={styles.alertDescription}>Vencem nos próximos 30 dias.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  content: {
    padding: 16,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b'
  },
  loading: {
    color: '#475569'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16
  },
  primary: {
    backgroundColor: '#2a9d8f'
  },
  secondary: {
    backgroundColor: '#264653'
  },
  tertiary: {
    backgroundColor: '#e76f51'
  },
  cardLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8
  },
  cardValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold'
  },
  alertSection: {
    marginTop: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1e293b'
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  alertValue: {
    fontSize: 32,
    color: '#e63946',
    fontWeight: 'bold',
    marginVertical: 6
  },
  alertDescription: {
    color: '#475569'
  }
});

export default DashboardScreen;
