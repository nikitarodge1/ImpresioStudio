import { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, photographerName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    alert(`Inquiry sent to ${photographerName}!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
       
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">
            Send Inquiry to {photographerName}
          </h3>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>

        
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>

        
          <div>
            <label htmlFor="date" className="mb-1 block text-sm text-gray-700">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              required
              className="w-full rounded border p-2"
            ></textarea>
          </div>

          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;
