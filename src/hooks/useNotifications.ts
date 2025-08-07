'use client';

import { toast } from 'sonner';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useNotifications = () => {
  const showNotification = (
    type: NotificationType,
    title: string,
    message?: string,
    options?: NotificationOptions
  ) => {
    const notificationOptions = {
      duration: options?.duration || 4000,
      action: options?.action,
    };

    switch (type) {
      case 'success':
        toast.success(title, {
          description: message,
          ...notificationOptions,
        });
        break;
      case 'error':
        toast.error(title, {
          description: message,
          ...notificationOptions,
        });
        break;
      case 'warning':
        toast.warning(title, {
          description: message,
          ...notificationOptions,
        });
        break;
      case 'info':
        toast.info(title, {
          description: message,
          ...notificationOptions,
        });
        break;
    }
  };

  const showSuccess = (title: string, message?: string, options?: NotificationOptions) => {
    showNotification('success', title, message, options);
  };

  const showError = (title: string, message?: string, options?: NotificationOptions) => {
    showNotification('error', title, message, options);
  };

  const showWarning = (title: string, message?: string, options?: NotificationOptions) => {
    showNotification('warning', title, message, options);
  };

  const showInfo = (title: string, message?: string, options?: NotificationOptions) => {
    showNotification('info', title, message, options);
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismiss,
    dismissAll,
  };
};
