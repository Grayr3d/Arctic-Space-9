import React, { useState } from 'react';
import { Lead } from '../../types';
import { Modal } from './Modal';
import { Button } from './Button';
import { FormField } from './FormField';
import { TextArea } from './TextArea';
import { Clock, Mail, Phone, Calendar } from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
  onStatusUpdate: (leadId: string, status: Lead['status']) => void;
  onAddNote: (leadId: string, note: string) => void;
}

export function LeadDetails({ lead, onClose, onStatusUpdate, onAddNote }: LeadDetailsProps) {
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState(lead.status);

  const handleStatusChange = (newStatus: Lead['status']) => {
    setStatus(newStatus);
    onStatusUpdate(lead.id, newStatus);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(lead.id, newNote);
      setNewNote('');
    }
  };

  const statusOptions: Lead['status'][] = [
    'new',
    'contacted',
    'qualified',
    'negotiating',
    'won',
    'lost'
  ];

  return (
    <Modal
      title="Lead Details"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </>
      }
    >
      <div className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Name</div>
              <div className="text-sm text-gray-600">
                {lead.firstName} {lead.lastName}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <a 
                href={`mailto:${lead.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {lead.email}
              </a>
            </div>
            <div>
              <div className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </div>
              <a 
                href={`tel:${lead.phone}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {lead.phone}
              </a>
            </div>
            <div>
              <div className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Created
              </div>
              <div className="text-sm text-gray-600">
                {new Date(lead.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Details */}
        <div>
          <h3 className="text-lg font-medium mb-4">Configuration Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Model</span>
              <span className="text-sm text-gray-600">Nature</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Floor Plan</span>
              <span className="text-sm text-gray-600">Plan A</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Total Price</span>
              <span className="text-sm font-medium">{lead.totalPrice.toLocaleString()}€</span>
            </div>
            {lead.reserveSlot && lead.preferredMonth && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Production Month
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(lead.preferredMonth).toLocaleString('default', { 
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-lg font-medium mb-4">Status</h3>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleStatusChange(option)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  status === option
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-lg font-medium mb-4">Notes</h3>
          <div className="space-y-4">
            <FormField label="Add Note">
              <TextArea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter a new note..."
                rows={3}
              />
            </FormField>
            <Button
              variant="secondary"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              Add Note
            </Button>

            <div className="space-y-3 mt-4">
              {lead.notes?.map((note, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}