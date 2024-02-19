import { MenuItem, Select, TextField } from '@mui/material';

const ContactDetails = ({ formik }) => {
    const fields = [
        {
            label: 'Guardian Details',
            labelId: 'guardianlabel',
            name: 'guardianlabel',
            type: 'select',
            options: ['', 'Mr', 'Mrs'],
        },
        {
            label: 'Guardian Name',
            labelId: 'guardian',
            name: 'guardian',
            type: 'text',
            placeholder: 'Enter guardian name',
        },
        {
            label: 'Email',
            labelId: 'email',
            name: 'email',
            type: 'text',
            placeholder: 'Enter email',
        },
        {
            label: 'Emergency contact number',
            labelId: 'emergency',
            name: 'emergency',
            type: 'text',
            placeholder: 'Enter emergency number',
        }
    ];

    return (
        <>
            <h4 className='font-bold mt-2'>Contact Details</h4>
            <div className='flex flex-wrap  gap-4 p-4 around h-full'>
                {fields.map((field, index) => (
                    <div key={index} className='flex min-w-[400px] h-[50px] mt-2'>
                        <label htmlFor={field.labelId} className='mr-2'>{field.label}</label>
                        {field.type === 'select' ? (
                            <Select
                                displayEmpty
                                className='h-10 w-[200px] mr-2'
                                id={field.labelId}
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{ style: { height: '10px' } }}
                                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                            >
                                {field.options.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <TextField
                                fullWidth
                                className='h-10'
                                id={field.labelId}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                                helperText={formik.touched[field.name] && formik.errors[field.name]}
                                inputProps={{ style: { height: '10px' } }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ContactDetails;
