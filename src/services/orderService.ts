import {
  placeOrderInDb,
  addOrderItemsInDb,
  getUserOrdersFromDb,
  getOrderDetailsFromDb,
  updateOrderStatusInDb,
} from "../db/orderDb";
import { getProductByIdFromDb } from "../db/productDb";

const placeOrder = async (userId: number, cartItems: any[]) => {
  let totalPrice = 0;

  for (const item of cartItems) {
    const product = await getProductByIdFromDb(item.product_id);

    if (!product || product.length === 0) {
      throw new Error(`Product ID ${item.product_id} not found.`);
    }

    const productPrice = product[0].price; // Fetch price from DB
    totalPrice += productPrice * item.quantity;
  }

  const order = await placeOrderInDb(userId, totalPrice);
  const orderId = order.insertId;

  for (const item of cartItems) {
    const product = await getProductByIdFromDb(item.product_id);
    if (!product || product.length === 0) continue; // Skip if product doesn't exist

    await addOrderItemsInDb(
      orderId,
      item.product_id,
      item.quantity,
      product[0].price // Fetch correct price
    );
  }

  return { orderId, totalPrice };
};

const getUserOrders = async (userId: number) => {
  return await getUserOrdersFromDb(userId);
};

const getOrderDetails = async (orderId: number) => {
  return await getOrderDetailsFromDb(orderId);
};

const updateOrderStatus = async (orderId: number, status: string) => {
  return await updateOrderStatusInDb(orderId, status);
};

export { placeOrder, getUserOrders, getOrderDetails, updateOrderStatus };
