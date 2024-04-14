import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Spin, Table, TableColumnsType } from "antd";
import "./sales-order.scss";
import { Api as ApiSalesOrder } from "@modules/sales/sales";
import { useQuery } from "react-query";
import * as XLSX from "xlsx";

const SalesOrder = () => {
  const { t } = useTranslation();

  const [salesData, setSalesData] = useState<any[]>([]);
  const [itemCode, setItemCode] = useState<string>("");
  const [managerName, setManagerName] = useState<string>("");

  const sales = useQuery("sales", () => ApiSalesOrder.Get(), {
    refetchOnWindowFocus: false,
  });

  const exportToExcel = (data: any) => {
    const formatedData = data.map((item: any) => ({
      [t("customer")]: item.cardName,
      [t("sales amount")]: item.docTotalFC,
      [t("paid amount")]: item.paidAmount,
      [t("debt")]: item.debt,
      [t("item description")]: item.itemDescription,
      [t("sales employee name")]: item.salesEmployeeName,
      [t("phone")]: item.phone1,
    }));

    const ws = XLSX.utils.json_to_sheet(formatedData);
    ws["!cols"] = [
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbBlob = new Blob(
      [XLSX.write(wb, { bookType: "xlsx", type: "buffer" })],
      { type: "application/octet-stream" },
    );

    const url = window.URL.createObjectURL(wbBlob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "data.xlsx";

    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  useEffect(() => {
    let data: any;
    if (itemCode.length > 0 || managerName.length > 0) {
      data = sales.data?.filter((item) => {
        return (
          item.itemCode.includes(itemCode) &&
          item.salesEmployeeName.includes(managerName)
        );
      });
    }

    setSalesData(data || []);
  }, [itemCode, managerName]);

  const columns: TableColumnsType<any> = useMemo(
    () => [
      {
        title: t("customer"),
        dataIndex: "cardName",
        render: (value) => <p className="w-[140px]">{value}</p>,
      },
      {
        title: t("sales amount"),
        dataIndex: "docTotalFC",
      },
      {
        title: t("paid amount"),
        dataIndex: "paidAmount",
      },
      {
        title: t("debt"),
        dataIndex: "debt",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: t("item description"),
        dataIndex: "itemDescription",
      },
      {
        title: t("sales employee name"),
        dataIndex: "salesEmployeeName",
      },
      {
        title: t("phone"),
        dataIndex: "phone1",
      },
    ],
    [t, sales.isLoading],
  );

  return (
    <div className="sales-order-page">
      <h1 className="font-bold text-xl mb-5">{t("sales-order")}</h1>

      <div className={"flex gap-4 mb-5 md:w-1/2"}>
        <Input
          placeholder={"item code"}
          onChange={(e) => setItemCode(e.target.value)}
        ></Input>
        <Input
          placeholder={t("sales employee name")}
          onChange={(e) => setManagerName(e.target.value)}
        ></Input>
        <Button type={"primary"} onClick={() => exportToExcel(salesData)}>
          {t("create excel")}
        </Button>
      </div>
      <Spin spinning={sales.isFetching}>
        <div className="mt-7 h-full overflow-y-auto rounded-md relative">
          <Table
            className="h-full min-w-fit"
            columns={columns}
            dataSource={salesData}
            pagination={false}
          />
        </div>
      </Spin>
    </div>
  );
};

export default SalesOrder;
