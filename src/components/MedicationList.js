import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from './Layout';

const MedicationItem = ({ item, isLowStock, isExpiringSoon }) => {
  return (
    <View style={[styles.card, (isLowStock || isExpiringSoon) && styles.alertCard]}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        {isLowStock && (
          <View style={[styles.tag, styles.lowStock]}>
            <Ionicons name="trending-down" size={14} color="#fff" style={styles.tagIcon} />
            <Text style={styles.tagText}>Baixo estoque</Text>
          </View>
        )}
        {isExpiringSoon && (
          <View style={[styles.tag, styles.expiring]}>
            <Ionicons name="alarm-outline" size={14} color="#fff" style={styles.tagIcon} />
            <Text style={styles.tagText}>Vencimento próximo</Text>
          </View>
        )}
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.detailLabel}>Categoria</Text>
        <Text style={styles.detailValue}>{item.category || '—'}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.detailLabel}>Fabricante</Text>
        <Text style={styles.detailValue}>{item.manufacturer || '—'}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.detailLabel}>Validade</Text>
        <Text style={[styles.detailValue, isExpiringSoon && styles.highlight]}>{item.expiryDate || '—'}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.detailLabel}>Quantidade</Text>
        <Text style={[styles.detailValue, isLowStock && styles.highlight]}>{item.quantity}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.detailLabel}>Lote</Text>
        <Text style={styles.detailValue}>{item.lot || '—'}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.detailLabel}>Código de barras</Text>
        <Text style={styles.detailValue}>{item.barcode || '—'}</Text>
      </View>
    </View>
  );
};

const MedicationList = ({ data, lowStock, expiringSoon, emptyTitle, emptyDescription }) => {
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
      ListEmptyComponent={
        <EmptyState
          title={emptyTitle || 'Nenhum medicamento encontrado'}
          description={emptyDescription}
          icon="medkit-outline"
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
  alertCard: {
    borderColor: '#f97316'
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginRight: 8
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 6,
    marginTop: 4
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  tagIcon: {
    marginRight: 4
  },
  lowStock: {
    backgroundColor: '#dc2626'
  },
  expiring: {
    backgroundColor: '#f97316'
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
  highlight: {
    color: '#dc2626'
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});

export default MedicationList;
