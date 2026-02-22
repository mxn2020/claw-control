// src/lib/authContext.tsx
// Client-side auth: stores session token in localStorage, fetches user via Convex me() query.
// Falls back to a guest-mode (null user) when no Convex URL is configured.

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const TOKEN_KEY = "cc_session_token";

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    orgId: string | null;
    organizations?: { id: string; name: string; slug: string; role: string }[];
    createdAt: number;
}

interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<{ mfaRequired: true; userId: string } | void>;
    mfaLogin: (userId: string, totpCode: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setOrg: (orgId: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const ACTIVE_ORG_KEY = "cc_active_org";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
    );

    // Note: api.auth is generated after running `npx convex dev`. Until then, use dynamic access.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convexApi = api as Record<string, any>;
    const meResult = useQuery(convexApi.auth?.me ?? null, { token: token ?? undefined });
    const loginMutation = useMutation(convexApi.auth?.login ?? null);
    const mfaLoginMutation = useMutation(convexApi.auth?.mfaLogin ?? null);
    const registerMutation = useMutation(convexApi.auth?.register ?? null);
    const logoutMutation = useMutation(convexApi.auth?.logout ?? null);

    // meResult is undefined while query is loading, null when no session
    const isLoading = token !== null && meResult === undefined;

    // Manage active organization
    const [activeOrgId, setActiveOrgId] = useState<string | null>(() =>
        typeof window !== "undefined" ? localStorage.getItem(ACTIVE_ORG_KEY) : null
    );

    let user = (meResult as AuthUser | null) ?? null;
    if (user && user.organizations && user.organizations.length > 0) {
        // If activeOrgId isn't set, or isn't in the user's orgs, use the first one
        const isValidOrg = user.organizations.some(o => o.id === activeOrgId);
        if (!activeOrgId || !isValidOrg) {
            const defaultOrg = user.organizations[0].id;
            user = { ...user, orgId: defaultOrg };
            if (activeOrgId !== defaultOrg && typeof window !== "undefined") {
                localStorage.setItem(ACTIVE_ORG_KEY, defaultOrg);
                // We don't call setActiveOrgId here during render to avoid warning,
                // but returning user with orgId is fine.
            }
        } else {
            user = { ...user, orgId: activeOrgId };
        }
    }

    const setOrg = useCallback((orgId: string) => {
        localStorage.setItem(ACTIVE_ORG_KEY, orgId);
        setActiveOrgId(orgId);
    }, []);


    const login = useCallback(
        async (email: string, password: string) => {
            const result = await loginMutation({ email, password });
            if (result.mfaRequired) {
                return { mfaRequired: true as const, userId: result.userId as string };
            }
            localStorage.setItem(TOKEN_KEY, result.token);
            setToken(result.token);
        },
        [loginMutation]
    );

    const mfaLogin = useCallback(
        async (userId: string, totpCode: string) => {
            const result = await mfaLoginMutation({ userId: userId as import("../../convex/_generated/dataModel").Id<"users">, totpCode });
            localStorage.setItem(TOKEN_KEY, result.token);
            setToken(result.token);
        },
        [mfaLoginMutation]
    );

    const register = useCallback(
        async (name: string, email: string, password: string) => {
            const result = await registerMutation({ name, email, password });
            localStorage.setItem(TOKEN_KEY, result.token);
            setToken(result.token);
        },
        [registerMutation]
    );

    const logout = useCallback(async () => {
        if (token) {
            try {
                await logoutMutation({ token });
            } catch {
                // Session may already be expired; continue with local cleanup
            }
        }
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    }, [token, logoutMutation]);

    const value: AuthContextValue = {
        user,
        isLoading,
        token,
        login,
        mfaLogin,
        register,
        logout,
        setOrg,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Fallback provider for when Convex is not configured (mock-data mode)
export function MockAuthProvider({ children }: { children: ReactNode }) {
    const mockUser: AuthUser = {
        id: "user_demo",
        email: "demo@clawcontrol.dev",
        name: "Demo User",
        orgId: "org_demo",
        organizations: [{ id: "org_demo", name: "Demo Org", slug: "demo", role: "owner" }],
        createdAt: Date.now() - 90 * 86_400_000,
    };

    const value: AuthContextValue = {
        user: mockUser,
        isLoading: false,
        token: "mock_token",
        login: async () => { },
        mfaLogin: async () => { },
        register: async () => { },
        logout: async () => { },
        setOrg: (_orgId: string) => { },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider or MockAuthProvider");
    }
    return ctx;
}
