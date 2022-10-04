import React, { PropsWithChildren } from "react";

const speeds = {
  0: 1000,
  1: 900,
  2: 800,
  3: 700,
  4: 600,
  5: 500,
  6: 200,
  7: 100,
  8: 50,
  9: 10,
};

export type Level = keyof typeof speeds;

type Context = {
  speed: number;
  level: Level;
  setLevel: (level: Level) => void;
};

const SpeedContext = React.createContext<Context | null>(null);

export const SpeedProvider = ({ children }: PropsWithChildren) => {
  const [level, setLevel] = React.useState<Level>(7);
  const speed = React.useMemo(() => speeds[level], [level]);

  return (
    <SpeedContext.Provider value={{ speed, level, setLevel }}>
      {children}
    </SpeedContext.Provider>
  );
};

export const useSpeedContext = () => {
  const context = React.useContext(SpeedContext);
  if (!context) {
    throw new Error("Use inside a SpeedContext");
  }
  return context;
};
