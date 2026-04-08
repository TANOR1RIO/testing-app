import { createContext } from 'react';
import { RootStore, rootStore } from '../rootStore';

export const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <StoreContext.Provider value={rootStore}>
            {children}
        </StoreContext.Provider>
    );
}