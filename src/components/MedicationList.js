import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const MedicationItem = ({ item, isLowStock, isExpiringSoon }) => {
  return (
    <View style={[styles.card, (isLowStock || isExpiringSoon) && styles.alertCard]}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        {isLowStock && <Text style={[styles.tag, styles.lowStock]}>Baixo estoque</Text>}
        {isExpiringSoon && <Text style={[styles.tag, styles.expiring]}>Vencimento próximo</Text>}
      </View>
      <Text style={styles.detail}>Categoria: {item.category || '—'}</Text>
      <Text style={styles.detail}>Fabricante: {item.manufacturer || '—'}</Text>
      <Text style={styles.detail}>Validade: {item.expiryDate || '—'}</Text>
      <Text style={styles.detail}>Quantidade: {item.quantity}</Text>
      <Text style={styles.detail}>Lote: {item.lot || '—'}</Text>
      <Text style={styles.detail}>Código de barras: {item.barcode || '—'}</Text>
    </View>
  );
};

const MedicationList = ({ data, lowStock, expiringSoon }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id?.toString() || item.name}
      renderItem={({ item }) => (
        <MedicationItem
          item={item}
          isLowStock={lowStock.includes(item.id)}
          isExpiringSoon={expiringSoon.includes(item.id)}
        />
      )}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum medicamento cadastrado.</Text>}
      contentContainerStyle={data.length === 0 && styles.emptyContainer}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  alertCard: {
    borderColor: '#f4a261'
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 8
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264653',
    marginRight: 8
  },
  tag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4
  },
  lowStock: {
    backgroundColor: '#e63946'
  },
  expiring: {
    backgroundColor: '#f4a261'
  },
  detail: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748b',
    fontSize: 16
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});

export default MedicationList;
