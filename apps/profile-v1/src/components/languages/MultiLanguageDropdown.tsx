import { AppActionType, AppContext, LanguageKey } from "@/context/app";
import { useTranslate } from "@/hooks/useTranslate";
import { Dropdown } from "flowbite-react";

export interface IMultiLanguageDropdown {}

export const MultiLanguageDropdown = ({}: IMultiLanguageDropdown) => {
  const { t } = useTranslate();
  const appDispatch = AppContext.useDataDispatchContext();
  const appData = AppContext.useDataContext();

  return (
    <Dropdown value={appData?.language} label={t("Languages")} dismissOnClick={false}
      onChange={(value: any) => {
        appDispatch && appDispatch({
          type: AppActionType.updateLanguage,
          payload: {
            language: value
          }
        })
      }}
    >
      {Object.keys(LanguageKey).map((key: string) => (
        <Dropdown.Item key={key} value={key}>{t(key)}</Dropdown.Item>
      ))}
    </Dropdown>
  );
};
