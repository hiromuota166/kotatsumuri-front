import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextType {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};