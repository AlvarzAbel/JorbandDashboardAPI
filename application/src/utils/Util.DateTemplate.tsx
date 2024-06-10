import { format, parseISO } from "date-fns";
import esLocale from 'date-fns/locale/es'

export const dateTemplate = (date: any) => {
    const originalDate = parseISO(date);
    const formatedDate = format(originalDate, 'eeee, d MMMM yyyy', { locale: esLocale });

    return <>{ formatedDate }</>
};