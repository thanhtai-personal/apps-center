import { ReactNode } from 'react';
import { AppContext, LayoutContext } from '@/context/index';
import { Footer } from './Footer';
export interface IAppLayout {
  children: ReactNode;
}

export interface ICurrentLayout extends IAppLayout {}

const CurrentLayout = ({ children }: ICurrentLayout) => {
  const layoutData = LayoutContext.useDataContext();

  return (
    <div className='w-full'>
      {layoutData?.useHeader && (
        <div className='w-full fixed px-2 py-2 flex flex-row justify-between items-center'>
        </div>
      )}
      {children}
      {layoutData?.useFooter && <Footer />}
    </div>
  );
};

export const AppLayout = ({ children }: IAppLayout) => {
  return (
    <AppContext.Provider>
      <LayoutContext.Provider>
        <CurrentLayout>{children}</CurrentLayout>
      </LayoutContext.Provider>
    </AppContext.Provider>
  );
};
