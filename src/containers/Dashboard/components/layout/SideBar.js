import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import StudentMenuItems from "./StudentMenuItems";
import JobseekerMenuItems from "./JobseekerMenuItems";
import EmployerMenuItems from "./EmployerMenuItems";
import AdministratorMenuItems from "./AdminMenuItems";
import AcademeMenuItems from "./AcademeMenuItems";
import { ExpandMore, ExpandLess, Menu, ChevronLeft } from "@mui/icons-material";
import ToggleDarkMode from "../../../../reusable/components/toggleDarkMode";
import * as actions from '../../../../store/actions/auth';
import axios from "../../../../axios";
import { useSelector, useDispatch } from "react-redux";
import logoNav from '../../../Home/images/logonav.png';
import pesoLogo from '../../../Home/images/pesoLogo.png';


const SidebarGroupItems = ({ title, children, isCollapsed, isOpen, onToggle }) => (
    <>
        {!isCollapsed && (
            <button
                onClick={onToggle}
                className={`flex justify-between items-center w-full px-3 py-2
                    text-gray-900 dark:text-white font-bold text-xs cursor-pointer
                    hover:bg-gray-300 dark:hover:bg-gray-900 transition-all duration-300 ease-in-out
                    ${isOpen ? "bg-gray-200 dark:bg-gray-800" : "bg-transparent"}
                `}
            >
                <span>{title}</span>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </button>
        )}

        {(isCollapsed || (!isCollapsed && isOpen)) && (
            <div className={`pl-4 flex flex-col ${isCollapsed ? "gap-5" : ""} transition-all duration-300 ease-in-out`}>
                {children}
            </div>
        )}
    </>
);


const SidebarItem = ({ title, to, icon, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center w-full px-3 py-2 cursor-pointer no-underline rounded-md
        ${isActive
          ? "bg-blue-600 text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "justify-center gap-0" : ""}
      `}
    >
      {icon && (
        <span className={isCollapsed ? "" : "mr-2"}>
          {icon}
        </span>
      )}
      {!isCollapsed && <span className="text-md">{title}</span>}
    </Link>
  );
};

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
    const userType = useSelector((state) => state.user.userType);
    const [selected, setSelected] = useState("Dashboard");
    const [profileImage, setProfileImage] = useState("https://bit.ly/40SdWk7");
    const location = useLocation();
    const [menuItems, setMenuItems] = useState([]);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        dispatch(actions.getAuthStorage());
    }, [dispatch]);

    useEffect(() => {
        axios
            .get("api/get-user-info", {
                auth: { username: auth.token }
            })
            .then((response) => {
                setProfileData(response.data.personal_information[0]);
            })
            .catch((error) => {
                console.error("There was an error fetching the profile data!", error);
            });
    }, [auth]);


    useEffect(() => {
        if (userType === "STUDENT") {
            setMenuItems(StudentMenuItems);
        } else if (userType === "JOBSEEKER") {
            setMenuItems(JobseekerMenuItems);
        } else if (userType === "EMPLOYER") {
            setMenuItems(EmployerMenuItems);
        } else if (userType === "ADMIN") {
            setMenuItems(AdministratorMenuItems);
        } else if (userType === "ACADEME") {
            setMenuItems(AcademeMenuItems);
        }
    }, [userType]);

    const [openSections, setOpenSections] = useState({});
    useEffect(() => {
        setOpenSections(Object.fromEntries(menuItems.map(({ key }) => [key, true])));
    }, [menuItems]);

    // Set initial selected based on current path
    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = menuItems.flatMap(group => group.items)
          .find(item => item.to === currentPath);
        if (currentItem) {
          setSelected(currentItem.title);
        }
      }, [location.pathname, menuItems]);


    // Sidebar width in px (must match the w-[280px] or w-20)
    const sidebarWidth = isCollapsed ? 40 : 40;

    return (
        <div
            className={`
                relative
                ${isCollapsed ? "w-20" : "w-[280px]"}
                bg-gray-100 dark:bg-gray-950 h-dvh pb-10 overflow-y-auto
                transition-all duration-300 ease-in-out
            `}
        >
            {/* Logo and Title */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
                <img src={logoNav} alt="IPEPS Logo" className="h-8 w-8" />
                {!isCollapsed && (
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                        IPEPS
                    </span>
                )}
            </div>

            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`
                    absolute
                    top-20
                    flex items-center justify-center
                    w-10 h-10 rounded-full
                    bg-blue-600 text-white
                    shadow-lg cursor-pointer
                    hover:bg-blue-700
                    transition-all duration-300 ease-in-out
                `}
                style={{
                    left: sidebarWidth - 20, // 20px from the right edge of the sidebar
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 2147483647,
                }}
            >
                {isCollapsed ? <Menu className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>
            

            {!isCollapsed && (
                <div className="mb-6 text-center pt-6 relative">
                    <ToggleDarkMode className={"absolute right-3 top-3"} />
                    <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
                        <label htmlFor="profile-upload" className="block w-full h-full cursor-pointer">
                            <img
                                alt="profile-user"
                                src={profileImage}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                        </label>
                        <input id="profile-upload" type="file" accept="image/*" className="hidden" />
                    </div>
                    <p className="text-gray-900 dark:text-white text-lg font-semibold mt-2.5">{profileData?.first_name} {profileData?.last_name}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm opacity-75">{userType}</p>
                </div>
            )}

            <div className={`flex flex-col ${isCollapsed ? "gap-5 mt-20 mr-2" : "mt-5"}`}>
                {menuItems.map(({ title, key, items }) => (
                    <SidebarGroupItems
                        key={key}
                        title={title}
                        isCollapsed={isCollapsed}
                        isOpen={openSections[key]}
                        onToggle={() => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))}
                    >
                        {items.map(({ title, to, icon }) => (
                            <SidebarItem
                                key={title}
                                title={title}
                                to={to}
                                icon={icon}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </SidebarGroupItems>
                ))}
            </div>

        </div>
    );
};

export default SideBar;
