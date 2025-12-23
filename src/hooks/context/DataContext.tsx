// context/DataContext.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  country?: string;
  userName?: string;
  birthday?: string;
  [key: string]: any; // allow future keys
}

interface DataContextType {
  data: UserData;
  image: File | null;
  setData: (newData: Partial<UserData>) => void;
  setImage: (file: File | null) => void;
  clearData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<UserData>({});
  const [image, setImageState] = useState<File | null>(null);

  const setData = (newData: Partial<UserData>) => {
    setDataState(prev => ({ ...prev, ...newData }));
  };

  const setImage = (file: File | null) => {
    setImageState(file);
  };

  const clearData = () => {
    setDataState({});
    setImageState(null);
  };

  return (
    <DataContext.Provider value={{ data, image, setData, setImage, clearData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
