import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Input,
  notification,
  Popconfirm,
  Spin,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { QueryClient, useMutation, useQuery } from "react-query";
import { Api, Types } from "@/modules/clients/client";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const queryClient = new QueryClient();
  const { t } = useTranslation();
  const [skipPage, setSkipPage] = useState(0);
  const navigate = useNavigate();
  const [prevPage, setPrevData] = useState(0);

  // const clients = useQuery(["clients"], () => Api.Get(skipPage * 20), {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     if (!data.length && skipPage) {
  //       notification.warning({
  //         message: t("not-page"),
  //       });
  //       setSkipPage(prevPage);
  //     }
  //     if (data.length || skipPage === 0) {
  //       setPrevData(skipPage);
  //     }
  //   },
  // });

  const columns: TableColumnsType<Types.IEntity.Client> = useMemo(
    () => [
      {
        title: t("customer"),
        width: "23%",
        dataIndex: "cardName",
        render: (value) => <p className="w-[140px]">{value}</p>,
      },
      {
        title: t("phone-number"),
        dataIndex: "phone1",
      },
      {
        title: t("balance"),
        dataIndex: "currentAccountBalance",
      },
    ],
    [t],
  );

  // function handleSee(code: string) {
  //   navigate(`${code}`);
  // }
  //
  // function handleReturns(code: string) {
  //   navigate(`returns/${code}`);
  // }
  //
  // function handleSale(code: string) {
  //   navigate(`sales/${code}`);
  // }
  //
  // function handlePayment(code: string) {
  //   navigate(`payments/${code}`);
  // }
  //
  // const handleSkipPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     const target = e.target as HTMLInputElement;
  //     if (+target.value > 0) {
  //       setSkipPage(+target.value - 1);
  //       clients.refetch();
  //     } else {
  //       notification.warning({
  //         message: t("not-page"),
  //       });
  //     }
  //   }
  // };
  //
  // const handlePrevious = () => {
  //   if (skipPage > 0) {
  //     setSkipPage((prevState) => prevState - 1);
  //     clients.refetch();
  //   } else {
  //     notification.warning({
  //       message: t("not-page"),
  //     });
  //   }
  // };
  //
  // const handleNext = () => {
  //   setSkipPage((prevState) => prevState + 1);
  //   clients.refetch();
  // };

  return (
    <div className="sales-order-page">
      <h1 className="font-bold text-xl">{t("suppliers")}</h1>
      <Spin spinning={false}>
        <div className=" h-[71vh] overflow-y-auto rounded-md relative">
          <Table
            className="h-full min-w-fit"
            columns={columns}
            dataSource={[]}
            pagination={false}
          />
        </div>
      </Spin>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-1 w-fit">
          <span className="whitespace-nowrap">{t("go")}</span>
          <Input
            type="number"
            className="w-[50px]"
            // onKeyPress={handleSkipPage}
          />
          <span>{t("page")}</span>
        </div>

        <div className="flex gap-7 items-center">
          <button
            className="bg-secondary text-white px-3 py-1"
            // onClick={handlePrevious}
          >
            {"<"}
          </button>
          <span>{skipPage + 1}</span>
          <button
            className="bg-secondary text-white color-white px-3 py-1"
            // onClick={handleNext}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clients;
