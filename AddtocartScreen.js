import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const initialCart = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
    details: "Silver | 256GB",
    qty: 1,
  },
  {
    id: "2",
    name: "Nike Air Max",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    details: "Size 10 | Black/Red",
    qty: 1,
  },
];

const AddtocartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [cart, setCart] = useState(initialCart);

  // ✅ ADD THIS: receive product
  useEffect(() => {
    if (route.params?.product) {
      const { product, qty } = route.params;

      setCart((prevCart) => {
        // check if already exists
        const existing = prevCart.find((item) => item.id === product.id);

        if (existing) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + qty }
              : item
          );
        } else {
          return [
            ...prevCart,
            {
              id: product.id,
              name: product.name,
              price: parseFloat(product.price),
              image: product.image,
              details: product.category || "Product",
              qty: qty,
            },
          ];
        }
      });
    }
  }, [route.params]);

  const updateQty = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          let newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
          if (newQty < 1) newQty = 1;
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 15;
  const tax = 95;
  const total = subtotal + shipping + tax;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.details}>{item.details}</Text>

        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item.id, "dec")}
          >
            <Text style={styles.btnText}>−</Text>
          </TouchableOpacity>

          <View style={styles.qtyBox}>
            <Text style={styles.qtyText}>{item.qty}</Text>
          </View>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item.id, "inc")}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Row = ({ label, value, bold }) => (
    <View style={styles.row}>
      <Text style={[styles.rowText, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowText, bold && styles.bold]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>My Cart</Text>

        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />

      <View style={styles.summary}>
        <Row label="Subtotal" value={`$${subtotal}`} />
        <Row label="Shipping" value={`$${shipping}`} />
        <Row label="Tax" value={`$${tax}`} />
        <Row label="Total" value={`$${total}`} bold />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddtocartScreen;

const BLUE = "#2979ff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef3ff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#fff",
    elevation: 3,
  },

  backBtn: {
    fontSize: 22,
    color: BLUE,
    fontWeight: "bold",
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: BLUE,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: "cover",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  details: {
    color: "#666",
    marginVertical: 5,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyBtn: {
    width: 35,
    height: 35,
    backgroundColor: BLUE,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  qtyBox: {
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BLUE,
    borderRadius: 8,
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  rightSection: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  remove: {
    color: "red",
    fontWeight: "bold",
  },

  summary: {
    backgroundColor: "#fff",
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  rowText: {
    fontSize: 16,
    color: "#333",
  },

  bold: {
    fontWeight: "bold",
    fontSize: 18,
    color: BLUE,
  },

  footer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#dbe4ff",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: BLUE,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryText: {
    fontWeight: "bold",
    color: BLUE,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
});