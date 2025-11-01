import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cadastrar medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={formData.category}
        onChangeText={(text) => handleChange('category', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fabricante"
        value={formData.manufacturer}
        onChangeText={(text) => handleChange('manufacturer', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Validade (YYYY-MM-DD)"
        value={formData.expiryDate}
        onChangeText={(text) => handleChange('expiryDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={formData.quantity}
        onChangeText={(text) => handleChange('quantity', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Lote"
        value={formData.lot}
        onChangeText={(text) => handleChange('lot', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código de barras"
        value={formData.barcode}
        onChangeText={(text) => handleChange('barcode', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16
  },
  content: {
    paddingBottom: 24
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#264653'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  button: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default MedicationForm;
