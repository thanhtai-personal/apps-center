import { IAppContext, LanguageCode, LanguageKey } from "./interfaces";

// Initial state
export const initialData: IAppContext = {
  loading: false,
  language: LanguageKey.en,
  languageCode: LanguageCode[LanguageKey.en]
};