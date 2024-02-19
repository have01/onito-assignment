import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  age: yup
    .number()
    .required("Age is required")
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  sex: yup.string(),
  email: yup.string().email("Invalid email format"),
  mobile: yup
    .string()
    .nullable()
    .test("isValidMobile", "Invalid Mobile Number", (value) => {
      const indianMobileRegex = /^[6-9]\d{9}$/;
      const bangladeshiMobileRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
      return !value || (indianMobileRegex.test(value) || bangladeshiMobileRegex.test(value));
    }),
  guardian: yup.string(),
  guardianlabel: yup.string().when('guardian', {
    is: (value) => value?.length > 0,
    then: (schema) => console.log(schema),
    otherwise: (schema) => schema.min(0),
  }),

});

