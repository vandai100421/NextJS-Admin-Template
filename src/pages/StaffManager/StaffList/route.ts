import { lazy } from "react";
import { STAFFS } from "routes/route.constant";
const StaffList = lazy(() => import("pages/StaffManager/StaffList"));

export default {
  path: STAFFS,
  element: StaffList,
};
