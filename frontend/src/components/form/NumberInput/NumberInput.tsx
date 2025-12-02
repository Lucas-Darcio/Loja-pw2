import { TextInput as FBTextInput, Label } from "flowbite-react";
import { HelperText } from "flowbite-react";

interface NumberInputProps {
    name: string; 
    value: number;
    label: string;
    onChange: (s: number) => void
    placeholder?: string;
    required?: boolean;
    error?: string;
}


function NumberInput({name, value, label, onChange, placeholder, required, error}: NumberInputProps) {
    return(
    <div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="name" color={error? "failure": "default"}>{label} </Label>
            </div>
            <FBTextInput 
                id={name}
                type= "number"
                onChange={(e)=> onChange(parseInt(e.target.value))}
                value={value}
                placeholder={placeholder ?? ""}
                required={required ?? false}
                color={error? "failure": "gray"}
                shadow />

                {error && <HelperText color="failure"></HelperText>}
            </div>
    </div>
    )
}

export default NumberInput