import { MenuItem, Select, TextField } from '@mui/material';


const AddressDetails = ({ formik }) => {
    return (
        <>
            <h4 className='font-bold mt-10'>Address Details</h4>
            <div className='flex flex-wrap  gap-4 p-4 around h-full'>
                <div className='flex max-w-[500px]  mt-2'>
                    <label htmlFor="name" className='mr-2'>Address </label>
                    <TextField
                        fullWidth
                        className='h-10'
                        id="address"
                        name="address"
                        placeholder='Enter address '
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        inputProps={{ style: { height: '10px' } }}
                    />
                </div>
                <div className='flex min-w-[400px] h-[50px] mt-2'>
                    <label htmlFor="name" className='mr-2'>Email</label>
                    <TextField
                        fullWidth
                        className='h-10'
                        id="email"
                        name="email"
                        placeholder='Enter email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        inputProps={{ style: { height: '10px' } }}
                    />
                </div>
                <div className='flex min-w-[400px] h-[50px] '>
                    <label htmlFor="name" className='mr-2'>Emergency contact number</label>
                    <TextField
                        fullWidth
                        className='h-10'
                        id="emergency"
                        name="emergency"
                        placeholder='Enter emergency number'
                        value={formik.values.emergency}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.emergency && Boolean(formik.errors.emergency)}
                        helperText={formik.touched.emergency && formik.errors.emergency}
                        inputProps={{ style: { height: '10px' } }}
                    />
                </div>
            </div>
        </>
    );
};

export default AddressDetails;
