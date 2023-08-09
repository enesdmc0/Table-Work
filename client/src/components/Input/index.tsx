import React from 'react';
import { FieldValues, UseFormRegister} from "react-hook-form";


interface Props {
    label?: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
    register: UseFormRegister<FieldValues>;
    errors: any;
    name: string;
    required?: boolean;
    id: string
    defaultValue?: string

}

const Input: React.FC<Props> = ({label, name, defaultValue , id, required, placeholder, type, errors, register}) => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#9B9B9B]">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    {...register(name, {required: required})}
                    type={type}
                    name={name}
                    id={id}
                    className={`${errors ? "ring-red-300" : "ring-gray-300"} text-[#9B9B9B] block w-full bg-transparent outline-none  py-1.5 px-2 pr-10 border-b border-b-[#9B9B9B] sm:text-sm sm:leading-6`}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
            {errors && <p className="mt-2 text-sm text-red-600" id="email-error">
                This Field is required
            </p>}
        </div>
    );
};

export default Input;
