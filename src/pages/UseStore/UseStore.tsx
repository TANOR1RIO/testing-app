import { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider/StoreProvider';

export function useStore() {
    const stores = useContext(StoreContext);

    if (!stores) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return stores;
}