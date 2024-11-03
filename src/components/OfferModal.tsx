import React, { useState } from 'react';
import { Mail, Phone, User, X, Calendar } from 'lucide-react';
import { Configuration, Lead } from '../types';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  configuration: Configuration;
}

interface Month {
  value: string;
  label: string;
  available: boolean;
}

export function OfferModal({ isOpen, onClose, totalPrice, configuration }: OfferModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    reserveSlot: false,
    preferredMonth: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a new lead
      const lead: Omit<Lead, 'id' | 'status' | 'notes'> = {
        ...formData,
        configuration,
        totalPrice,
        createdAt: new Date().toISOString(),
      };

      // In a real app, this would be an API call
      // For now, we'll store it in localStorage to simulate persistence
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
      const newLead = {
        ...lead,
        id: `lead-${Date.now()}`,
        status: 'new' as const,
        notes: [],
      };
      localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          reserveSlot: false,
          preferredMonth: '',
        });
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  // Get next 3 months for production slot selection
  const getNextMonths = (): Month[] => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, 1);
      months.push({
        value: date.toISOString().slice(0, 7),
        label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
        available: Math.random() > 0.3 // Simulate availability
      });
    }
    return months;
  };

  const months = getNextMonths();

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-md rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Thank you!</h3>
          <p className="text-gray-600">
            Your request has been submitted successfully. We'll be in touch soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-medium">Get Your Personalized Offer</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="reserveSlot"
                  name="reserveSlot"
                  checked={formData.reserveSlot}
                  onChange={handleChange}
                  className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
                />
                <label htmlFor="reserveSlot" className="text-sm font-medium text-gray-700">
                  Reserve Production Slot (10% deposit required)
                </label>
              </div>

              {formData.reserveSlot && (
                <div className="pl-7 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Preferred Production Month
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {months.map(month => (
                        <button
                          key={month.value}
                          type="button"
                          disabled={!month.available}
                          onClick={() => setFormData(prev => ({ ...prev, preferredMonth: month.value }))}
                          className={`
                            p-4 text-left rounded border transition-all
                            ${!month.available ? 'opacity-50 cursor-not-allowed' : 
                              month.value === formData.preferredMonth 
                                ? 'bg-gray-900 text-white border-gray-900' 
                                : 'border-gray-200 hover:border-gray-900'
                            }
                          `}
                        >
                          <div className="text-sm font-medium mb-1">
                            {new Date(month.value).toLocaleString('default', { month: 'long' })}
                          </div>
                          <div className={`text-xs ${month.value === formData.preferredMonth ? 'text-gray-300' : 'text-gray-500'}`}>
                            {new Date(month.value).getFullYear()}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Secure your production slot with a 10% deposit ({(totalPrice * 0.1).toLocaleString()}€)
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Any additional information or questions..."
              />
            </div>
          </form>
        </div>

        <div className="p-6 bg-gray-50 border-t rounded-b-lg">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-between px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-base font-medium">
              {isSubmitting ? 'Submitting...' : formData.reserveSlot ? 'Reserve Slot & Get Offer' : 'Get Offer'}
            </span>
            <span className="text-base font-medium">
              {formData.reserveSlot 
                ? `${(totalPrice * 0.1).toLocaleString()}€ deposit` 
                : `${totalPrice.toLocaleString()}€`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}