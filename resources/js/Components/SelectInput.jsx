import React from "react";

const SelectInput = ({
    id,
    name,
    value,
    className,
    autoComplete,
    onChange,
    children,
    required,
}) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            className={className}
            autoComplete={autoComplete}
            onChange={onChange}
            required={required}
        >
            {children}
        </select>
    );
};

export default SelectInput;
