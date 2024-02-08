// LoadingModal.tsx
import { useLoadingStore } from 'stores/useLoadingStore';
import React from 'react';

const LoadingModal: React.FC = () => {
    const { isLoading } = useLoadingStore();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="space-x-2 flex">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
            </div>
        </div>
    );
};

export default LoadingModal;
