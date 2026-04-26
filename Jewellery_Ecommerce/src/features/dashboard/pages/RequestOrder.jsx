import { useNavigate } from 'react-router-dom';
import RequestOrderForm from '../orders/components/RequestOrderForm';
import { addRequestedOrder } from '../orders/data/ordersRepository';

const formatDisplayDate = (dateInput) => {
  if (!dateInput) {
    return '-';
  }

  const [year, month, day] = dateInput.split('-');
  return `${day}/${month}/${year}`;
};

const RequestOrder = () => {
  const navigate = useNavigate();

  const handleSubmit = ({ orderCompletionDate, goldItems }) => {
    const firstItem = goldItems[0];
    const estimatedValue = Number(firstItem.estimatedValue || 0);
    const now = new Date();
    const newOrderId = `REQ${now.getTime().toString().slice(-10)}`;

    const requestedOrder = {
      id: newOrderId,
      placedAt: now.toISOString(),
      items: [
        {
          id: `it-${now.getTime()}`,
          name: firstItem.itemType,
          sku: firstItem.serialNumber || newOrderId,
          colorFamily: 'Gold',
          quantity: 1,
          price: estimatedValue
        }
      ],
      total: estimatedValue,
      status: 'Order Requested',
      storeName: 'Self Requested Order',
      shippingAddress: 'Pending confirmation',
      deliveryType: 'Verification Pending',
      trackingCode: `PENDING-${newOrderId}`,
      packageStatusLabel: `Order requested. Completion date: ${formatDisplayDate(orderCompletionDate)}`,
      timeline: {
        placedOn: now.toLocaleString('en-GB'),
        paidOn: '-',
        deliveredOn: '-',
        completedOn: formatDisplayDate(orderCompletionDate)
      },
      paymentMethod: 'Pending confirmation',
      shippingContact: {
        fullName: 'Pending confirmation',
        label: 'HOME',
        line: 'Address will be updated after verification',
        phone: '-'
      },
      summary: {
        subtotal: estimatedValue,
        shippingFee: 0,
        codHandlingFee: 0,
        discount: 0,
        total: estimatedValue
      },
      tracking: {
        deliveryPartner: 'Pending',
        courierName: 'Pending',
        currentStage: 'Processing',
        events: [
          {
            time: now.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
            title: 'Order Requested',
            description: 'Your self-requested order has been submitted for review.',
            location: 'System',
            completed: true
          },
          {
            time: '-',
            title: 'Verification Pending',
            description: 'Our team will verify your submitted gold details.',
            location: 'Pending',
            completed: false
          }
        ]
      }
    };

    addRequestedOrder(requestedOrder);
    navigate('/dashboard/orders');
  };

  return (
    <section className="mx-auto w-full">
      <RequestOrderForm onSubmit={handleSubmit} />
    </section>
  );
};

export default RequestOrder;
