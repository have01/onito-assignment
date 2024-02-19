import React from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, errors, touched }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 mb-2">{label}</label>
        <Field
            as={TextField}
            name={name}
            id={name}
            type={type}
            variant="outlined"
            fullWidth
            placeholder={label}
            error={errors[name] && touched[name]}
            helperText={errors[name] && touched[name] ? errors[name] : ''}
        />
    </div>
);

export default FormField;
