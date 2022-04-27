import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext<any>({
    currentUser: null,
    signUp: (email: string, password: string) =>
        auth.createUserWithEmailAndPassword(email, password),
});

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    function signUp(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) =>
            setCurrentUser(user)
        );

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
