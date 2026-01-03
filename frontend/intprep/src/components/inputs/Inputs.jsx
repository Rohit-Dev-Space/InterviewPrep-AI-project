import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function Inputs({
    onChange,
    value,
    placeholder,
    type = "text",
    name,
    required
}) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleEye = () => setShowPassword(!showPassword);


    let inputType = type;
    if (type === "password") {
        inputType = showPassword ? "text" : "password";
    }

    return (
        <div className="outline-none w-full h-auto px-5 p-3 flex justify-between bg-slate-200 rounded-lg">
            <input
                name={name}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full outline-none"
            />
            {type === "password" && (
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={toggleEye}
                >
                    {showPassword ? <Eye /> : <EyeClosed />}
                </button>
            )}
        </div>
    );
}
