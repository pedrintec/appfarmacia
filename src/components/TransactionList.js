import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from './Layout';

const TransactionList = ({ data, emptyTitle, emptyDescription }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id?.toString() || `${item.medicationId}-${item.timestamp}`}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.name}>{item.medicationName}</Text>
            <View style={[styles.badge, item.type === 'entrada' ? styles.badgeIn : styles.badgeOut]}>
              <Ionicons
                name={item.type === 'entrada' ? 'arrow-down-circle-outline' : 'arrow-up-circle-outline'}
                size={14}
                color="#fff"
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeLabel}>{item.type === 'entrada' ? 'Entrada' : 'Saída'}</Text>
            </View>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.detailLabel}>Quantidade</Text>
            <Text style={styles.detailValue}>{item.quantity}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.detailLabel}>Motivo</Text>
            <Text style={styles.detailValue}>{item.reason || '—'}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.detailLabel}>Data/Hora</Text>
            <Text style={styles.detailValue}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <EmptyState
          title={emptyTitle || 'Nenhuma movimentação registrada'}
          description={emptyDescription}
          icon="swap-horizontal-outline"
        />
      }
      contentContainerStyle={data.length === 0 && styles.emptyContainer}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a'
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  badgeIn: {
    backgroundColor: '#16a34a'
  },
  badgeOut: {
    backgroundColor: '#dc2626'
  },
  badgeLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12
  },
  badgeIcon: {
    marginRight: 4
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  detailLabel: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500'
  },
  detailValue: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600'
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});

export default TransactionList;
