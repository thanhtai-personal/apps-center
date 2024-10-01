import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { ReactNode } from 'react';
import { ThemeSettingBoard } from "./ThemeSettingBoard"

export interface IThemeProvider {
  useToggle?: boolean;
  useSettingBoard?: boolean;
  children: ReactNode;
}

export function ThemeProvider({
  useToggle = false,
  useSettingBoard = false,
  children
}: IThemeProvider) {
  return (
    <Flowbite>
      {children}
      {useToggle && <DarkThemeToggle />}
      {useSettingBoard && <ThemeSettingBoard />}
    </Flowbite>
  );
}
