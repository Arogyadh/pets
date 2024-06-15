import React from "react";

const TextAreaInput = ({
    id,
    name,
    value,
    className,
    autoComplete,
    onChange,
    required,
    rows,
}) => {
    return (
        <textarea
            id={id}
            name={name}
            value={value}
            className={className}
            autoComplete={autoComplete}
            onChange={onChange}
            required={required}
            rows={rows}
        />
    );
};

export default TextAreaInput;
