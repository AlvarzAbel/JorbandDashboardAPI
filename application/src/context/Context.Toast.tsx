import { createContext, useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';

interface ContextType {
    toast: (
        messageType: MessageType,
        messageTitle: string,
        message: string
    ) => void;
}
interface Props {
    children: React.ReactNode;
}

type MessageType = 'error' | 'warn' | 'info' | 'success';

const ToastContext = createContext<ContextType | undefined>(undefined);

export const ToastProvider = ({ children }: Props) => {

    const toastRef = useRef<any>(null);

    const toast = (messageType: MessageType, messageTitle: string, message: string) => {
        toastRef.current?.show({ severity: messageType, summary: messageTitle, detail: message, life: 2000 })
    }

    return (
        <ToastContext.Provider value={{ toast }}>
            <Toast ref={toastRef} position="top-center" className='toast'/>
            {children}
        </ToastContext.Provider>
    )
}
export const useToast = () => {
    return useContext(ToastContext);
}