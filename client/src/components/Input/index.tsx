import React from 'react';
import {FieldValues, UseFormRegister} from "react-hook-form";

interface Props {
    label?: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
    register: UseFormRegister<FieldValues>;
    errors: any;
    name: string;
    required?: boolean;
    id: string

}

const Input: React.FC<Props> = ({label, name, id, required, placeholder, type, errors, register}) => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    {...register(name, {required: required})}
                    type={type}
                    name={name}
                    id={id}
                    className={`${errors ? "ring-red-300" : "ring-gray-300"} block w-full rounded-md border-0 py-1.5 px-2 pr-10 ring-1 ring-inset sm:text-sm sm:leading-6`}
                    placeholder={placeholder}
                />
            </div>
            {errors && <p className="mt-2 text-sm text-red-600" id="email-error">
                This Field is required
            </p>}
        </div>
    );
};

export default Input;
