import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={20} color="#34d399" />,
    error: <AlertCircle size={20} color="#f87171" />,
    info: <Info size={20} color="#60a5fa" />
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type || 'info'}`}>
        {icons[toast.type] || icons.info}
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
        <button onClick={onClose} style={{ marginLeft: 'auto', color: '#94a3b8' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
