import { Button } from 'flowbite-react';
import { useState } from 'react';
import { AnimationView, GridView } from '..';
import { setOfThemes } from '@/utils/constants';
import { ThemeActionType, ThemeContext } from "@/context/theme";
import { FaGear } from 'react-icons/fa6';

export interface IThemeSettingBoard {}

export const ThemeSettingBoard = ({}: IThemeSettingBoard) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeDispatch = ThemeContext.useDataDispatchContext();

  return (
    <div className={'fixed top-4 right-1 z-50'}>
      {isOpen ? (
        <AnimationView.FadeInRTL>
          <div className='flex flex-row justify-center items-start p-2 bg-black-200 opacity-80 rounded-lg shadow-xl mr-2'>
            <GridView cols={2}>
              {Object.keys(setOfThemes).map((key: string) => {
                const theme = setOfThemes[key];
                return (
                  <div
                    className=' hover:border-solid hover:cursor-pointer text-text flex flex-col justify-center items-center'
                    key={key}
                    onClick={() => {
                      setIsOpen(false);
                      themeDispatch && themeDispatch({
                        type: ThemeActionType.updateTheme,
                        payload: {
                          key
                        }
                      })
                    }}
                  >
                    <div style={{ background: theme.color }} className="w-4 h-4 rounded-full"></div>
                    <div className="text-text text-sm">{theme.name}</div>
                  </div>
                );
              })}
            </GridView>
          </div>
        </AnimationView.FadeInRTL>
      ) : (
        <Button
          color={'gray'}
          onClick={() => setIsOpen(true)}
          className='p-0 m-0 bg-transparent hover:border-none enabled:bg-transparent enabled:hover:bg-transparent enabled:hover:border-none enabled:border-none text-color-text-active'
        >
          <FaGear className='w-6 h-6 hover:animate-spin opacity-55 text-text' />
        </Button>
      )}
    </div>
  );
};
