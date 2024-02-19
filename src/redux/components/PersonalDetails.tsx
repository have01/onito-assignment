import React from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import { FormikValues, FormikHandlers } from 'formik'; // Import Formik types as needed

interface Field {
    id: string;
    label?: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
    placeholder?: string;
}

interface PersonalDetailsProps {
    formik: {
        values: FormikValues;
        handleChange: FormikHandlers['handleChange'];
        handleBlur: FormikHandlers['handleBlur'];
        errors: {
            [key: string]: string;
        };
        touched: {
            [key: string]: boolean;
        };
    };
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ formik }) => {
    // Define an array of field objects
    const fields: Field[] = [
        { id: 'name', label: 'Name*', type: 'text' },
        { id: 'age', label: 'Age*', type: 'number' },
        { id: 'sex', label: 'Sex*', type: 'select', options: ['', 'Male', 'Female'] },
        { id: 'mobile', label: 'Mobile', type: 'number' },
        { id: 'govIdType', label: 'Govt Id Type', type: 'select', options: ['', 'Addhar', 'Pan'] },
        { id: 'govId', type: 'text', placeholder: 'Enter Govt. Id' }
    ];

    return (
        <>
            <h4 className='font-bold mt-10'>Personal Details</h4>
            <div className='flex flex-wrap gap-4 p-4 around h-[200px]'>
                {fields.map(({ id, label, type, options, placeholder }) => (
                    <div key={id} className='flex w-[380px] h-[20px]'>
                        <label htmlFor={id} className='mr-2'>{label}</label>
                        {type === 'select' ? (
                            <Select
                                fullWidth
                                className='h-10'
                                displayEmpty
                                id={id}
                                name={id}
                                value={formik.values[id] as string} // Asserting type here
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[id] && Boolean(formik.errors[id])}
                            >
                                {options?.map(option => (
                                    <MenuItem key={option} value={option}>{option || 'Select an option'}</MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <TextField
                                fullWidth
                                id={id}
                                name={id}
                                type={type}
                                placeholder={placeholder || ''}
                                value={formik.values[id] as string} // Asserting type here
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[id] && Boolean(formik.errors[id])}
                                inputProps={{ style: { height: '10px' } }}
                                helperText={formik.touched[id] && formik.errors[id]}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default PersonalDetails;
