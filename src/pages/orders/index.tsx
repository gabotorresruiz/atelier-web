import { GetStaticProps } from 'next';
import Hidden from '@component/hidden';
import FlexBox from '@component/FlexBox';
import TableRow from '@component/TableRow';
import { H5 } from '@component/Typography';
import Pagination from '@component/pagination';
import OrderRow from '@component/orders/OrderRow';
import DashboardPageHeader from '@component/layout/DashboardPageHeader';
import CustomerDashboardLayout from '@component/layout/customer-dashboard';
import { branding, categories, macrocategories } from '@utils/page_resources/orders';
import Order from '@models/order.model';

// ====================================================
type OrderListProps = { orderList: Order[] };
// ====================================================

const OrderList = ({ orderList }: OrderListProps) => (
  <>
    <DashboardPageHeader title="My Orders" iconName="bag_filled" />

    <Hidden down={769}>
      <TableRow padding="0px 18px" boxShadow="none" bg="none">
        <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
          # Orden
        </H5>
        <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
          Status
        </H5>
        <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
          Fecha de compra
        </H5>
        <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
          Total
        </H5>
      </TableRow>
    </Hidden>

    {/* {orderList.map((item) => (
      <OrderRow order={item} key={item.id} />
    ))} */}

    {/* <FlexBox justifyContent="center" mt="2.5rem">
      <Pagination
        onChange={(data) => console.log(data)}
        pageCount={Math.ceil(orderList.length / 10)}
      />
    </FlexBox> */}
  </>
);

OrderList.layout = CustomerDashboardLayout;

export const getStaticProps: GetStaticProps = async () => {
  const brandingResource = await branding.getBranding();
  const macrocategoryList = await macrocategories.getMacrocategories();
  const categoryList = await categories.getCategories();

  return {
    props: {
      brandingResource,
      categoryList,
      macrocategoryList
    }
  };
};

export default OrderList;
