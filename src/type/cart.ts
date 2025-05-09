type CartType = {
  id: number;
  userId: number;
  products: ProductInCartType[];
  date: string;
};

type ProductInCartType = {
  productId: number;
  quantity: number;
};
export default CartType;