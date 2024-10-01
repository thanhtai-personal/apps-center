import { LanguageCode, LanguageKey } from "@/context/index";

export const getLanguageCode = (key: LanguageKey) => {
  return LanguageCode[key]
}