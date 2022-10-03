import React, { PropsWithChildren } from "react";
import { boundedRandom } from "@/utils";

type Data = {
  numbers: number[];
  min: number;
  max: number;
};

type Context = {
  data: Data;
  generate: (size?: number) => void;
};

const DataContext = React.createContext<Context | null>(null);

const initialData: Data = {
  numbers: [],
  min: 0,
  max: 0,
};

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = React.useState<Data>(initialData);

  const generate = React.useCallback((size = 20) => {
    const numbers: number[] = [];
    for (let i = 0; i < size; i++) {
      numbers[i] = boundedRandom(1, 100);
    }
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    setData({ numbers, min, max });
  }, []);

  React.useEffect(() => {
    generate(20);
  }, [generate]);

  return (
    <DataContext.Provider value={{ data, generate }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("Use inside a DataProvider!");
  }
  return context;
};
