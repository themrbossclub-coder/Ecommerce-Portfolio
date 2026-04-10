import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const ShippingAddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "Alex Johnson",
      address: "123, MG Road, Near Metro Station",
      city: "Bangalore, Karnataka - 560001",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: "2",
      name: "Alex Johnson",
      address: "456, JP Nagar 2nd Phase",
      city: "Bangalore, Karnataka - 560078",
      phone: "+91 98765 67890",
      isDefault: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleDelete = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (editId) {
      setAddresses(
        addresses.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        )
      );
    } else {
      setAddresses([
        ...addresses,
        { ...form, id: Date.now().toString(), isDefault: false },
      ]);
    }
    setModalVisible(false);
    setForm({ name: "", address: "", city: "", phone: "" });
    setEditId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon
          name={item.isDefault ? "checkmark-circle" : "location-outline"}
          size={22}
          color={item.isDefault ? "#16A34A" : "#6B7280"}
        />
        {item.isDefault && (
          <Text style={styles.defaultTag}>DEFAULT</Text>
        )}
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.text}>{item.address}</Text>
      <Text style={styles.text}>{item.city}</Text>
      <Text style={styles.text}>{item.phone}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Shipping Address</Text>

        <Icon name="cart-outline" size={24} color="#000" />
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>+ Add New Address</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editId ? "Edit Address" : "Add Address"}
          </Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#999"
            style={styles.input}
            value={form.address}
            onChangeText={(text) => setForm({ ...form, address: text })}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#999"
            style={styles.input}
            value={form.city}
            onChangeText={(text) => setForm({ ...form, city: text })}
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#999"
            style={styles.input}
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  row: { flexDirection: "row", alignItems: "center" },

  defaultTag: {
    marginLeft: 8,
    backgroundColor: "#FEF3C7",
    color: "#92400E",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    fontSize: 11,
    fontWeight: "600",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    color: "#000",
  },

  text: {
    color: "#6B7280",
    marginTop: 2,
    fontSize: 13,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  edit: {
    color: "#2563EB",
    marginRight: 15,
    fontWeight: "500",
  },

  delete: {
    color: "#DC2626",
    fontWeight: "500",
  },

  addBtn: {
    backgroundColor: "#2563EB",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#000",
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },

  cancel: {
    textAlign: "center",
    marginTop: 12,
    color: "#6B7280",
  },
});