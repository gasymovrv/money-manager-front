import React, { useEffect, useRef } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginWidgetProps {
  botUsername: string;
  onAuth: (user: TelegramUser) => void;
}

declare global {
  interface Window {
    TelegramLoginWidget?: {
      dataOnauth?: (user: TelegramUser) => void;
    };
  }
}

const TelegramLoginWidget: React.FC<TelegramLoginWidgetProps> = ({ botUsername, onAuth }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up the callback function
    window.TelegramLoginWidget = window.TelegramLoginWidget || {};
    window.TelegramLoginWidget.dataOnauth = onAuth;

    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    // Append to container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [botUsername, onAuth]);

  return <div ref={containerRef} />;
};

export default TelegramLoginWidget;
