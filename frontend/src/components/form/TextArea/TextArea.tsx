import { Textarea as FBTextArea, Label } from "flowbite-react";


interface TextAreaProps {
    name: string; 
    value: string;
    label: string;
    onChange: (s: string) => void
    placeholder?: string;
    required?: boolean;
    rows?: number;
}


function TextArea({name, value, label, onChange, placeholder, required, rows}: TextAreaProps) {
    return(
    <div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="name">{label}</Label>
            </div>
            <FBTextArea 
                id={name}
                onChange={(e)=> onChange(e.target.value)}
                value={value}
                placeholder={placeholder ?? ""}
                required={required ?? false}
                shadow 
                rows={rows ?? 4}/>
            </div>
    </div>
    )
}

export default TextArea