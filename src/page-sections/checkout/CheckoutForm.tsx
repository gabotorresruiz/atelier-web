import { FC } from 'react';
import { useAppContext } from '@context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { Formik } from 'formik';
import Grid from '@component/grid/Grid';
import Card1 from '@component/Card1';
import { Button } from '@component/buttons';
import TextField from '@component/text-field';
import Typography from '@component/Typography';

const checkoutSchema = yup.object().shape({
  name: yup.string().required('Por favor completar este campo'),
  lastname: yup.string().required('Por favor completar este campo'),
  email: yup
    .string()
    .email('Por favor introduzca un email válido')
    .required('Por favor completar este campo'),
  zip_code: yup.string().required('Por favor completar este campo'),
  address: yup.string().required('Por favor completar este campo')
});

const CheckoutForm: FC = () => {
  const { state } = useAppContext();
  const router = useRouter();
  let initialValues = {
    name: '',
    lastname: '',
    email: '',
    zip_code: '',
    address: ''
  };

  if (typeof window !== 'undefined') {
    const buyingUser = localStorage.getItem('buyingUser') || null;

    if (buyingUser) {
      const jsonCartUser = JSON.parse(buyingUser);
      initialValues = {
        name: jsonCartUser.name || '',
        lastname: jsonCartUser.lastname || '',
        email: jsonCartUser.email || '',
        zip_code: jsonCartUser.zip_code || '',
        address: jsonCartUser.address || ''
      };
    }
  }

  const handleFormSubmit = async (values) => {
    localStorage.setItem('buyingUser', JSON.stringify(values));
    router.push('/payment');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Address
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  label="Nombre"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  errorText={touched.name && errors.name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  label="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="lastname"
                  value={values.lastname}
                  errorText={touched.lastname && errors.lastname}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  type="email"
                  onBlur={handleBlur}
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  errorText={touched.email && errors.email}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  type="number"
                  label="Código Postal"
                  onBlur={handleBlur}
                  name="zip_code"
                  onChange={handleChange}
                  value={values.zip_code}
                  errorText={touched.zip_code && errors.zip_code}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullwidth
                label="Dirección"
                onBlur={handleBlur}
                onChange={handleChange}
                name="address"
                value={values.address}
                errorText={touched.address && errors.address}
              />
            </Grid>
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button variant="outlined" color="primary" type="button" fullwidth>
                  Regresar al Carrito
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                disabled={!state.cart.length}
                variant="contained"
                color="primary"
                type="submit"
                fullwidth
              >
                Proceder a Pagar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
