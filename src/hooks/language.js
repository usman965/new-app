
import { useContext } from "react";
import { LanguageContext } from "config/context-provider/language-provider";


export const useLanguage = () => {
    return useContext(LanguageContext);
  };