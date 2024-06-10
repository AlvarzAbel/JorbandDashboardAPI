import { MultiSelect } from "primereact/multiselect"
import { ChordList } from "../utils/Util.Constants";

interface Props {
    name?: string;
    value?: any;
    onChange?: any;
    placeholder?: string;
    maxSelectedLabels?: number;
    className?: string;
}
export const ChordMultiSelect = ({ name, value, onChange, placeholder, maxSelectedLabels, className }: Props) => {



    return (
        <div>
            <MultiSelect
                name={name}
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                maxSelectedLabels={maxSelectedLabels}
                className={className}
                options={ChordList}
                filter
                emptyFilterMessage="No hay datos"
            />
        </div>
    )
}
