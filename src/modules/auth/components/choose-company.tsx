import React, { FC, ReactNode } from "react";
import { CompanyLogin } from "@modules/auth/api";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import milliardImage from "@/assets/images/milliard.png";
import salesDoctorImage from "@/assets/images/sales-doctor.png";

interface Props {
  setChooseCompany: (value: "sales-doctor" | "milliard") => void;
}

const ChooseCompany: FC<Props> = ({ setChooseCompany }) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLoginCompany = async (company: "sales-doctor" | "milliard") => {
    try {
      await CompanyLogin(company);
    } catch (err) {
      messageApi.error(t("login-fail"));
    }
  };
  return (
    <>
      {contextHolder}
      <div className="flex flex-col md:flex-row gap-4">
        <div
          className={
            " flex flex-col items-center cursor-pointer rounded-xl shadow-md p-5 w-full md:w-[200px] lg:w-[300px] text-2xl font-bold text-center hover:shadow-xl transition-all duration-300 border-[1px] border-lighter-gray"
          }
          onClick={() => {
            setChooseCompany("milliard");
            handleLoginCompany("milliard");
          }}
        >
          <img src={milliardImage} alt="milliard" className="h-40 mb-3" />
          <p>Milliard</p>
        </div>
        <div
          className={
            "flex flex-col items-center cursor-pointer rounded-xl shadow-md p-5 w-full md:w-[200px] lg:w-[300px]  text-2xl font-bold text-center hover:shadow-xl transition-all duration-300 border-[1px] border-lighter-gray"
          }
          onClick={() => {
            setChooseCompany("sales-doctor");
            handleLoginCompany("sales-doctor");
          }}
        >
          <img
            src={salesDoctorImage}
            alt="sales-doctor"
            className="h-40 mb-3"
          />
          <p>Sales Doctor</p>
        </div>
      </div>
    </>
  );
};

export default ChooseCompany;
