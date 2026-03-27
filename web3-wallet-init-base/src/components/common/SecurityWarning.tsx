'use client';

import { useState } from 'react';
import { Button } from './Button';

interface SecurityWarningProps {
  title: string;
  message: string;
  severity?: 'low' | 'medium' | 'high';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function SecurityWarning({
  title,
  message,
  severity = 'medium',
  onConfirm,
  onCancel,
  confirmText = 'Continue',
  cancelText = 'Cancel',
}: SecurityWarningProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const severityColors = {
    low: 'border-yellow-500 bg-yellow-500/10',
    medium: 'border-orange-500 bg-orange-500/10',
    high: 'border-red-500 bg-red-500/10',
  };

  const handleConfirm = () => {
    setIsVisible(false);
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    setIsVisible(false);
    if (onCancel) onCancel();
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${severityColors[severity]}`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">
          {severity === 'high' ? '⚠️' : severity === 'medium' ? '⚡' : 'ℹ️'}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--text)] mb-1">{title}</h4>
          <p className="text-sm text-[var(--text-secondary)] mb-3">{message}</p>
          <div className="flex gap-2">
            {onConfirm && (
              <Button variant="default" size="sm" onClick={handleConfirm}>
                {confirmText}
              </Button>
            )}
            {onCancel && (
              <Button variant="secondary" size="sm" onClick={handleCancel}>
                {cancelText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
