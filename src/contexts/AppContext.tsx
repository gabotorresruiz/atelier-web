import Color from '@models/color.model';
import ProductSize from '@models/product-size.model';
import Product from '@models/product.model';
import { createContext, FC, ReactNode, useContext, useMemo, useReducer } from 'react';

// =================================================================================
type InitialState = { cart: CartItem[]; isHeaderFixed: boolean };

export type CartItem = {
  product?: Product;
  price: number;
  qty: number;
  color?: Color;
  size?: ProductSize;
};

type CartActionType = { type: 'CHANGE_CART_AMOUNT'; payload: CartItem };
type EmptyCartActionType = { type: 'EMPTY_CART' };
type LayoutActionType = { type: 'TOGGLE_HEADER'; payload: boolean };
type ActionType = CartActionType | LayoutActionType | EmptyCartActionType;

// =================================================================================

const INITIAL_CART = [];

const INITIAL_STATE = { cart: INITIAL_CART, isHeaderFixed: false };

interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

const reducer = (state: InitialState, action: ActionType) => {
  let cartList: CartItem[] = [];
  let cartItem: CartItem = null;
  let exist = -1;

  switch (action.type) {
    case 'TOGGLE_HEADER':
      return { ...state, isHeaderFixed: action.payload };

    case 'EMPTY_CART':
      return { ...state, cart: [] };

    case 'CHANGE_CART_AMOUNT':
      cartList = state.cart;
      cartItem = action.payload;
      exist =
        // eslint-disable-next-line no-nested-ternary
        cartItem.color !== null
          ? cartList.findIndex(
              (item: CartItem): boolean =>
                item.product.id === cartItem.product.id &&
                item.color.id === cartItem.color.id &&
                item?.size.id === cartItem?.size.id
            )
          : cartItem.color === null && cartItem.size !== null
          ? cartList.findIndex(
              (item: CartItem): boolean =>
                item.product.id === cartItem.product.id && item?.size.id === cartItem?.size.id
            )
          : cartList.findIndex(
              (item: CartItem): boolean => item.product.id === cartItem.product.id
            );

      if (cartItem.qty < 1)
        return {
          ...state,
          cart:
            // eslint-disable-next-line no-nested-ternary
            cartItem.color !== null
              ? cartList.filter(
                  (item: CartItem) =>
                    item.product.id !== cartItem.product.id ||
                    item.color.id !== cartItem.color.id ||
                    item?.size.id !== cartItem?.size.id
                )
              : cartItem.color === null && cartItem?.size !== null
              ? cartList.filter(
                  (item: CartItem) =>
                    item.product.id !== cartItem.product.id && item?.size.id !== cartItem?.size.id
                )
              : cartList.filter((item: CartItem) => item.product.id !== cartItem.product.id)
        };

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist >= 0) {
        const newCart = cartList.map((item, idx) =>
          idx === exist
            ? { ...item, qty: item.qty === cartItem.qty ? cartItem.qty + 1 : cartItem.qty }
            : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

// =======================================================
type AppProviderProps = { children: ReactNode };
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
