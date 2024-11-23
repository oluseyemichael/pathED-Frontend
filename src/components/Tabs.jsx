import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const updatedChildren = React.Children.map(children, child => {
    if (child.type === TabsList || child.type === TabsContent) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return <div>{updatedChildren}</div>;
};

export const TabsList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 border-b border-gray-200">
      {React.Children.map(children, child => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, { 
            active: activeTab === child.props.value, 
            onClick: () => setActiveTab(child.props.value) 
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger = ({ children, value, active, onClick }) => {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm transition-colors
        ${active 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, activeTab }) => {
  if (value !== activeTab) return null;
  return <div className="py-4">{children}</div>;
};