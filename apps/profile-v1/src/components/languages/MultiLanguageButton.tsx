import { AppActionType, AppContext, LanguageKey } from '@/context/app';
import { MultiLanguageDropdown } from './MultiLanguageDropdown';
import { Button, ButtonGroup } from 'flowbite-react';
import { useTranslate } from '@/hooks/useTranslate';

export interface IMultiLanguageButton {}

export const MultiLanguageButton = ({}: IMultiLanguageButton) => {
  const appData = AppContext.useDataContext();
  const appDispatch = AppContext.useDataDispatchContext();

  const { t } = useTranslate();

  const handleChangeLanguage = (langKey: LanguageKey) => () => {
    appDispatch &&
      appDispatch({
        type: AppActionType.updateLanguage,
        payload: {
          language: langKey,
        },
      });
  };

  if (Object.keys(LanguageKey).length < 3) {
    return (
      <ButtonGroup>
        {Object.keys(LanguageKey).map((key: string) => (
          <Button
            key={`language-button-${key}`}
            className={`enabled:hover:bg-initial dark:enabled:hover:bg-initial  ${
              appData?.language === key
                ? 'bg-secondary-500 text-info-700'
                : ''
            }`}
            style={appData?.language === key ? {
              background: "var(--color-secondary-500)"
            } : {}}
            onClick={handleChangeLanguage(key as LanguageKey)}
          >
            {t(key)}
          </Button>
        ))}
      </ButtonGroup>
    );
  }

  return <MultiLanguageDropdown />;
};
