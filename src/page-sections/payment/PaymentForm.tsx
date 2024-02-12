import { useRef, useState } from 'react';
import { useAppContext } from '@context/AppContext';
import axiosClientInterceptorInstance from 'config/axiosClientInterceptorInstance';
import Link from 'next/link';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@component/Box';
import Radio from '@component/radio';
import Grid from '@component/grid/Grid';
import Card1 from '@component/Card1';
import Divider from '@component/Divider';
import { Button } from '@component/buttons';
import TextField from '@component/text-field';
import Typography from '@component/Typography';
import Spinner from '@component/Spinner';

const initialValues = {
  card_no: '',
  name: '',
  exp_date: '',
  cvc: ''
};

const checkoutSchema = yup.object().shape({
  card_no: yup
    .number()
    .typeError('El número de la tarjeta deben ser únicamente números')
    .required('Por favor completar este campo'),
  name: yup.string().required('Por favor completar este campo'),
  exp_date: yup
    .string()
    .required('Por favor completar este campo')
    .matches(/^[0-9]{2,2}\/[0-9]{2,2}$/, 'Debe seguir el formato "DD/YY". Ej: 06/26'),
  cvc: yup
    .number()
    .required('Por favor completar este campo')
    .typeError('El código de seguridad debe ser únicamente números')
});

// ======================================================================
type PaymentFormProps = {
  setPaymentSuccess: any;
};
// ======================================================================

const PaymentForm = ({ setPaymentSuccess }: PaymentFormProps) => {
  const { state, dispatch } = useAppContext();
  const formRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async () => {
    setIsLoading(true);

    let buyingUser = localStorage.getItem('buyingUser') || null;
    if (buyingUser) buyingUser = JSON.parse(buyingUser);

    await axiosClientInterceptorInstance.post('api/orders', {
      paymentMethod,
      buyer: buyingUser,
      products: state.cart
    });

    setIsLoading(false);
    setPaymentSuccess(true);
    dispatch({ type: 'EMPTY_CART' });
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Card1 mb="2rem">
      <Radio
        mb="1.5rem"
        color="secondary"
        name="credit-card"
        onChange={handlePaymentMethodChange}
        checked={paymentMethod === 'credit-card'}
        label={
          <Typography ml="6px" fontWeight="600" fontSize="18px">
            Pagar con tarjeta de crédito o débito
          </Typography>
        }
      />
      <Divider mb="1.25rem" mx="-2rem" />
      {paymentMethod === 'credit-card' && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          innerRef={formRef}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="1.5rem">
                <Grid container horizontalSpacing={6} verticalSpacing={4}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="card_no"
                      label="Número de la tarjeta"
                      onBlur={handleBlur}
                      value={values.card_no}
                      onChange={handleChange}
                      errorText={touched.card_no && errors.card_no}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="exp_date"
                      label="Fecha de Vencimiento"
                      placeholder="MM/YY"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.exp_date}
                      errorText={touched.exp_date && errors.exp_date}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="name"
                      onBlur={handleBlur}
                      value={values.name}
                      label="Nombre en la tarjeta"
                      onChange={handleChange}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="cvc"
                      onBlur={handleBlur}
                      value={values.cvc}
                      label="Código de seguridad"
                      onChange={handleChange}
                      errorText={touched.cvc && errors.cvc}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid container spacing={7}>
                <Grid item sm={6} xs={12}>
                  <Link href={!state.cart.length ? '/cart' : '/checkout'}>
                    <a>
                      <Button variant="outlined" color="primary" type="button" fullwidth>
                        {!state.cart.length ? 'Volver al carrito' : 'Volver a los Detalles'}
                      </Button>
                    </a>
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
                    {isLoading ? <Spinner /> : 'Realizar compra'}
                  </Button>
                </Grid>
              </Grid>
              <Divider my="1.5rem" mx="-2rem" />
            </form>
          )}
        </Formik>
      )}
      <Radio
        name="cash"
        color="secondary"
        checked={paymentMethod === 'cash'}
        onChange={handlePaymentMethodChange}
        label={
          <Typography ml="6px" fontWeight="600" fontSize="18px">
            Efectivo al momento de la entrega
          </Typography>
        }
      />
      {paymentMethod === 'cash' && (
        <Box mt="2rem">
          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href={!state.cart.length ? '/cart' : '/checkout'}>
                <a>
                  <Button variant="outlined" color="primary" type="button" fullwidth>
                    {!state.cart.length ? 'Volver al carrito' : 'Volver a los Detalles'}
                  </Button>
                </a>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                disabled={!state.cart.length}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleFormSubmit}
                fullwidth
              >
                {isLoading ? <Spinner /> : 'Realizar compra'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Card1>
  );
};

export default PaymentForm;
