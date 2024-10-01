export enum AppActionType {
  updateLanguage = "UPDATE_LANGUAGE"
}

export enum LanguageKey {
  vi = "vi",
  en = "en",
}

export enum LanguageCode {
  vi = "vi-VN",
  en = "en-EN",
}

export interface IAction<T, K> {
  type: T,
  payload: K;
}

export interface UpdateLanguagePayload {
  language: LanguageKey;
}



// Define the state type
export interface IAppContext {
  loading?: boolean;
  language?: string;
  languageCode?: string;
}