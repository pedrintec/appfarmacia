import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialState = {
  name: '',
  category: '',
  manufacturer: '',
  expiryDate: '',
  quantity: '0',
  lot: '',
  barcode: ''
};

const MedicationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Informe o nome do medicamento.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      manufacturer: formData.manufacturer.trim(),
      expiryDate: formData.expiryDate,
      quantity: Number(formData.quantity) || 0,
      lot: formData.lot.trim(),
      barcode: formData.barcode.trim()
    };

    onSubmit(payload);
    setFormData(initialState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar medicamento</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flexLarge]}
          placeholder="Nome"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={[styles.input, styles.flexSmall]}
          placeholder="Categoria"
          value={formData.category}
          onChangeText={(text) => handleChange('category', text)}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flexLarge]}
          placeholder="Fabricante"
          value={formData.manufacturer}
          onChangeText={(text) => handleChange('manufacturer', text)}
        />
        <TextInput
          style={[styles.input, styles.flexSmall]}
          placeholder="Validade (YYYY-MM-DD)"
          value={formData.expiryDate}
          onChangeText={(text) => handleChange('expiryDate', text)}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flexSmall]}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={formData.quantity}
          onChangeText={(text) => handleChange('quantity', text)}
        />
        <TextInput
          style={[styles.input, styles.flexSmall]}
          placeholder="Lote"
          value={formData.lot}
          onChangeText={(text) => handleChange('lot', text)}
        />
        <TextInput
          style={[styles.input, styles.flexLarge]}
          placeholder="Código de barras"
          value={formData.barcode}
          onChangeText={(text) => handleChange('barcode', text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 15,
    color: '#1e293b',
    marginHorizontal: 6,
    marginBottom: 12
  },
  flexLarge: {
    flexBasis: '58%'
  },
  flexSmall: {
    flexBasis: '38%'
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  }
});

export default MedicationForm;
