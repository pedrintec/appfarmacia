import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const TransactionList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id?.toString() || `${item.medicationId}-${item.timestamp}`}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.medicationName}</Text>
          <Text style={styles.detail}>Tipo: {item.type === 'entrada' ? 'Entrada' : 'Saída'}</Text>
          <Text style={styles.detail}>Quantidade: {item.quantity}</Text>
          <Text style={styles.detail}>Motivo: {item.reason || '—'}</Text>
          <Text style={styles.detail}>Data/Hora: {new Date(item.timestamp).toLocaleString()}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>Nenhuma movimentação registrada.</Text>}
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 6
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

export default TransactionList;
