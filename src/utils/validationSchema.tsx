import * as yup from "yup";

export const validationSchema1 = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name be at least 3 char"),
  age: yup.number().typeError("age must be a number"),
  mobile: yup
    .string()
    .test("isIndianMobile", "Invalid Indian Mobile Number", (value) => {
      const indianMobileRegex = /^[6-9]\d{9}$/;
      return indianMobileRegex.test(value);
    }),

  aadhar: yup
    .string()
    .optional()
    .matches(
      /^[2-9]\d{11}$/,
      "Must be 12 digits and should not start with 0 or 1"
    ),
});

export const validationSchema2 = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  // country: yup.string().required().matches('Country is required'),
  pincode: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, "Pincode must be numeric"),
});
