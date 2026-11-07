import { createContext, use, useState, type PropsWithChildren } from "react";

export type Access = "signed-in" | "guest" | null;

type SessionValue = {
  access: Access;
  signIn: () => void;
  skip: () => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [access, setAccess] = useState<Access>(null);

  return (
    <SessionContext.Provider
      value={{
        access,
        signIn: () => setAccess("signed-in"),
        skip: () => setAccess("guest"),
        signOut: () => setAccess(null),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const value = use(SessionContext);
  if (!value) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return value;
}
