import { useLocalStorageData } from "@core-utils/react-hooks";
import { useEffect, useMemo } from "react";
import { useStore } from "../store";

export const useLanguage = (langData: any) => {
  const { uiStore } = useStore();
  
  const [language, setLanguage] = useLocalStorageData("lang-key");

  useEffect(() => {
    uiStore.language = language;
  }, [language])

  const languageObj = useMemo(() => {
    return langData[uiStore.language || "EN"];
  }, [uiStore.language])
  
  const getText = (key) => {
    return languageObj?.[key] || key
  }

  return {
    language,
    setLanguage,
    lang: languageObj,
    getText
  }
}