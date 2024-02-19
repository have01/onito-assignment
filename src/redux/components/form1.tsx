import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, MenuItem, TextField } from "@mui/material";
import { submitFirstForm } from "../formSlice";
import { useDispatch } from "react-redux";
import * as yup from "yup";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "tel" | "select";
  required: boolean;
  options?: string[];
}

const validationSchema: yup.SchemaOf<Record<string, any>> = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
  sex: yup.string().required("Sex is required"),
  mobile: yup.string().required("Mobile is required"),
  aadhar: yup.number().when('id', { is: 'aadhar', then: yup.number().required('Aadhar number is required') }),
  pan: yup.string().when('id', { is: 'pan', then: yup.string().required('Pan number is required') })
});

const formFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "age", label: "Age", type: "number", required: true },
  { name: "sex", label: "Sex", type: "select", options: ["male", "female"], required: true },
  { name: "mobile", label: "Mobile", type: "tel", required: true },
  { name: "id", label: "GovID", type: "select", options: ["aadhar", "pan"], required: true },
];

interface InitialValues {
  name: string;
  age: string;
  sex: string;
  mobile: string;
  id: string;
  aadhar: string;
  pan: string;
}

const Form1: React.FC<{ setStep: React.Dispatch<React.SetStateAction<number>> }> = ({ setStep }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values: InitialValues) => {
    dispatch(submitFirstForm(values));
    setStep(2);
  };

  const initialValues: InitialValues = {
    name: "",
    age: "",
    sex: "",
    mobile: "",
    id: "",
    aadhar: "",
    pan: ""
  }

  return (
    <div className="px-6 py-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="flex flex-col justify-start">
            {formFields.map(field => (
              <div key={field.name} className="flex justify-between my-2 w-full">
                {field.type === "select" ? (
                  <TextField
                    name={field.name}
                    select
                    label={field.label}
                    className="w-[220px]"
                    required={field.required}
                    value={values[field.name as keyof InitialValues]} // Type assertion here
                    onChange={handleChange}
                  >
                    {field.options?.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <div className=" flex flex-col">
                    <Field
                      name={field.name}
                      type={field.type}
                      label={field.label}
                      variant="outlined"
                      className="w-full"
                      as={TextField}
                      required={field.required}
                      value={values[field.name as keyof InitialValues]} // Type assertion here
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex  w-full pl-2 mt-2">
              <Button type="submit" variant="contained">
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Form1;
