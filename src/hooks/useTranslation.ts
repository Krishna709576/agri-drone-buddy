
import { getTranslation } from "@/utils/translations";

export const useTranslation = (selectedLanguage: string) => {
  const t = (key: string): string => {
    return getTranslation(selectedLanguage, key);
  };

  return { t };
};
