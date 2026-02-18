import { getUserOrders } from "../payment/payment.action";

export default async function AllOrdersPage() {
  const orders = await getUserOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">No orders yet</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order._id} className="border rounded-lg p-5 shadow">

      
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
              <div>
                <p className="font-semibold break-all">
                  Order ID: {order._id}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="font-medium">{order.paymentMethodType}</p>
                <p
                  className={`font-semibold ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </p>
              </div>
            </div>

         
            <div className="space-y-3">
              {order.cartItems.map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.imageCover}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <p className="text-sm sm:text-base">
                      {item.product.title}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base">
                    {item.count} × {item.price}$
                  </p>
                </div>
              ))}
            </div>

         
            <div className="text-left sm:text-right mt-4 font-bold">
              Total: {order.totalOrderPrice}$
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
