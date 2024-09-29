import React from 'react';

const CustomerDashboard = () => {
  // Mock data for cart items and order tracking
  const cartItems = [
    { id: 1, name: 'Product 1', price: '$10', quantity: 1 },
    { id: 2, name: 'Product 2', price: '$20', quantity: 2 },
  ];

  const orderTracking = [
    { id: 1, name: 'Product 1', status: 'Shipped' },
    { id: 2, name: 'Product 2', status: 'Processing' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#aa1936]">Customer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-[#aa1936]">My Cart</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between mb-2 p-2 bg-white rounded shadow-sm">
                <span>{item.name}</span>
                <span>{item.price}</span>
                <span>Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-[#aa1936]">Order Tracking</h2>
          <ul>
            {orderTracking.map(order => (
              <li key={order.id} className="flex justify-between mb-2 p-2 bg-white rounded shadow-sm">
                <span>{order.name}</span>
                <span>{order.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
