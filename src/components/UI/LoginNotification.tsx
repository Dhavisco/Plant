import React, { useEffect } from 'react'
import { MdError } from "react-icons/md";

type NotificationProps = {
  message:string;
  onClose:()=>void;
}

const LoginNotification: React.FC<NotificationProps> = ({message, onClose}) => {

// to Auto-close the notification after 5 seconds if user does not click
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   onClose();
    // }, 5000);
    const timer = setTimeout(()=>{
        onClose();
    }, 5000);   

    // Cleanup timer if the component unmounts early
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-red-50 text-red-500 text-base px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
      <MdError/> <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-gray-800 text-lg font-bold">
        &times;
      </button>
    </div>
  );
};

export default LoginNotification;