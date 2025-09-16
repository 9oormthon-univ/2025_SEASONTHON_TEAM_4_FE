import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const initial = {
    email: "", password: "",
    name: "", gender: "",
    birth: "", height: null, weight: null,
    status: "", sensor: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE": return { ...state, ...action.payload };
        case "RESET": return initial;
        default: return state;
    }
}

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
    const [state, dispatch] = useReducer(
        reducer,
        initial,
        (init) => {
            const cached = sessionStorage.getItem("signup");
            return cached ? JSON.parse(cached) : init;
        }
    );

    useEffect(() => {
        sessionStorage.setItem("signup", JSON.stringify(state));
    }, [state]);

    const value = useMemo(() => ({
        data: state,
        updateSignup: (payload) => dispatch({ type: "UPDATE", payload }),
        resetSignup: () => dispatch({ type: "RESET" }),
        submitSignup: async () => {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });
            if (!res.ok) throw new Error("회원가입 요청 실패");
            return res.json();
        },
    }), [state]);

    return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
}

export function useSignup() {
    const ctx = useContext(SignupContext);
    if (!ctx) throw new Error("useSignup은 <SignupProvider> 안에서만 사용하세요.");
    return ctx;
}
