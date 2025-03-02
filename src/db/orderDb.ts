import executeQuery from "../models/excuteQuery";

//Place an order
const placeOrderInDb = async (userId: number, totalPrice: number) => {
  return await executeQuery(
    "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')",
    [userId, totalPrice]
  );
};

//Insert order items
const addOrderItemsInDb = async (
  orderId: number,
  productId: number,
  quantity: number,
  price: number
) => {
  return await executeQuery(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
    [orderId, productId, quantity, price]
  );
};

// Get user orders
const getUserOrdersFromDb = async (userId: number) => {
  return await executeQuery("SELECT * FROM orders WHERE user_id = ?", [userId]);
};

//Get order details
const getOrderDetailsFromDb = async (orderId: number) => {
  return await executeQuery("SELECT * FROM order_items WHERE order_id = ?", [
    orderId,
  ]);
};

//Update order status
const updateOrderStatusInDb = async (orderId: number, status: string) => {
  return await executeQuery("UPDATE orders SET status = ? WHERE id = ?", [
    status,
    orderId,
  ]);
};

export {
  placeOrderInDb,
  addOrderItemsInDb,
  getUserOrdersFromDb,
  getOrderDetailsFromDb,
  updateOrderStatusInDb,
};
