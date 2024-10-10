import React, { useState } from "react";

const ToggleSwitch = () => {
  const [activeTab, setActiveTab] = useState("Payments");

  return (
    <div className="flex justify-start bg-[#F6F7F9] rounded-[60px] p-[7px] w-[232px] h-[52px]">
      {/* Payments Button */}
      <button
        className={`${
          activeTab === "Payments" ? "bg-[#259792] text-white" : "text-gray-500"
        } rounded-[60px] transition-colors duration-300 py-[10px] px-[24px] text-sm font-[450] text-center w-[116px] h-[38px]`}
        onClick={() => setActiveTab("Payments")}
      >
        Payments
      </button>

      {/* Data Button */}
      <button
        className={`${
          activeTab === "Data" ? "bg-[#259792] text-white" : "text-gray-500"
        } rounded-[60px] transition-colors duration-300 py-[10px] px-[24px] text-sm font-[450] text-center w-[116px] h-[38px]`}
        onClick={() => setActiveTab("Data")}
      >
        Data
      </button>
    </div>
  );
};

export default ToggleSwitch;
