import { ReactNode } from "react";
import {
  MantineProvider,
  MantineProviderProps,
  MantineTheme,
} from "@mantine/core";
import { TTTMantineContext } from "../context";
import "./mantine.css"

export interface IMantineProviderProps extends MantineProviderProps {
  theme?: Partial<MantineTheme>;
  children: ReactNode;
}

const MantineContextWrapper = ({ children }: { children: ReactNode }) => {
  return <TTTMantineContext.Provider>{children}</TTTMantineContext.Provider>;
};

export const TTTMantineProvider = ({
  children,
  ...nestedProps
}: IMantineProviderProps) => {
  const { themeMapping, themeKey } = TTTMantineContext.useDataContext() || {};

  return (
    <MantineContextWrapper>
      <MantineProvider
        theme={themeMapping && themeKey ? themeMapping[themeKey] : undefined}
        {...nestedProps}
      >
        {children}
      </MantineProvider>
    </MantineContextWrapper>
  );
};
