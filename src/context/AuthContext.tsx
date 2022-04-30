import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext<any>({
    currentUser: null,
    signUp: (email: string, password: string) =>
        auth.createUserWithEmailAndPassword(email, password),
    login: (email: string, password: string) =>
        auth.signInWithEmailAndPassword(email, password),
});

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function signUp(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        login,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
