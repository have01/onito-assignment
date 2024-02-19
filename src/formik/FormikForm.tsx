import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import FormField from './FormField';
import FormFieldSelect from './FormFieldSelect';
import { validationSchema } from '../utils/validationSchema';

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];
interface FormValues {
    name: string;
    age: string;
    gender: string;
    mobile: string;
    govidtype: 'male' | 'female' | '';
    aadhar: string;
    pan: string;
}


const FormikForm: React.FC = () => {
    const [selectedIdType, setSelectedIdType] = useState<string>('');
    const initialValues: FormValues = { name: '', age: '', gender: '', mobile: '', govidtype: '', aadhar: "", pan: "" };
    return (
        <div className="container mx-auto max-w-md">
            <h1 className="text-2xl font-bold mb-4">Simple Form</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <FormField label="Name" name="name" type="text" errors={errors} touched={touched} />
                        <FormField label="Age" name="age" type="number" errors={errors} touched={touched} />
                        <FormFieldSelect label="Gender" name="gender" options={genderOptions} errors={errors} touched={touched} />
                        <FormField label="Mobile Number" name="mobile" type="text" errors={errors} touched={touched} />
                        <TextField
                            value={selectedIdType}
                            onChange={(e) => setSelectedIdType(e.target.value)}
                            select
                            className="w-[170px]"
                            defaultValue='Select'
                            required
                            placeholder="Select Govt. Id"
                        >
                            <MenuItem value="" disabled>Select Govt. Id</MenuItem>
                            <MenuItem value="aadhar">Aadhar</MenuItem>
                            <MenuItem value="pan">Pan</MenuItem>
                        </TextField>

                        {selectedIdType == 'aadhar' ?
                            <FormField label="Enter Gov Id " name="aadhar" type="text" errors={errors} touched={touched} />
                            : <FormField label="Enter Gov Id" name="pan" type="text" errors={errors} touched={touched} />
                        }
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};



export default FormikForm;
