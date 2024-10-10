import LogoImage from "../../components/icons/logo.png";
import React from "react";
import MoreIcon from "../icons/more";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../dropdown/dropdown";
import { isSmallScreen } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../search-input/search-input";

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header = ({ toggleSidebar, title }: HeaderProps) => {
  // Inside your component
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="flex justify-between items-center p-4 bg-white h-[70px] border-b border-b-strokedark shadow-[0 1px 5px #00000008]">
      <div className="max-[678px]:hidden ml-32">
        <SearchInput placeholder="Search recipe.." className="w-[300px]" />
      </div>
      <div className="flex">
        <div
          className="lg:hidden block top-4 left-0 text-white pt-2 rounded"
          onClick={toggleSidebar}
        >
          <img src={LogoImage} alt="" width={100} height={100} />
        </div>
      </div>
      <div className="lg:hidden mr-20">
        <SearchInput placeholder="Search recipe.." />
      </div>
      {/* <div className="ml-auto min-[678px]:hidden">
        <NotificationIcon />
      </div> */}
      <div className="flex items-center gap-[12px] mr-[24px] max-[678px]:hidden">
        {/* <div>
          <NotificationIcon />
        </div>
        <div>
          <LineIcon />
        </div> */}
        <div>
          <div className="border-[#EAECF0] border mb-[24px]" />
          <div className="flex gap-[10px] items-center mb-24">
            <button className="w-[40px] h-[40px] rounded-full border-[#EAF8F8] outline-none cursor-pointer bg-primary bg-opacity-20">
              <span className="text-primary text-sm font-medium">MA</span>
            </button>
            <div>
              <p className="text-sm text-[#344054] font-medium ">
                Mide Ajibade
              </p>
              <div className="text-[11px] font-[300] text-[#475467] leading-[20px] flex gap-[10px] items-center mt-2">
                Admin
                <Dropdown>
                  <DropdownTrigger asChild>
                    <button className="outline-none">
                      <MoreIcon />
                    </button>
                  </DropdownTrigger>
                  <DropdownContent
                    align={isSmallScreen() ? "start" : "end"}
                    width="auto"
                    maxHeight={216}
                    className="overflow-y-auto"
                  >
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
