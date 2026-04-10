import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["All", "Processing", "Shipped", "Delivered"];

const ordersData = [
  {
    id: "1",
    title: "Apple iPhone 13 Pro",
    price: "$999.00",
    status: "Processing",
    image: "https://m.media-amazon.com/images/I/61eDXs9QFNL._SL1500_.jpg",
    details: "Color: Silver | Storage: 256GB",
    date: "Placed on Apr 15",
  },
  {
    id: "2",
    title: "Nike Air Max 270",
    price: "$150.00",
    status: "Shipped",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-270-mens-shoes-KkLcGR.png",
    details: "Size: 10 | Color: Black/Red",
    date: "Placed on Apr 10",
    delivery: "Arriving on Apr 18",
  },
  {
    id: "3",
    title: "Nike Air Max 270",
    price: "$150.00",
    status: "Delivered",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-270-mens-shoes-KkLcGR.png",
    details: "Size: 10 | Color: Black/Red",
    date: "Delivered on Apr 18",
  },
];

const MyOrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredOrders =
    activeTab === "All"
      ? ordersData
      : ordersData.filter((o) => o.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Text style={styles.title}>My Orders</Text>

        {/* TABS */}
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ORDERS */}
        {filteredOrders.map((item) => (
          <View key={item.id} style={styles.card}>

            {/* ORDER HEADER */}
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            {/* PRODUCT */}
            <View style={styles.productRow}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.details}>{item.details}</Text>

                <View style={styles.rowBetween}>
                  <Text style={styles.price}>{item.price}</Text>

                  <Text
                    style={[
                      styles.status,
                      item.status === "Processing" && styles.processing,
                      item.status === "Shipped" && styles.shipped,
                      item.status === "Delivered" && styles.delivered,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* DELIVERY / ACTION */}
            {item.delivery && (
              <View style={styles.deliveryBox}>
                <Text style={styles.deliveryText}>
                  🚚 {item.delivery}
                </Text>

                <TouchableOpacity
                  style={styles.trackBtn}
                  onPress={() =>
                    navigation.navigate("TrackOrder", { order: item })
                  }
                >
                  <Text style={styles.trackText}>Track Order</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* VIEW DETAILS BUTTON */}
            {item.status === "Delivered" && (
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() =>
                  navigation.navigate("OrderDetails", { order: item })
                }
              >
                <Text style={styles.trackText}>View Details</Text>
              </TouchableOpacity>
            )}

          </View>
        ))}

      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.navIcon}>▦</Text>
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Text style={styles.navIcon}>♡</Text>
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 16,
    color: "#000",
  },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#EAECEF",
    borderRadius: 12,
    overflow: "hidden",
  },

  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#2F80ED",
  },

  tabText: {
    color: "#555",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontWeight: "600",
    color: "#000",
  },

  date: {
    color: "#777",
    fontSize: 12,
  },

  productRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 12,
  },

  productName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },

  details: {
    color: "#777",
    marginVertical: 4,
    fontSize: 12,
  },

  price: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#000",
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    overflow: "hidden",
  },

  processing: {
    backgroundColor: "#FCE7C8",
    color: "#B45309",
  },

  shipped: {
    backgroundColor: "#D6E4FF",
    color: "#1D4ED8",
  },

  delivered: {
    backgroundColor: "#D1FAE5",
    color: "#047857",
  },

  deliveryBox: {
    marginTop: 12,
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 10,
  },

  deliveryText: {
    marginBottom: 8,
    color: "#333",
  },

  trackBtn: {
    backgroundColor: "#2F80ED",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  viewBtn: {
    marginTop: 10,
    backgroundColor: "#94A3B8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  trackText: {
    color: "#fff",
    fontWeight: "600",
  },

  bottomNav: {
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  navItem: {
    alignItems: "center",
  },

  navIcon: {
    fontSize: 22,
  },

  navText: {
    fontSize: 12,
    color: "#7C8595",
  },
});