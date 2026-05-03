import React, { useState, useEffect, useCallback } from "react";
import { ShoppingCart, User, Home, UtensilsCrossed, ClipboardList, MapPin, Search, ArrowLeft, Plus, Minus, Trash2, Phone, Star, Clock, X, ChevronRight, Truck, CreditCard, Wallet, Banknote, Edit, Trash, Check } from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { emoji: "🍕", label: "Pizza" },
  { emoji: "🍔", label: "Burgers" },
  { emoji: "🍣", label: "Sushi" },
  { emoji: "🌮", label: "Tacos" },
  { emoji: "🍜", label: "Noodles" },
  { emoji: "🥗", label: "Salads" },
  { emoji: "🍛", label: "North Indian" },
  { emoji: "🥡", label: "Chinese" },
  { emoji: "🧁", label: "Desserts" },
  { emoji: "🍵", label: "Snacks & Tea" },
  { emoji: "🥙", label: "Mughlai" },
  { emoji: "🌯", label: "Mexican" },
  { emoji: "🇯🇵", label: "Japanese" },
  { emoji: "🥦", label: "Salads & Healthy" },
];

type Restaurant = { id: number; name: string; cuisine: string; rating: number; time: string; fee: number; open: boolean; emoji: string; gradient: string; isNew?: boolean };

const RESTAURANTS: Restaurant[] = [
  { id: 1, name: "Blaze Pizza Co.", cuisine: "Pizza", rating: 4.5, time: "25–35 min", fee: 40, open: true, emoji: "🍕", gradient: "from-orange-600 to-red-600" },
  { id: 2, name: "Burger Republic", cuisine: "Burgers", rating: 4.7, time: "20–30 min", fee: 30, open: true, emoji: "🍔", gradient: "from-yellow-600 to-orange-600" },
  { id: 3, name: "Tokyo Bites", cuisine: "Sushi", rating: 4.8, time: "30–40 min", fee: 50, open: true, emoji: "🍣", gradient: "from-pink-600 to-rose-600" },
  { id: 4, name: "Taco Loco", cuisine: "Tacos", rating: 4.3, time: "15–25 min", fee: 25, open: true, emoji: "🌮", gradient: "from-green-600 to-emerald-600" },
  { id: 5, name: "Noodle Nirvana", cuisine: "Noodles", rating: 4.6, time: "20–30 min", fee: 35, open: true, emoji: "🍜", gradient: "from-amber-600 to-yellow-600" },
  { id: 6, name: "Green Bowl", cuisine: "Salads", rating: 4.4, time: "15–20 min", fee: 20, open: true, emoji: "🥗", gradient: "from-lime-600 to-green-600" },
  { id: 7, name: "Crust & Crumb", cuisine: "Pizza", rating: 4.2, time: "30–40 min", fee: 35, open: false, emoji: "🍕", gradient: "from-red-700 to-orange-500" },
  { id: 8, name: "Smash Stack", cuisine: "Burgers", rating: 4.9, time: "20–25 min", fee: 45, open: true, emoji: "🍔", gradient: "from-orange-700 to-amber-500" },
  { id: 9, name: "Sushi Sensei", cuisine: "Sushi", rating: 4.6, time: "35–45 min", fee: 60, open: true, emoji: "🍣", gradient: "from-violet-600 to-pink-600" },
  { id: 10, name: "El Fuego Cantina", cuisine: "Tacos", rating: 4.1, time: "20–30 min", fee: 30, open: false, emoji: "🌮", gradient: "from-red-600 to-yellow-600" },
  // New restaurants
  { id: 11, name: "Burger Barn", cuisine: "Burgers", rating: 4.1, time: "30–40 min", fee: 35, open: true, emoji: "🍔", gradient: "from-yellow-700 to-red-500" },
  { id: 12, name: "Spice Garden", cuisine: "North Indian", rating: 4.4, time: "35–45 min", fee: 29, open: true, emoji: "🍛", gradient: "from-red-600 to-amber-600", isNew: true },
  { id: 13, name: "Dragon Wok", cuisine: "Chinese", rating: 4.2, time: "25–35 min", fee: 32, open: true, emoji: "🥡", gradient: "from-rose-600 to-red-700" },
  { id: 14, name: "The Waffle House", cuisine: "Desserts", rating: 4.6, time: "20–30 min", fee: 25, open: true, emoji: "🧇", gradient: "from-amber-500 to-yellow-500", isNew: true },
  { id: 15, name: "Green Bowl Express", cuisine: "Salads & Healthy", rating: 4.3, time: "20–25 min", fee: 20, open: true, emoji: "🥦", gradient: "from-emerald-600 to-teal-500" },
  { id: 16, name: "Tandoor Tales", cuisine: "Mughlai", rating: 4.5, time: "40–50 min", fee: 39, open: true, emoji: "🥙", gradient: "from-orange-700 to-red-700" },
  { id: 17, name: "Pizza Planet", cuisine: "Pizza", rating: 4.0, time: "30–35 min", fee: 30, open: true, emoji: "🍕", gradient: "from-blue-600 to-indigo-600" },
  { id: 18, name: "Sushi Sakura", cuisine: "Japanese", rating: 4.7, time: "45–55 min", fee: 49, open: true, emoji: "🌸", gradient: "from-pink-500 to-fuchsia-600", isNew: true },
  { id: 19, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.2, time: "25–30 min", fee: 28, open: true, emoji: "🌯", gradient: "from-lime-500 to-yellow-500" },
  { id: 20, name: "Chai & Bites", cuisine: "Snacks & Tea", rating: 4.4, time: "15–20 min", fee: 20, open: true, emoji: "🍵", gradient: "from-amber-700 to-orange-500" },
];

type MenuItem = { id: number; name: string; desc: string; price: number; emoji: string; category: string; restaurantId: number; veg: boolean; mostOrdered?: boolean };

const MENU_ITEMS: MenuItem[] = [
  // Blaze Pizza Co. (1)
  { id: 101, name: "Garlic Bread", desc: "Crispy baguette with garlic butter", price: 129, emoji: "🧄", category: "Starters", restaurantId: 1, veg: true },
  { id: 102, name: "Bruschetta", desc: "Toasted bread with tomato & basil", price: 159, emoji: "🍅", category: "Starters", restaurantId: 1, veg: true },
  { id: 103, name: "Margherita Pizza", desc: "Classic tomato, mozzarella, basil", price: 299, emoji: "🍕", category: "Mains", restaurantId: 1, veg: true, mostOrdered: true },
  { id: 104, name: "Pepperoni Feast", desc: "Loaded pepperoni with cheese", price: 399, emoji: "🍕", category: "Mains", restaurantId: 1, veg: false },
  { id: 105, name: "Cola", desc: "Chilled 330ml can", price: 59, emoji: "🥤", category: "Drinks", restaurantId: 1, veg: true },
  { id: 106, name: "Tiramisu", desc: "Classic Italian coffee dessert", price: 199, emoji: "🍰", category: "Desserts", restaurantId: 1, veg: true },
  // Burger Republic (2)
  { id: 201, name: "Fries Basket", desc: "Golden crispy fries with dip", price: 99, emoji: "🍟", category: "Starters", restaurantId: 2, veg: true },
  { id: 202, name: "Onion Rings", desc: "Beer-battered onion rings", price: 129, emoji: "🧅", category: "Starters", restaurantId: 2, veg: true },
  { id: 203, name: "Classic Smash", desc: "Double patty, cheese, pickles", price: 249, emoji: "🍔", category: "Mains", restaurantId: 2, veg: false, mostOrdered: true },
  { id: 204, name: "BBQ Bacon Burger", desc: "Smoky BBQ sauce with bacon", price: 329, emoji: "🍔", category: "Mains", restaurantId: 2, veg: false },
  { id: 205, name: "Milkshake", desc: "Thick vanilla shake", price: 149, emoji: "🥛", category: "Drinks", restaurantId: 2, veg: true },
  { id: 206, name: "Brownie Sundae", desc: "Warm brownie with ice cream", price: 179, emoji: "🍫", category: "Desserts", restaurantId: 2, veg: true },
  // Tokyo Bites (3)
  { id: 301, name: "Edamame", desc: "Steamed soy beans with salt", price: 119, emoji: "🫛", category: "Starters", restaurantId: 3, veg: true },
  { id: 302, name: "Miso Soup", desc: "Traditional Japanese soup", price: 99, emoji: "🍜", category: "Starters", restaurantId: 3, veg: true },
  { id: 303, name: "Salmon Nigiri (4pc)", desc: "Fresh salmon over rice", price: 449, emoji: "🍣", category: "Mains", restaurantId: 3, veg: false, mostOrdered: true },
  { id: 304, name: "Dragon Roll", desc: "Eel, avocado, tobiko", price: 499, emoji: "🐉", category: "Mains", restaurantId: 3, veg: false },
  { id: 305, name: "Matcha Latte", desc: "Iced ceremonial matcha", price: 179, emoji: "🍵", category: "Drinks", restaurantId: 3, veg: true },
  { id: 306, name: "Mochi Ice Cream", desc: "Assorted 3pc", price: 159, emoji: "🍡", category: "Desserts", restaurantId: 3, veg: true },
  // Taco Loco (4)
  { id: 401, name: "Nachos Grande", desc: "Loaded nachos with cheese", price: 199, emoji: "🧀", category: "Starters", restaurantId: 4, veg: true },
  { id: 402, name: "Chicken Tacos (3pc)", desc: "Grilled chicken, salsa, lime", price: 279, emoji: "🌮", category: "Mains", restaurantId: 4, veg: false },
  { id: 403, name: "Churros", desc: "Cinnamon sugar with chocolate dip", price: 149, emoji: "🍩", category: "Desserts", restaurantId: 4, veg: true },
  // Noodle Nirvana (5)
  { id: 501, name: "Spring Rolls", desc: "Crispy veggie rolls", price: 139, emoji: "🥟", category: "Starters", restaurantId: 5, veg: true },
  { id: 502, name: "Pad Thai", desc: "Stir-fried rice noodles", price: 259, emoji: "🍜", category: "Mains", restaurantId: 5, veg: false, mostOrdered: true },
  { id: 503, name: "Ramen Tonkotsu", desc: "Rich pork bone broth ramen", price: 349, emoji: "🍜", category: "Mains", restaurantId: 5, veg: false },
  // Green Bowl (6)
  { id: 601, name: "Caesar Salad", desc: "Romaine, parmesan, croutons", price: 199, emoji: "🥗", category: "Mains", restaurantId: 6, veg: true },
  { id: 602, name: "Smoothie Bowl", desc: "Acai, banana, granola", price: 229, emoji: "🫐", category: "Drinks", restaurantId: 6, veg: true },
  // Burger Barn (11)
  { id: 1101, name: "Classic Smash Burger", desc: "Juicy smashed patty with cheese", price: 199, emoji: "🍔", category: "Mains", restaurantId: 11, veg: false, mostOrdered: true },
  { id: 1102, name: "BBQ Chicken Burger", desc: "Grilled chicken with BBQ glaze", price: 229, emoji: "🍗", category: "Mains", restaurantId: 11, veg: false },
  { id: 1103, name: "Loaded Fries", desc: "Fries with cheese & jalapenos", price: 129, emoji: "🍟", category: "Starters", restaurantId: 11, veg: true },
  { id: 1104, name: "Crispy Chicken Wrap", desc: "Fried chicken in a tortilla wrap", price: 179, emoji: "🌯", category: "Mains", restaurantId: 11, veg: false },
  { id: 1105, name: "Double Patty Beast", desc: "Two smashed patties, extra cheese", price: 279, emoji: "🍔", category: "Mains", restaurantId: 11, veg: false },
  // Spice Garden (12)
  { id: 1201, name: "Dal Makhani", desc: "Creamy black lentil curry", price: 179, emoji: "🍲", category: "Mains", restaurantId: 12, veg: true, mostOrdered: true },
  { id: 1202, name: "Paneer Butter Masala", desc: "Rich tomato-butter paneer curry", price: 219, emoji: "🧈", category: "Mains", restaurantId: 12, veg: true },
  { id: 1203, name: "Butter Naan", desc: "Soft tandoori bread with butter", price: 39, emoji: "🫓", category: "Starters", restaurantId: 12, veg: true },
  { id: 1204, name: "Chicken Biryani", desc: "Fragrant basmati rice with chicken", price: 299, emoji: "🍚", category: "Mains", restaurantId: 12, veg: false },
  { id: 1205, name: "Aloo Paratha", desc: "Stuffed potato flatbread", price: 89, emoji: "🥙", category: "Starters", restaurantId: 12, veg: true },
  { id: 1206, name: "Lassi", desc: "Sweet yogurt drink", price: 69, emoji: "🥛", category: "Drinks", restaurantId: 12, veg: true },
  // Dragon Wok (13)
  { id: 1301, name: "Veg Fried Rice", desc: "Wok-tossed veggies with rice", price: 169, emoji: "🍚", category: "Mains", restaurantId: 13, veg: true },
  { id: 1302, name: "Chicken Manchurian", desc: "Indo-Chinese fried chicken in gravy", price: 219, emoji: "🍗", category: "Mains", restaurantId: 13, veg: false, mostOrdered: true },
  { id: 1303, name: "Hakka Noodles", desc: "Stir-fried noodles with vegetables", price: 159, emoji: "🍜", category: "Mains", restaurantId: 13, veg: true },
  { id: 1304, name: "Chilli Paneer", desc: "Spicy paneer tossed with peppers", price: 199, emoji: "🌶️", category: "Starters", restaurantId: 13, veg: true },
  { id: 1305, name: "Spring Rolls", desc: "Crispy rolls with veggie filling", price: 129, emoji: "🥟", category: "Starters", restaurantId: 13, veg: true },
  // The Waffle House (14)
  { id: 1401, name: "Classic Belgian Waffle", desc: "Fluffy waffle with maple syrup", price: 179, emoji: "🧇", category: "Desserts", restaurantId: 14, veg: true, mostOrdered: true },
  { id: 1402, name: "Nutella Waffle", desc: "Warm waffle with Nutella drizzle", price: 219, emoji: "🍫", category: "Desserts", restaurantId: 14, veg: true },
  { id: 1403, name: "Oreo Milkshake", desc: "Thick shake with crushed Oreos", price: 149, emoji: "🥤", category: "Drinks", restaurantId: 14, veg: true },
  { id: 1404, name: "Brownie Sundae", desc: "Fudge brownie with vanilla ice cream", price: 189, emoji: "🍨", category: "Desserts", restaurantId: 14, veg: true },
  { id: 1405, name: "Mango Smoothie", desc: "Fresh Alphonso mango blend", price: 129, emoji: "🥭", category: "Drinks", restaurantId: 14, veg: true },
  // Green Bowl Express (15)
  { id: 1501, name: "Quinoa Buddha Bowl", desc: "Quinoa, roasted veggies, tahini", price: 249, emoji: "🥗", category: "Mains", restaurantId: 15, veg: true },
  { id: 1502, name: "Caesar Salad", desc: "Classic romaine, croutons, parmesan", price: 199, emoji: "🥬", category: "Mains", restaurantId: 15, veg: true },
  { id: 1503, name: "Avocado Toast", desc: "Sourdough with smashed avocado", price: 179, emoji: "🥑", category: "Starters", restaurantId: 15, veg: true },
  { id: 1504, name: "Açaí Bowl", desc: "Frozen açaí blend, granola, berries", price: 229, emoji: "🫐", category: "Mains", restaurantId: 15, veg: true, mostOrdered: true },
  { id: 1505, name: "Detox Green Juice", desc: "Spinach, cucumber, lime, ginger", price: 99, emoji: "🥒", category: "Drinks", restaurantId: 15, veg: true },
  // Tandoor Tales (16)
  { id: 1601, name: "Chicken Tikka", desc: "Smoky tandoori chicken chunks", price: 299, emoji: "🍗", category: "Starters", restaurantId: 16, veg: false, mostOrdered: true },
  { id: 1602, name: "Seekh Kebab", desc: "Minced mutton kebabs on skewer", price: 279, emoji: "🥩", category: "Starters", restaurantId: 16, veg: false },
  { id: 1603, name: "Garlic Naan", desc: "Soft naan with roasted garlic", price: 49, emoji: "🧄", category: "Starters", restaurantId: 16, veg: true },
  { id: 1604, name: "Shahi Paneer", desc: "Royal paneer in creamy cashew gravy", price: 239, emoji: "🧈", category: "Mains", restaurantId: 16, veg: true },
  { id: 1605, name: "Mutton Rogan Josh", desc: "Slow-cooked mutton in Kashmiri spices", price: 349, emoji: "🍖", category: "Mains", restaurantId: 16, veg: false },
  // Pizza Planet (17)
  { id: 1701, name: "Margherita", desc: "Classic cheese & tomato pizza", price: 199, emoji: "🍕", category: "Mains", restaurantId: 17, veg: true },
  { id: 1702, name: "Pepperoni Blast", desc: "Loaded with pepperoni slices", price: 269, emoji: "🍕", category: "Mains", restaurantId: 17, veg: false, mostOrdered: true },
  { id: 1703, name: "BBQ Chicken Pizza", desc: "BBQ sauce base with grilled chicken", price: 289, emoji: "🍕", category: "Mains", restaurantId: 17, veg: false },
  { id: 1704, name: "Garlic Bread", desc: "Cheesy garlic bread sticks", price: 99, emoji: "🧄", category: "Starters", restaurantId: 17, veg: true },
  { id: 1705, name: "Pasta Arrabbiata", desc: "Penne in spicy tomato sauce", price: 179, emoji: "🍝", category: "Mains", restaurantId: 17, veg: true },
  // Sushi Sakura (18)
  { id: 1801, name: "Salmon Nigiri", desc: "Fresh salmon over seasoned rice", price: 349, emoji: "🍣", category: "Mains", restaurantId: 18, veg: false, mostOrdered: true },
  { id: 1802, name: "Dragon Roll", desc: "Eel, avocado, tobiko topping", price: 399, emoji: "🐉", category: "Mains", restaurantId: 18, veg: false },
  { id: 1803, name: "Miso Soup", desc: "Warm miso with tofu & seaweed", price: 99, emoji: "🍜", category: "Starters", restaurantId: 18, veg: true },
  { id: 1804, name: "Edamame", desc: "Steamed soy beans with sea salt", price: 129, emoji: "🫛", category: "Starters", restaurantId: 18, veg: true },
  { id: 1805, name: "Tuna Sashimi", desc: "Thinly sliced fresh tuna", price: 379, emoji: "🐟", category: "Mains", restaurantId: 18, veg: false },
  // Taco Fiesta (19)
  { id: 1901, name: "Chicken Tacos (2pc)", desc: "Soft shell, grilled chicken, salsa", price: 179, emoji: "🌮", category: "Mains", restaurantId: 19, veg: false },
  { id: 1902, name: "Beef Burrito", desc: "Loaded beef burrito with beans", price: 229, emoji: "🌯", category: "Mains", restaurantId: 19, veg: false, mostOrdered: true },
  { id: 1903, name: "Nachos with Salsa", desc: "Corn chips with fresh tomato salsa", price: 149, emoji: "🧀", category: "Starters", restaurantId: 19, veg: true },
  { id: 1904, name: "Quesadilla", desc: "Cheesy grilled tortilla", price: 169, emoji: "🧀", category: "Mains", restaurantId: 19, veg: true },
  { id: 1905, name: "Churros", desc: "Fried dough with cinnamon sugar", price: 119, emoji: "🍩", category: "Desserts", restaurantId: 19, veg: true },
  // Chai & Bites (20)
  { id: 2001, name: "Masala Chai", desc: "Strong Indian spiced tea", price: 49, emoji: "🍵", category: "Drinks", restaurantId: 20, veg: true, mostOrdered: true },
  { id: 2002, name: "Cutting Chai", desc: "Half-glass Mumbai-style tea", price: 39, emoji: "☕", category: "Drinks", restaurantId: 20, veg: true },
  { id: 2003, name: "Samosa (2pc)", desc: "Crispy potato-stuffed pastry", price: 59, emoji: "🔺", category: "Starters", restaurantId: 20, veg: true },
  { id: 2004, name: "Vada Pav", desc: "Mumbai's iconic potato burger", price: 49, emoji: "🍔", category: "Starters", restaurantId: 20, veg: true },
  { id: 2005, name: "Bread Pakora", desc: "Spiced gram flour fried bread", price: 69, emoji: "🍞", category: "Starters", restaurantId: 20, veg: true },
];

// Default menu for restaurants without specific items
const DEFAULT_MENU: MenuItem[] = [
  { id: 900, name: "House Special", desc: "Chef's signature dish", price: 349, emoji: "⭐", category: "Mains", restaurantId: 0, veg: false },
  { id: 901, name: "Soup of the Day", desc: "Freshly prepared daily", price: 129, emoji: "🍲", category: "Starters", restaurantId: 0, veg: true },
  { id: 902, name: "Fresh Juice", desc: "Seasonal fruit blend", price: 99, emoji: "🧃", category: "Drinks", restaurantId: 0, veg: true },
  { id: 903, name: "Cheesecake", desc: "New York style", price: 189, emoji: "🍰", category: "Desserts", restaurantId: 0, veg: true },
];

const TRACKING_STAGES = [
  { label: "Order Placed", emoji: "✅", message: "Your order has been confirmed!" },
  { label: "Preparing", emoji: "🍳", message: "Your order is being prepared by the chef!" },
  { label: "Out for Delivery", emoji: "🛵", message: "Your rider is on the way!" },
  { label: "Delivered", emoji: "🎉", message: "Enjoy your meal! Bon appétit!" },
];

// ─── TYPES ──────────────────────────────────────────────────────────────────────

type CartItem = { id: number; name: string; price: number; quantity: number; restaurantId: number; emoji: string };
type Page = "home" | "restaurants" | "menu" | "cart" | "tracking" | "profile";

// ─── MAIN APP ───────────────────────────────────────────────────────────────────

const CodeCrave = () => {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [trackingStage, setTrackingStage] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const navigate = useCallback((p: Page) => setPage(p), []);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, restaurantId: item.restaurantId, emoji: item.emoji }];
    });
    setBadgePulse(true);
    setTimeout(() => setBadgePulse(false), 400);
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter(c => c.quantity > 0));
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const placeOrder = useCallback(() => {
    setOrderId(String(Math.floor(100000 + Math.random() * 900000)));
    setDeliveryTime(25 + Math.floor(Math.random() * 21));
    setShowModal(true);
  }, []);

  const startTracking = useCallback(() => {
    setShowModal(false);
    setTrackingStage(0);
    setCart([]);
    setCouponApplied(false);
    navigate("tracking");
  }, [navigate]);

  const openRestaurant = useCallback((r: Restaurant) => {
    setSelectedRestaurant(r);
    navigate("menu");
  }, [navigate]);

  // ─── NAVBAR ─────────────────────────────────────────────────────────────────

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="font-heading text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          CodeCrave
        </button>
        <div className="hidden md:flex items-center gap-6">
          {([["home", "Home", Home], ["restaurants", "Restaurants", UtensilsCrossed], ["profile", "My Orders", ClipboardList], ["profile", "Profile", User]] as [Page, string, React.ElementType][]).map(([p, label, Icon], i) => (
            <button key={i} onClick={() => navigate(p)} className={`flex items-center gap-1.5 text-sm font-heading font-semibold transition-colors hover:text-primary ${page === p ? "text-primary" : "text-muted-foreground"}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("tracking")} className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-heading font-semibold hover:bg-primary/20 transition-colors">
            <MapPin size={14} /> Track Order
          </button>
          <button onClick={() => navigate("cart")} className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-body font-bold flex items-center justify-center ${badgePulse ? "animate-pulse-badge" : ""}`}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {([["home", "Home", Home], ["restaurants", "Food", UtensilsCrossed], ["cart", "Cart", ShoppingCart], ["tracking", "Track", MapPin], ["profile", "Profile", User]] as [Page, string, React.ElementType][]).map(([p, label, Icon]) => (
            <button key={p} onClick={() => navigate(p)} className={`flex flex-col items-center gap-0.5 text-xs font-body transition-colors ${page === p ? "text-primary" : "text-muted-foreground"}`}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // ─── HERO / HOME ───────────────────────────────────────────────────────────

  const HomePage = () => {
    const [search, setSearch] = useState("");
    return (
      <div className="animate-fade-in">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl mb-4">
            Code. <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Eat.</span> Repeat.
          </h1>
          <p className="font-body text-muted-foreground text-lg sm:text-xl mb-8 max-w-md">
            Lightning-fast delivery from the best restaurants near you.
          </p>
          <div className="w-full max-w-xl relative mb-10">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search food, restaurants, cuisines..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-card border border-border font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.slice(0, 6).map(c => (
              <button
                key={c.label}
                onClick={() => { setCategoryFilter(c.label); navigate("restaurants"); }}
                className="px-5 py-2.5 rounded-full bg-card border border-border text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-all hover:scale-105"
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>
        {/* Featured section */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="font-heading font-bold text-2xl mb-6">🔥 Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESTAURANTS.filter(r => r.open).slice(0, 6).map(r => (
              <button key={r.id} onClick={() => openRestaurant(r)} className="group bg-card border border-border rounded-2xl overflow-hidden text-left hover:shadow-[0_0_30px_hsl(16,100%,50%,0.15)] hover:-translate-y-1 transition-all duration-300">
                <div className={`h-32 bg-gradient-to-br ${r.gradient} flex items-center justify-center text-5xl relative`}>
                  {r.emoji}
                  {r.isNew && <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-heading font-bold bg-green-500/90 text-foreground">New</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg">{r.name}</h3>
                  <p className="text-sm font-body text-muted-foreground">{r.cuisine} • {r.time}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-secondary text-sm font-body font-bold flex items-center gap-1"><Star size={12} fill="currentColor" /> {r.rating}</span>
                    <span className="text-xs font-body text-muted-foreground">• ₹{r.fee} delivery</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── RESTAURANT LISTING ─────────────────────────────────────────────────────

  const RestaurantsPage = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(t);
    }, []);

    let filtered = RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (!categoryFilter || r.cuisine === categoryFilter)
    );
    if (sort === "fastest") filtered = [...filtered].sort((a, b) => parseInt(a.time) - parseInt(b.time));
    if (sort === "top") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    if (sort === "cheap") filtered = [...filtered].sort((a, b) => a.fee - b.fee);

    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 pt-24 pb-24">
        <h2 className="font-heading font-bold text-3xl mb-6">Restaurants</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search restaurants..." className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:border-primary focus:outline-none transition-colors" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:border-primary focus:outline-none">
            <option value="default">Sort by</option>
            <option value="fastest">Fastest</option>
            <option value="top">Top Rated</option>
            <option value="cheap">Low Price</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setCategoryFilter(null)} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold border transition-all ${!categoryFilter ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.label} onClick={() => setCategoryFilter(categoryFilter === c.label ? null : c.label)} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold border transition-all ${categoryFilter === c.label ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="h-36 animate-shimmer rounded-t-2xl" />
              <div className="p-4 bg-card border border-border border-t-0 rounded-b-2xl space-y-3">
                <div className="h-4 w-2/3 animate-shimmer rounded" />
                <div className="h-3 w-1/2 animate-shimmer rounded" />
              </div>
            </div>
          )) : filtered.map(r => (
            <button key={r.id} onClick={() => r.open && openRestaurant(r)} className={`group bg-card border border-border rounded-2xl overflow-hidden text-left transition-all duration-300 ${r.open ? "hover:shadow-[0_0_30px_hsl(16,100%,50%,0.15)] hover:-translate-y-1 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}>
              <div className={`h-36 bg-gradient-to-br ${r.gradient} flex items-center justify-center text-5xl relative`}>
                {r.emoji}
                {r.isNew && <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-heading font-bold bg-green-500/90 text-foreground">New</span>}
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-heading font-bold ${r.open ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {r.open ? "Open" : "Closed"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold">{r.name}</h3>
                <p className="text-sm font-body text-muted-foreground">{r.cuisine}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-secondary text-sm font-body font-bold flex items-center gap-1"><Star size={12} fill="currentColor" /> {r.rating}</span>
                  <span className="text-xs font-body font-bold text-muted-foreground"><Clock size={12} className="inline mr-1" />{r.time}</span>
                  <span className="text-xs font-body font-bold text-muted-foreground">₹{r.fee}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        {!loading && filtered.length === 0 && (
          <p className="text-center font-body text-muted-foreground mt-12">No restaurants found.</p>
        )}
      </div>
    );
  };

  // ─── MENU PAGE ──────────────────────────────────────────────────────────────

  const MenuPage = () => {
    const [activeTab, setActiveTab] = useState("Starters");
    if (!selectedRestaurant) return null;
    const r = selectedRestaurant;
    let items = MENU_ITEMS.filter(m => m.restaurantId === r.id);
    if (items.length === 0) items = DEFAULT_MENU.map(m => ({ ...m, restaurantId: r.id }));
    const tabs = [...new Set(items.map(m => m.category))];
    const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);

    // Set default active tab to first available
    const validTab = tabs.includes(activeTab) ? activeTab : tabs[0];

    return (
      <div className="animate-fade-in pb-32">
        <div className={`h-48 sm:h-64 bg-gradient-to-br ${r.gradient} flex items-end relative`}>
          <button onClick={() => navigate("restaurants")} className="absolute top-20 left-4 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="p-6 w-full bg-gradient-to-t from-background/90 to-transparent">
            <h2 className="font-heading font-bold text-3xl">{r.name}</h2>
            <div className="flex items-center gap-3 mt-1 text-sm font-body text-muted-foreground">
              <span className="text-secondary font-bold flex items-center gap-1"><Star size={12} fill="currentColor" /> {r.rating}</span>
              <span className="font-bold"><Clock size={12} className="inline mr-1" />{r.time}</span>
              <span className="font-bold">₹{r.fee} delivery</span>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => {
              const count = items.filter(m => m.category === tab).length;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full text-sm font-heading font-semibold whitespace-nowrap border transition-all ${(validTab === tab) ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
                  {tab} ({count})
                </button>
              );
            })}
          </div>
          <div className="space-y-3">
            {items.filter(m => m.category === validTab).map(item => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-sm border-2 flex-shrink-0 ${item.veg ? "border-green-500" : "border-red-500"}`}>
                        <span className={`block w-1.5 h-1.5 rounded-full m-[1px] ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                      </span>
                      <h4 className="font-heading font-semibold">{item.name}</h4>
                      {item.mostOrdered && <span className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-primary/20 text-primary">Most Ordered</span>}
                    </div>
                    <p className="text-sm font-body text-muted-foreground truncate">{item.desc}</p>
                    <p className="text-primary font-body font-bold mt-1">₹{item.price}</p>
                  </div>
                  {inCart ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"><Minus size={14} /></button>
                      <span className="w-6 text-center font-body font-bold">{inCart.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"><Plus size={14} /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-secondary-foreground text-sm font-heading font-semibold hover:scale-105 transition-transform">
                      Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {cartCount > 0 && (
          <div className="fixed bottom-16 md:bottom-4 left-4 right-4 max-w-4xl mx-auto">
            <button onClick={() => navigate("cart")} className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-secondary-foreground font-heading font-bold text-lg flex items-center justify-between px-6 hover:scale-[1.02] transition-transform shadow-2xl">
              <span>{cartCount} item{cartCount > 1 ? "s" : ""} in cart</span>
              <span className="flex items-center gap-2 font-body font-bold">₹{subtotal} <ChevronRight size={18} /></span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // ─── CART PAGE ──────────────────────────────────────────────────────────────

  const CartPage = () => {
    const [couponCode, setCouponCode] = useState("");
    const [couponMsg, setCouponMsg] = useState("");

    const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
    const deliveryFee = 40;
    const discount = couponApplied ? subtotal * 0.2 : 0;
    const taxable = subtotal - discount;
    const tax = Math.round(taxable * 0.05);
    const total = taxable + tax + deliveryFee;

    const applyCoupon = () => {
      if (couponCode.toUpperCase() === "CRAVE20") {
        setCouponApplied(true);
        setCouponMsg("🎉 20% discount applied!");
      } else {
        setCouponMsg("Invalid coupon code");
      }
    };

    return (
      <div className="animate-fade-in max-w-2xl mx-auto px-4 pt-24 pb-32">
        <h2 className="font-heading font-bold text-3xl mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-body text-muted-foreground">Your cart is empty</p>
            <button onClick={() => navigate("restaurants")} className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-secondary-foreground font-heading font-semibold hover:scale-105 transition-transform">
              Browse Restaurants
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold">{item.name}</h4>
                    <p className="text-primary font-body font-bold">₹{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"><Minus size={14} /></button>
                    <span className="w-6 text-center font-body font-bold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            {/* Coupon */}
            <div className="flex gap-2 mb-6">
              <input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-sm font-body focus:border-primary focus:outline-none" />
              <button onClick={applyCoupon} className="px-6 py-3 rounded-xl bg-card border border-border text-sm font-heading font-semibold hover:border-primary transition-colors">Apply</button>
            </div>
            {couponMsg && <p className={`text-sm font-body mb-4 ${couponApplied ? "text-green-400" : "text-destructive"}`}>{couponMsg}</p>}
            {/* Summary */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3 mb-6">
              <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Subtotal</span><span className="font-bold">₹{subtotal}</span></div>
              {couponApplied && <div className="flex justify-between text-sm font-body text-green-400"><span>Discount (20%)</span><span className="font-bold">-₹{Math.round(discount)}</span></div>}
              <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Delivery Fee</span><span className="font-bold">₹{deliveryFee}</span></div>
              <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Tax (5%)</span><span className="font-bold">₹{tax}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-lg"><span>Total</span><span className="text-primary">₹{total}</span></div>
            </div>
            <button onClick={placeOrder} className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-secondary-foreground font-heading font-bold text-lg hover:scale-[1.02] transition-transform">
              Place Order
            </button>
          </>
        )}
      </div>
    );
  };

  // ─── ORDER TRACKING ─────────────────────────────────────────────────────────

  const TrackingPage = () => {
    const [countdown, setCountdown] = useState(deliveryTime * 60 || 30 * 60);

    useEffect(() => {
      const interval = setInterval(() => {
        setTrackingStage(prev => (prev < 3 ? prev + 1 : prev));
      }, 4000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;

    return (
      <div className="animate-fade-in max-w-2xl mx-auto px-4 pt-24 pb-32">
        <h2 className="font-heading font-bold text-3xl mb-2">Order Tracking</h2>
        {orderId && <p className="font-body text-muted-foreground text-sm mb-8">Order #{orderId}</p>}
        <div className="relative mb-10">
          <div className="absolute top-5 left-5 right-5 h-1 bg-border rounded-full">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000" style={{ width: `${(trackingStage / 3) * 100}%` }} />
          </div>
          <div className="flex justify-between relative">
            {TRACKING_STAGES.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 ${i <= trackingStage ? "bg-primary border-primary" : "bg-card border-border"}`}>
                  {s.emoji}
                </div>
                <span className={`text-xs font-body text-center max-w-[70px] ${i <= trackingStage ? "text-foreground font-bold" : "text-muted-foreground"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 text-center">
          <p className="text-lg font-heading font-semibold mb-2">{TRACKING_STAGES[trackingStage].message}</p>
          <p className="font-heading font-bold text-5xl text-primary">{mins}:{secs.toString().padStart(2, "0")}</p>
          <p className="text-sm font-body text-muted-foreground mt-1">estimated time remaining</p>
        </div>
        <div className="bg-card border border-border rounded-2xl h-48 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px opacity-10">
            {Array.from({ length: 48 }).map((_, i) => <div key={i} className="bg-border" />)}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="text-4xl animate-pulse-dot inline-block">🛵</span>
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-full animate-ping" />
            </div>
          </div>
          <p className="absolute bottom-3 left-3 text-xs font-body text-muted-foreground">Live map view</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-heading font-bold text-xl text-primary-foreground">RK</div>
          <div className="flex-1">
            <h4 className="font-heading font-semibold">Rahul Kumar</h4>
            <div className="flex items-center gap-1 text-sm font-body font-bold text-secondary"><Star size={12} fill="currentColor" /> 4.9</div>
          </div>
          <button className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"><Phone size={18} /></button>
        </div>
      </div>
    );
  };

  // ─── PROFILE PAGE ───────────────────────────────────────────────────────────

  const ProfilePage = () => {
    const [tab, setTab] = useState<"orders" | "addresses" | "payments">("orders");
    const pastOrders = [
      { id: "482910", restaurant: "Burger Republic", items: 3, total: 627, status: "Delivered", date: "Apr 11" },
      { id: "319847", restaurant: "Tokyo Bites", items: 2, total: 948, status: "Delivered", date: "Apr 9" },
      { id: "751203", restaurant: "Taco Loco", items: 4, total: 856, status: "Cancelled", date: "Apr 7" },
      { id: "604521", restaurant: "Blaze Pizza Co.", items: 1, total: 299, status: "Processing", date: "Today" },
    ];

    return (
      <div className="animate-fade-in max-w-2xl mx-auto px-4 pt-24 pb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-heading font-bold text-3xl text-primary-foreground">AK</div>
          <div>
            <h2 className="font-heading font-bold text-2xl">Aarav Kumar</h2>
            <p className="text-sm font-body text-muted-foreground">aarav@codecrave.dev • +91 98765 43210</p>
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          {(["orders", "addresses", "payments"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-full text-sm font-heading font-semibold border transition-all capitalize ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
              {t === "orders" ? "My Orders" : t === "addresses" ? "Addresses" : "Payments"}
            </button>
          ))}
        </div>
        {tab === "orders" && (
          <div className="space-y-3">
            {pastOrders.map(o => (
              <div key={o.id} className="p-4 bg-card border border-border rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-semibold">{o.restaurant}</h4>
                  <p className="text-sm font-body text-muted-foreground">{o.items} items • <span className="font-bold">₹{o.total}</span> • {o.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-heading font-bold ${o.status === "Delivered" ? "bg-green-500/10 text-green-400" : o.status === "Cancelled" ? "bg-red-500/10 text-red-400" : "bg-secondary/10 text-secondary"}`}>{o.status}</span>
              </div>
            ))}
          </div>
        )}
        {tab === "addresses" && (
          <div className="space-y-3">
            {[{ label: "Home", addr: "42, Sector 15, Noida, UP 201301" }, { label: "Office", addr: "WeWork, Cyber City, Gurugram, HR 122002" }].map((a, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-semibold flex items-center gap-2"><MapPin size={14} className="text-primary" /> {a.label}</h4>
                  <p className="text-sm font-body text-muted-foreground ml-5">{a.addr}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit size={14} /></button>
                  <button className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "payments" && (
          <div className="space-y-3">
            {[{ icon: Wallet, label: "UPI", detail: "aarav@upi" }, { icon: CreditCard, label: "Card", detail: "•••• •••• •••• 4289" }, { icon: Banknote, label: "Cash on Delivery", detail: "Pay at doorstep" }].map((p, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><p.icon size={18} /></div>
                <div>
                  <h4 className="font-heading font-semibold">{p.label}</h4>
                  <p className="text-sm font-body text-muted-foreground">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── ORDER MODAL ────────────────────────────────────────────────────────────

  const OrderModal = () => {
    if (!showModal) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full mx-4 text-center relative">
          <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={18} /></button>
          <svg className="w-20 h-20 mx-auto mb-4" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" fill="none" stroke="hsl(16,100%,50%)" strokeWidth="2" />
            <path d="M14 27l8 8 16-16" fill="none" stroke="hsl(16,100%,50%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-check" />
          </svg>
          <h3 className="font-heading font-bold text-2xl mb-2">Order Confirmed!</h3>
          <p className="font-body text-muted-foreground mb-1">Order #{orderId}</p>
          <p className="font-body text-muted-foreground mb-6">Estimated delivery in <span className="text-primary font-bold">{deliveryTime} min</span></p>
          <button onClick={startTracking} className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-secondary-foreground font-heading font-bold hover:scale-105 transition-transform">
            Track Order
          </button>
        </div>
      </div>
    );
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {page === "home" && <HomePage />}
        {page === "restaurants" && <RestaurantsPage />}
        {page === "menu" && <MenuPage />}
        {page === "cart" && <CartPage />}
        {page === "tracking" && <TrackingPage />}
        {page === "profile" && <ProfilePage />}
      </main>
      <OrderModal />
    </div>
  );
};

export default CodeCrave;
