import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

const categories = [
  { id: 1, name: "New Arrivals", image: "https://img.icons8.com/color/96/discount.png" },
  { id: 2, name: "Fashion", image: "https://img.icons8.com/color/96/t-shirt.png" },
  { id: 3, name: "Electronics", image: "https://img.icons8.com/color/96/smartphone.png" },
  { id: 4, name: "Home", image: "https://img.icons8.com/color/96/home.png" },
  { id: 5, name: "Shoes", image: "https://img.icons8.com/color/96/sneakers.png" },
  { id: 6, name: "Beauty", image: "https://img.icons8.com/color/96/lipstick.png" },
  { id: 7, name: "Gaming", image: "https://img.icons8.com/color/96/controller.png" },
];

const products = [
 

  // Electronics (10)
  { id: 1, name: 'Headphones', price: '$99', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
  { id: 2, name: 'Smartphone', price: '$699', category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
  { id: 3, name: 'Laptop', price: '$1200', category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
  { id: 4, name: 'Speaker', price: '$49', category: 'Electronics', image: 'https://images.unsplash.com/photo-1585386959984-a41552231658' },
  { id: 5, name: 'Mouse', price: '$35', category: 'Electronics', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7' },
  { id: 6, name: 'Keyboard', price: '$60', category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
  { id: 7, name: 'Monitor', price: '$250', category: 'Electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf' },
  { id: 8, name: 'Tablet', price: '$400', category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3' },
  { id: 9, name: 'Camera', price: '$850', category: 'Electronics', image: 'https://images.unsplash.com/photo-1519183071298-a2962be96c6e' },
  { id: 10, name: 'Smart TV', price: '$999', category: 'Electronics', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6' },

  // Fashion (10)
  { id: 11, name: 'T-Shirt', price: '$30', category: 'Fashion', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b' },
  { id: 12, name: 'Jacket', price: '$120', category: 'Fashion', image: 'https://images.unsplash.com/photo-1520975922284-9e0ce827d2df' },
  { id: 13, name: 'Hoodie', price: '$60', category: 'Fashion', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7' },
  { id: 14, name: 'Jeans', price: '$80', category: 'Fashion', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246' },
  { id: 15, name: 'Dress', price: '$90', category: 'Fashion', image: 'https://images.unsplash.com/photo-1495121605193-b116b5b09a4b' },
  { id: 16, name: 'Sunglasses', price: '$50', category: 'Fashion', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083' },
  { id: 17, name: 'Cap', price: '$20', category: 'Fashion', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee' },
  { id: 18, name: 'Shirt', price: '$55', category: 'Fashion', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157' },
  { id: 19, name: 'Blazer', price: '$150', category: 'Fashion', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7' },
  { id: 20, name: 'Sweater', price: '$70', category: 'Fashion', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990' },

  // Shoes (10)
  { id: 21, name: 'Running Shoes', price: '$120', category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
  { id: 22, name: 'Sneakers', price: '$90', category: 'Shoes', image: 'https://images.unsplash.com/photo-1519741497674-611481863552' },
  { id: 23, name: 'Boots', price: '$140', category: 'Shoes', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f' },
  { id: 24, name: 'Sandals', price: '$40', category: 'Shoes', image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9' },
  { id: 25, name: 'Slippers', price: '$25', category: 'Shoes', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519' },
  { id: 26, name: 'Heels', price: '$130', category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2' },
  { id: 27, name: 'Sports Shoes', price: '$100', category: 'Shoes', image: 'https://images.unsplash.com/photo-1528701800489-20be3c3c1e3b' },
  { id: 28, name: 'Canvas Shoes', price: '$60', category: 'Shoes', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77' },
  { id: 29, name: 'Loafers', price: '$85', category: 'Shoes', image: 'https://images.unsplash.com/photo-1595341595379-cf0f4cfcf9e6' },
  { id: 30, name: 'Formal Shoes', price: '$110', category: 'Shoes', image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6' },

  // Beauty (10)
  { id: 31, name: 'Lipstick', price: '$25', category: 'Beauty', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa' },
  { id: 32, name: 'Perfume', price: '$60', category: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9' },
  { id: 33, name: 'Face Cream', price: '$40', category: 'Beauty', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519' },
  { id: 34, name: 'Makeup Kit', price: '$90', category: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348' },
  { id: 35, name: 'Nail Polish', price: '$15', category: 'Beauty', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371' },
  { id: 36, name: 'Hair Dryer', price: '$70', category: 'Beauty', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707' },
  { id: 37, name: 'Face Wash', price: '$20', category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883' },
  { id: 38, name: 'Serum', price: '$55', category: 'Beauty', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b' },
  { id: 39, name: 'Foundation', price: '$45', category: 'Beauty', image: 'https://images.unsplash.com/photo-1596704017254-9a7a6d68c2c9' },
  { id: 40, name: 'Compact Powder', price: '$35', category: 'Beauty', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },

  // Home (10)
  { id: 41, name: 'Sofa', price: '$900', category: 'Home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7' },
  { id: 42, name: 'Lamp', price: '$45', category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c' },
  { id: 43, name: 'Chair', price: '$120', category: 'Home', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4' },
  { id: 44, name: 'Bed', price: '$700', category: 'Home', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
  { id: 45, name: 'Carpet', price: '$150', category: 'Home', image: 'https://images.unsplash.com/photo-1582582494700-0c3d9f92d7c3' },
  { id: 46, name: 'Curtains', price: '$80', category: 'Home', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4' },
  { id: 47, name: 'Dining Table', price: '$500', category: 'Home', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511' },
  { id: 48, name: 'Bookshelf', price: '$200', category: 'Home', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4' },
  { id: 49, name: 'Plant', price: '$35', category: 'Home', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6' },
  { id: 50, name: 'Wall Decor', price: '$60', category: 'Home', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511' },

];


const HomeScreen = () => {
  const navigation = useNavigation();

  // ✅ NEW: selected category state
  const [selectedCategory, setSelectedCategory] = useState("New Arrivals");
const [searchQuery, setSearchQuery] = useState("");

  // ✅ FILTER LOGIC
 const filteredProducts = products.filter((item) => {
  const matchCategory =
    selectedCategory === "New Arrivals" ||
    item.category === selectedCategory;

  const matchSearch = item.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  return matchCategory && matchSearch;
});

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      {item.tag && (
        <View style={[styles.tag, item.tag === "SALE" ? styles.saleTag : styles.newTag]}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      )}

      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hello, Alex 👋</Text>
            <Text style={styles.subtitle}>Explore our new collections</Text>
          </View>

          <TouchableOpacity
            style={styles.cartIcon}
            onPress={() => navigation.navigate("AddtocartScreen")}
          >
            <Text style={{ fontSize: 22 }}>🛒</Text>
            <View style={styles.cartBadge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
         <TextInput
  placeholder="Search products..."
  placeholderTextColor="#888"
  style={styles.searchInput}
  value={searchQuery}
  onChangeText={(text) => setSearchQuery(text)}
/>
        </View>

        {/* ✅ CATEGORIES (CLICKABLE) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryItem}
              onPress={() => setSelectedCategory(item.name)}
            >
              <View style={styles.categoryCircle}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
              </View>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && { color: "#2F80ED", fontWeight: "bold" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* BANNER */}
        <View style={styles.banner}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60",
            }}
            style={styles.bannerImage}
          />

          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Summer Sale</Text>
            <Text style={styles.bannerSubtitle}>Up to 50% OFF</Text>

            <TouchableOpacity style={styles.shopButton}>
              <Text style={{ color: "white", fontWeight: "600" }}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRODUCTS */}
        <View style={styles.productHeader}>
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <FlatList
          data={filteredProducts}   // ✅ FILTERED DATA
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.navIcon, styles.activeNav]}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.navIcon}>▦</Text>
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Favourites')}
        >
          <Text style={styles.navIcon}>♡</Text>
          <Text style={styles.navText}>Favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
  onPress={() => navigation.navigate('ApiTest')}
  style={{
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  }}
>
  <Text style={{ color: 'white' }}>Go to API Test</Text>
</TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

/* STYLES — KEEP SAME */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  hello: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    color: "gray",
    marginTop: 4,
  },

  cartIcon: {
    position: "relative",
  },

  cartBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 3,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111",
  },

  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },

  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  categoryImage: {
    width: 35,
    height: 35,
  },

  categoryText: {
    marginTop: 6,
    fontSize: 12,
    color: "#333",
  },

  banner: {
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },

  bannerImage: {
    width: "100%",
    height: 150,
  },

  bannerContent: {
    position: "absolute",
    left: 15,
    top: 20,
  },

  bannerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerSubtitle: {
    color: "white",
    marginBottom: 10,
    marginTop: 4,
  },

  shopButton: {
    backgroundColor: "#2d3e50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 10,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },

  viewAll: {
    color: "#2874F0",
    fontWeight: "600",
  },

  productCard: {
    backgroundColor: "white",
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  productName: {
    fontWeight: "600",
    marginTop: 8,
    color: "#222",
  },

  productPrice: {
    color: "#555",
    marginTop: 4,
  },

  tag: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    zIndex: 2,
  },

  saleTag: {
    backgroundColor: "red",
  },

  newTag: {
    backgroundColor: "#2b7cff",
  },

  tagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  bottomNav: {
  height: 78,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#EAEAEA",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: 8,
},

navItem: {
  alignItems: "center",
  justifyContent: "center",
},

navIcon: {
  fontSize: 24,
  color: "#7C8595",
  marginBottom: 4,
},

navText: {
  fontSize: 13,
  color: "#7C8595",
},

activeNav: {
  color: "#2F80ED",
},

activeNavText: {
  color: "#2F80ED",
  fontWeight: "700",
},
}); 