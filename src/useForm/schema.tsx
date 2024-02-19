import * as yup from "yup";

export const schema = yup.object().shape({
    date: yup.string().required("Date is required"),
    consultant: yup.string().required("Consultant is required"),
    referred: yup.string().required("Referred by is required"),
    services: yup.array().of(
        yup.object().shape({
            servicename: yup.string().required("Service name is required"),
            price: yup.number().test('is-nonzero', 'Price is requireds', value => value > 0).required("Price is required"),
            quantity: yup.number().test('is-nonzero', 'Quantity is required', value => value > 0).required("Quantity is required"),
            rate: yup.number().test('is-nonzero', 'Rate must be equal to price * quantity', function (value) {
                const { price, quantity } = this.parent;
                return value === price * quantity;
            }),
            discount: yup.number(),
            unit: yup.number()
        })
    ).min(1, "At least one service is required").required(),
});
