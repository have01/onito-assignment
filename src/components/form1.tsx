import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationSchema1 } from "../utils/validationSchema";
import { Button, MenuItem, TextField } from "@mui/material";
import * as yup from "yup";
import { submitFirstForm } from "../redux/formSlice";
import { useDispatch } from "react-redux";
import Error from "./Error";

type FormValues = {
  name: string;
  age: number;
  mobile: number;
  sex: "male" | "female";
  id: "aadhar" | "pan";
};

type FormErrors = {
  [key: string]: string | null | undefined;
};
type Form1Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const Form1: React.FC<Form1Props> = ({ setStep }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FormValues>();
  const [firstFormError, setFirstFormError] = useState<FormErrors>();
  const [id, setId] = useState("");

  //function to handle data on form submit
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await validationSchema1.validate(data, { abortEarly: false });
      dispatch(submitFirstForm(data)); //on successfull promise store the data in redux store
      setStep(2);
    } catch (validationErrors: unknown) {
      const newErrors: FormErrors = {};
      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach(({ path = "", message }) => {
          newErrors[path] = message;
        });
      }
      console.log(newErrors);
      setFirstFormError(newErrors); //to store errors
    }
  };

  return (
    <>
      <div className="px-6 py-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start"
        >
          <div className="flex justify-between">
            <div className="w-2/4">
              <TextField
                {...register("name")}
                label="Name"
                variant="outlined"
                className=""
                required
              />
              <Error props={{ errorName: firstFormError?.name }} />
            </div>
            <div className="flex justify-between">
              <div className="">
                <TextField
                  {...register("age")}
                  label="Age"
                  variant="outlined"
                  required
                  type="string"
                />
                <Error props={{ errorName: firstFormError?.age }} />
              </div>
            </div>
          </div>
          <div className="flex justify-between my-2 w-full">
            <TextField
              {...register("sex")}
              select // tell TextField to render select
              label="Sex"
              className="w-[220px]"
              required
            >
              <MenuItem key="male" value="Male">
                Male
              </MenuItem>
              <MenuItem key="female" value="Female">
                Female
              </MenuItem>
            </TextField>
            <div className="flex justify-between">
              <div className=" flex flex-col">
                <TextField
                  {...register("mobile")}
                  label="Mobile"
                  variant="outlined"
                  required
                  type="tel"
                />
                <Error props={{ errorName: firstFormError?.mobile }} />
              </div>
            </div>
          </div>
          <div className="flex ">
            <TextField
              onChange={(e) => setId(e.target.value)}
              select
              label="GovID"
              className="w-[170px]"
              required
            >
              <MenuItem value="aadhar">Aadhar</MenuItem>
              <MenuItem value="pan">Pan</MenuItem>
            </TextField>

            {id && (
              <div className="flex flex-col w-3/5">
                {id === "aadhar" ? (
                  <TextField
                    {...register("aadhar")}
                    type="number"
                    label="Aadhar"
                    variant="outlined"
                    className="w-full"
                    required
                  />
                ) : (
                  <TextField
                    {...register("pan")}
                    type="string"
                    label="Pan"
                    variant="outlined"
                    className="w-full"
                    required
                  />
                )}
                <Error props={{ errorName: firstFormError?.[id] }} />
              </div>
            )}
          </div>
          <div className="flex  w-full pl-2 mt-2">
            <Button type="submit" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form1;
