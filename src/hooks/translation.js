import React from "react"
import {useLanguage} from "../hooks/language"
import localization from "../config/locals";
import { useSelector } from "react-redux";
export const useTranslation=()=>{
    const language = useSelector(state=>state.appPrefrences.language)
    

    const getTranslatedSentence=(sentence)=>{
        return localization[language??"en"][sentence]

    }
    return getTranslatedSentence
}