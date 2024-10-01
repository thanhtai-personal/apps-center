import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useLocalize = (language?: string) => {
  const { t, i18n } = useTranslation();
  const cachedT = useMemo(() => t, [t, language]);

  return {
    t: cachedT,
    i18n,
  };
};

export default useLocalize;
