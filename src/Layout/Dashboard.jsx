import { BiHome, BiMenu } from "react-icons/bi";
import { CgHome } from "react-icons/cg";
import { FaAd, FaCalendar, FaHistory, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaList, FaUsers, FaUtensils } from "react-icons/fa6";
import { FcContacts } from "react-icons/fc";
import { MdReviews } from "react-icons/md";
import { SiShopee } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const isAdmin = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-full bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              {" "}
              <li>
                <NavLink to={"/dashboard/adminHome"}>
                  <BiHome></BiHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/addItems"}>
                  <FaUtensils></FaUtensils> add Items
                </NavLink>
              </li>
              
              <li>
                <NavLink to={"/dashboard/manageItems"}>
                  <FaList></FaList> Mange Item
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/bookings"}>
                <FaAd></FaAd>
                   Mange Booking
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/allUsers"}>
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/dashboard/user"}>
                  <BiHome></BiHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/reservation"}>
                  <FaCalendar></FaCalendar> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/payment"}>
                  <FaHistory></FaHistory> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/cart"}>
                  <FaShoppingCart></FaShoppingCart>My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/reviews"}>
                  <MdReviews></MdReviews> Add Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/booking"}>
                  <FaCalendar></FaCalendar> My Booking
                </NavLink>
              </li>
            </>
          )}

          {/* share nav links  */}
          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>
              <CgHome></CgHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order/salad"}>
              <BiMenu></BiMenu> menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/shop"}>
              <SiShopee></SiShopee> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/contact"}>
              <FcContacts></FcContacts> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
