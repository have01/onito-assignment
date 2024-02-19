import React from 'react';
import { Select, MenuItem, FormControl, FormHelperText } from '@mui/material';

interface FormFieldSelectProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
    defaultValue?: string; // Add a defaultValue prop
}

const FormFieldSelect: React.FC<FormFieldSelectProps> = ({ label, name, options, errors, touched, defaultValue }) => {
    return (
        <FormControl fullWidth margin="normal">
            <label>{label}</label>
            <Select
                id={name}
                name={name}
                error={touched[name] && Boolean(errors[name])}
                displayEmpty
                value={defaultValue} // Set the value prop to the defaultValue
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={touched[name] && Boolean(errors[name])}>{touched[name] && errors[name]}</FormHelperText>
        </FormControl>
    );
};

export default FormFieldSelect;
