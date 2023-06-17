import { lazy } from "react";
import { CUSTOMERS } from "routes/route.constant";

const CustomerList = lazy(() => import("pages/CustomerManager/CustomerList"));

export default {
  path: CUSTOMERS,
  element: CustomerList,
};
