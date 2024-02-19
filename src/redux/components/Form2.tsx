import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationSchema2 } from "../../utils/validationSchema";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import Country from "./Country";
import { submitSecondForm } from "../formSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

type FormValues = {
  address?: string;
  city?: string;
  country?: string;
  pincode?: number;
};

type Form1Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
type FormErrors = {
  [key: string]: string | null | undefined;
};
const Form2: React.FC<Form1Props> = ({ setStep }) => {
  const dispatch = useDispatch();

  const [countryName, setCountryName] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>();

  //value from usefrom to handleSubmission
  const { register, handleSubmit } = useForm();

  //final form submit storing the data into redux
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { country, ...restData } = data;
    // Add additional data to the form submission
    const newData = {
      ...restData,
      country: countryName,
      id: uuidv4(),
    };
    try {
      await validationSchema2.validate(newData, { abortEarly: false });
      dispatch(submitSecondForm(newData));
      setStep(1);
    } catch (validationErrors: unknown) {
      if (validationErrors instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        validationErrors.inner.forEach(({ path = "", message }) => {
          newErrors[path] = message;
        });
        setErrors(newErrors);
      } else {
        // Handle the case where validationErrors is undefined
        setErrors(undefined);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
        <div className="flex justify- mt-2">
          <TextField
            {...register("address")}
            type="string"
            label="Address"
            variant="outlined"
          />
          {errors?.address && (
            <div className="text-red-500">{errors?.address}</div>
          )}
          <TextField
            {...register("city")}
            type="string"
            label="City"
            variant="outlined"
          />
        </div>
        <div className="flex justify-evenly mt-2">
          <Country setCountryName={setCountryName} countryName={countryName} />
          <TextField
            {...register("Pincode")}
            type="number"
            label="Pincode"
            variant="outlined"
          />
        </div>
        <div className="flex  w-full pl-2 mt-2">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form2;
