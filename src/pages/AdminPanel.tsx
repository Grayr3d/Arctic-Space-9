import React, { useState } from 'react';
import { Settings, Home, Palette, Package, FileText, Users } from 'lucide-react';
import { FloorPlanEditor } from '../components/admin/FloorPlanEditor';
import { InteriorEditor } from '../components/admin/InteriorEditor';
import { ExteriorEditor } from '../components/admin/ExteriorEditor';
import { UpgradeEditor } from '../components/admin/UpgradeEditor';
import { SummaryEditor } from '../components/admin/SummaryEditor';
import { AdminNav } from '../components/admin/AdminNav';
import { LeadsManager } from '../components/admin/LeadsManager';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('leads');

  const tabs = [
    { id: 'leads', label: 'Leads & CRM', icon: Users },
    { id: 'floor-plans', label: 'Floor Plans', icon: Home },
    { id: 'interior', label: 'Interior Options', icon: Palette },
    { id: 'exterior', label: 'Exterior Options', icon: Package },
    { id: 'upgrades', label: 'Upgrades', icon: Package },
    { id: 'summary', label: 'Summary Images', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Settings className="w-5 h-5" />
                <span className="ml-2 text-lg font-medium">Admin Panel</span>
              </div>
              <a
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Back to Site
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <AdminNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'leads' && <LeadsManager />}
          {activeTab === 'floor-plans' && <FloorPlanEditor />}
          {activeTab === 'interior' && <InteriorEditor />}
          {activeTab === 'exterior' && <ExteriorEditor />}
          {activeTab === 'upgrades' && <UpgradeEditor />}
          {activeTab === 'summary' && <SummaryEditor />}
        </div>
      </div>
    </div>
  );
}