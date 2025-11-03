import { HiHome, HiCurrencyDollar, HiUser, HiCog, HiArrowUp, HiArrowDown } from "react-icons/hi";

export const SIDE_MENU_DATA = [
  {
    id: 1,
    label: "Home",
    path: "/dashboard",
    icon: HiHome,
  },
  {
    id: 2,
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: HiCurrencyDollar,
  },
  {
    id: 3,
    label: "Income",
    path: "/income",
    icon: HiArrowUp,
  },
  {
    id: 4,
    label: "Expense",
    path: "/expense",
    icon: HiArrowDown,
  },
  {
    id: 5,
    label: "Profile",
    path: "/dashboard/profile",
    icon: HiUser,
  },
  {
    id: 6,
    label: "Settings",
    path: "/dashboard/settings",
    icon: HiCog,
  },
];
