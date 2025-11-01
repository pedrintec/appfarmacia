import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Screen = ({ title, subtitle, children, actions = [] }) => (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.content}>
      {(title || subtitle) && (
        <View style={styles.header}>
          <View style={styles.headerText}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {actions.length > 0 && (
            <View style={styles.actions}>
              {actions.map((action) => (
                <TouchableOpacity
                  key={action.label}
                  style={styles.actionButton}
                  onPress={action.onPress}
                >
                  {action.icon && (
                    <Ionicons
                      name={action.icon}
                      size={18}
                      color="#0f172a"
                      style={styles.actionIcon}
                    />
                  )}
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
      {children}
    </ScrollView>
  </SafeAreaView>
);

export const SectionCard = ({ title, description, right, children, style }) => (
  <View style={[styles.section, style]}>
    {(title || description || right) && (
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderText}>
          {title && <Text style={styles.sectionTitle}>{title}</Text>}
          {description && <Text style={styles.sectionSubtitle}>{description}</Text>}
        </View>
        {right && <View>{right}</View>}
      </View>
    )}
    {children}
  </View>
);

export const InfoCard = ({ icon, title, value, tone = 'primary' }) => (
  <View style={[styles.infoCard, styles[`${tone}Info`]]}>
    <View style={styles.infoHeader}>
      {icon && <Ionicons name={icon} size={22} color="#fff" style={styles.infoIcon} />}
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export const EmptyState = ({ title, description, icon = 'alert-circle-outline' }) => (
  <View style={styles.emptyWrapper}>
    <View style={styles.emptyIconWrapper}>
      <Ionicons name={icon} size={26} color="#64748b" />
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    {description && <Text style={styles.emptyDescription}>{description}</Text>}
  </View>
);

export const Chip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
  >
    <Text style={[styles.chipLabel, active ? styles.chipLabelActive : styles.chipLabelInactive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef2ff'
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  headerText: {
    flex: 1,
    paddingRight: 12
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a'
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginTop: 4
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -8,
    marginTop: -8
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
    marginTop: 8
  },
  actionLabel: {
    color: '#0f172a',
    fontWeight: '600'
  },
  actionIcon: {
    marginRight: 6
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  sectionHeaderText: {
    flex: 1,
    paddingRight: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a'
  },
  sectionSubtitle: {
    marginTop: 6,
    color: '#475569',
    fontSize: 14
  },
  infoCard: {
    flexGrow: 1,
    minWidth: 140,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 6
  },
  primaryInfo: {
    backgroundColor: '#2563eb'
  },
  secondaryInfo: {
    backgroundColor: '#0891b2'
  },
  successInfo: {
    backgroundColor: '#16a34a'
  },
  dangerInfo: {
    backgroundColor: '#dc2626'
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  infoIcon: {
    marginRight: 8
  },
  infoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  infoValue: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700'
  },
  emptyWrapper: {
    paddingVertical: 32,
    alignItems: 'center'
  },
  emptyIconWrapper: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    padding: 12,
    marginBottom: 12
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155'
  },
  emptyDescription: {
    marginTop: 4,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 16
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },
  chipInactive: {
    backgroundColor: '#e2e8f0'
  },
  chipActive: {
    backgroundColor: '#2563eb'
  },
  chipLabel: {
    fontWeight: '600'
  },
  chipLabelInactive: {
    color: '#1e293b'
  },
  chipLabelActive: {
    color: '#fff'
  }
});

export default Screen;
