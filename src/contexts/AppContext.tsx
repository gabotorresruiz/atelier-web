import { createContext, FC, ReactNode, useContext, useMemo, useReducer } from 'react';

// =================================================================================
type InitialState = { cart: CartItem[]; isHeaderFixed: boolean };

export type CartItem = {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};

type CartActionType = { type: 'CHANGE_CART_AMOUNT'; payload: CartItem };
type LayoutActionType = { type: 'TOGGLE_HEADER'; payload: boolean };
type ActionType = CartActionType | LayoutActionType;

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
  let cartList;
  let cartItem;
  let exist;

  switch (action.type) {
    case 'TOGGLE_HEADER':
      return { ...state, isHeaderFixed: action.payload };

    case 'CHANGE_CART_AMOUNT':
      cartList = state.cart;
      cartItem = action.payload;
      exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
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
