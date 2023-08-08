import React from 'react';
import {IconType} from "react-icons";

interface Props {
    label: string;
    onClick: () => void;
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    icon?: IconType;
    color: string;
}

const Button: React.FC<Props> = ({icon: Icon, color, onClick, type, label, disabled}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={` ${color === "#ffffff" ? "text-black" : "text-white"} inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold border shadow-sm`}
            style={{backgroundColor: color}}
        >

            {Icon && <Icon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>}
            {label}
        </button>
    );
};

export default Button;
