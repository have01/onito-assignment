import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { submitForm } from '../formSlice';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import { validationSchema } from "../../utils/validationSchema";
import AddressDetails from './AddressDetails';


interface FormValues {
    name: string;
    age: string;
    gender: string;
    mobile: string;
    aadhar: string;
    pan: string;
    email: string;
    gurardian: string;
    address: string;
    govIdType: string;
    emergency: string
    govId: "" | 'aadhar' | 'pan'

}
const Form = () => {
    const dispatch = useDispatch()
    const initialValues: FormValues = { name: '', address: "", emergency: "", govId: "", email: "", gurardian: "", age: '', gender: '', mobile: '', govIdType: '', aadhar: "", pan: "" };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(submitForm(values));
            console.log(values)
        },
    });

    return (
        <div className=''>
            <form onSubmit={formik.handleSubmit} className='my-20 '>
                <PersonalDetails formik={formik} />
                <ContactDetails formik={formik} />
                <AddressDetails formik={formik} />
                <div className='w-full justify-end flex mt-20'>
                    <Button color="primary" variant="contained" className='px-4' type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;
