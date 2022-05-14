import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type Activities = {};

const ActivitiesContext = createContext<{ activities: string[] | null, [k: string]: any } | undefined>(undefined);

export const ActivitiesProvider: React.FC<{ children: ReactNode | undefined }> = ({ children }) => {
  const [activities, setActivities] = useState<string[] | null>(null);

  const contextValue = useMemo(() => ({ activities, setActivities }), [activities]);

  return (
    <ActivitiesContext.Provider value={contextValue}>
      {children}
    </ActivitiesContext.Provider>
  )
};

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (context === undefined) {
    throw new Error(`'useActivities' must be used within an 'ActivitiesProvider'!`)
  }

  return context;
}