import React, { useState } from 'react';
import './App.css'; 

const products = [
  { id: 1, name: 'Rustic Wooden Pizza', price: 100, img: 'https://loremflickr.com/640/480/food' },
  { id: 2, name: 'Bespoke Cotton Fish', price: 200, img: 'https://loremflickr.com/640/480/food' },
  { id: 3, name: 'Incredible Steel Soap', price: 300, img: 'https://loremflickr.com/640/480/food' },
  { id: 4, name: 'Handmade Wooden Shoes', price: 400, img: 'https://loremflickr.com/640/480/food' }, 
  { id: 5, name: 'Recycled Frozen Fish', price: 500, img: 'https://loremflickr.com/640/480/food' }, 
  { id: 5, name: 'Refined Rubber Towels', price: 600, img: 'https://loremflickr.com/640/480/food' },
  { id: 5, name: 'Ergonomic Frozen Soap', price: 700, img: 'https://loremflickr.com/640/480/food' },
  { id: 5, name: 'Modern Plastic Car', price: 800, img: 'https://loremflickr.com/640/480/food' },
  { id: 5, name: 'Product 10', price: 900, img: 'https://loremflickr.com/640/480/food' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exists, qty: exists.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists.qty === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exists, qty: exists.qty - 1 } : item
        )
      );
    }
  };

  const applyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(10); // 10% discount
    } else {
      setDiscount(0);
      alert('Invalid discount code');
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.qty * item.price, 0);
  const shippingFee = 100; // ค่าจัดส่ง
  const discountedPrice = totalPrice - (totalPrice * discount) / 100; // คำนวณราคาหลังจากส่วนลด
  const finalTotal = discountedPrice + shippingFee; // คำนวณยอดรวมสุดท้ายรวมค่าจัดส่ง

  const confirmOrder = () => {
    setOrderConfirmed(true);
    setCart([]); // Clear the cart after confirming the order
  };

  

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <header className="bg-orange-500 p-6 text-white text-center font-bold text-3xl shadow-md w-full">
        LAZADU SHOP
      </header>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-orange-500">สินค้า</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
              <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <h2 className="product-name text-lg font-bold mt-4">{product.name}</h2>
              <p className="product-price text-gray-700 mt-2">Price: {product.price}฿</p>
              <button
                className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-12 text-orange-500">รายการสินค้าของคุณ</h2>
        {cart.length === 0 ? (
          <p className="mt-4 text-gray-600">ไม่มีสินค้าในตระกร้า</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-orange-600 font-bold">{item.name} (x{item.qty})</span>
                  <div className="flex items-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <span className="text-black font-blod">{item.qty}</span>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 ml-2"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-black font-bold">{item.price * item.qty}฿</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <input
                type="text"
                placeholder="ใส่โค้ดของคุณ"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border bg-slate-800 border-gray-300 p-2 rounded mr-2 discount-input"
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                onClick={applyDiscount}
              >
                Apply Discount
              </button>
            </div>

            <p className="text-right text-slate-950 font-bold mt-6 text-lg">Total: {discountedPrice.toFixed(2)}฿</p>
            <p className='Code10'>โค้ดส่วนลด : " SAVE10 " </p>
            <p className="text-slate-950 text-right font-bold mt-6 text-lg">Total: {finalTotal.toFixed(2)}฿ (รวมค่าส่ง 100฿)</p>

            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
              onClick={confirmOrder}
            >
              Confirm Order
            </button>
            {orderConfirmed && <p className="text-center text-green-600 mt-4">Order Confirmed!</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
