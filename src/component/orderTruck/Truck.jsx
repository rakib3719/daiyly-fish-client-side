import { FaCheckCircle, FaTruck, FaBoxOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Truck = ({ order, idx }) => {
  const { proudctInfo } = order || {}; // Corrected to "proudctInfo"
  const { status } = order || "";

  // Define order steps with colors based on completion status
  const steps = [
    { id: 1, status: 'Order Confirmed', icon: <FaCheckCircle size={24} /> },
    { id: 2, status: 'On the Courier', icon: <FaTruck size={24} /> },
    { id: 3, status: 'Delivered', icon: <FaBoxOpen size={24} /> }
  ];

  // Map the status to step completion
  const stepStatusMap = {
    'confirmed': 1,
    'courier': 2,
    'done': 3
  };

  // Determine the current step based on the status
  const currentStep = stepStatusMap[status] || 0;

  // Helper function to determine the color based on step completion
  const getStepColor = (stepNumber) => {
    if (stepNumber <= currentStep) {
      return 'text-green-500'; // Completed color
    }
    return 'text-gray-300'; // Default color
  };

  if (!proudctInfo) {
    return <div>No product info available!</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Info Card */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Order #{idx + 1}</h2>
        <h2 className="text-lg font-bold mb-2">Product Info</h2>
        <div className="space-y-2">
          <ul className="list-disc pl-5">
            {Object.entries(proudctInfo).map(([product, quantity], idx) => (
              <li key={idx}>
                {product}: {quantity} KG
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Order Steps Timeline */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="text-lg font-bold mb-2">Order Steps</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step icon */}
              <div className={`flex-shrink-0 ${getStepColor(step.id)}`}>
                {step.icon}
              </div>
              <div className="ml-3">
                {/* Add animation using motion */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  {step.status}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Truck;
