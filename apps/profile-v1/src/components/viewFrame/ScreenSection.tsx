import { ReactNode } from "react";

export interface IScreenSection {
  children: ReactNode;
  className?: string;
  overflowHidden?: boolean;
}

export const ScreenSection = ({ children, className, overflowHidden }: IScreenSection) => {

  return (
    <div className={`w-screen h-screen ${
        overflowHidden ? "overflow-hidden" : "overflow-auto"
      } ${className}`}>
      {children}
    </div>
  );
}