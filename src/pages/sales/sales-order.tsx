import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  MenuProps,
  Space,
  Spin,
  Table,
  TableColumnsType,
} from "antd";
import "./sales-order.scss";
import { Api as ApiSalesOrder } from "@modules/sales/sales";
import { useQuery } from "react-query";
import * as XLSX from "xlsx";
import { DownOutlined } from "@ant-design/icons";

const SalesOrder = () => {
  const { t } = useTranslation();

  const [salesData, setSalesData] = useState<any[]>([]);
  const [itemDescriptionOption, setItemDescriptionOption] = useState<
    MenuProps["items"]
  >([]);
  const [managerOptions, setManagerOptions] = useState<MenuProps["items"]>([]);
  const [valuesDescription, setValuesDescription] = useState<string[]>([]);
  const [valuesManager, setValuesManager] = useState<string[]>([]);
  const [selectedItemDescription, setSelectedItemDescription] = useState<
    string[]
  >([]);
  const [selectedManager, setSelectedManager] = useState<string[]>([]);
  const optionInitUnchecked = {
    key: "all",
    label: t("all"),
    icon: <Checkbox />,
  };
  const optionInitChecked = {
    key: "all",
    label: t("all"),
    icon: <Checkbox checked={true} />,
  };

  const sales = useQuery("sales", () => ApiSalesOrder.Get(), {
    onSuccess: (data) => {
      const filterDescription: string[] = [];
      const filterManager: string[] = [];

      data.forEach((item) => {
        if (!filterDescription.includes(item.itemDescription)) {
          filterDescription.push(item.itemDescription);
        }
      });

      data.forEach((item) => {
        if (!filterManager.includes(item.salesEmployeeName)) {
          filterManager.push(item.salesEmployeeName);
        }
      });

      setValuesDescription(filterDescription);
      setItemDescriptionOption([
        { ...optionInitUnchecked },
        ...filterDescription.map((item) => ({
          key: item,
          label: item,
          icon: <Checkbox />,
        })),
      ]);

      setValuesManager(filterManager);
      setManagerOptions([
        { ...optionInitChecked },
        ...filterManager.map((item) => ({
          key: item,
          label: item,
          icon: <Checkbox checked={true} />,
        })),
      ]);
      setSelectedManager(["all", ...filterManager]);
    },
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
        sorter: (a, b) => a.debt - b.debt,
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

  const handleSortItemDescription = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value.length > 0) {
      const filterData = valuesDescription.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase()),
      );

      setItemDescriptionOption(
        filterData.map((item) => ({
          key: item,
          label: item,
        })),
      );
    } else {
      setItemDescriptionOption(
        valuesDescription.map((item) => ({ key: item, label: item })),
      );
    }
  };

  const handleSortManager = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      const filterData = valuesManager.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase()),
      );

      setManagerOptions(
        filterData.map((item) => ({
          key: item,
          label: item,
        })),
      );
    } else {
      setManagerOptions(
        valuesManager.map((item) => ({ key: item, label: item })),
      );
    }
  };

  useEffect(() => {
    setItemDescriptionOption([
      selectedItemDescription.includes("all")
        ? { ...optionInitChecked }
        : { ...optionInitUnchecked },
      ...valuesDescription.map((item) => ({
        key: item,
        label: item,
        icon: <Checkbox checked={selectedItemDescription.includes(item)} />,
      })),
    ]);
  }, [selectedItemDescription]);

  useEffect(() => {
    setManagerOptions([
      selectedManager.includes("all")
        ? { ...optionInitChecked }
        : { ...optionInitUnchecked },
      ...valuesManager.map((item) => ({
        key: item,
        label: item,
        icon: <Checkbox checked={selectedManager.includes(item)} />,
      })),
    ]);
  }, [selectedManager]);

  useEffect(() => {
    const filterData = sales.data?.filter((item) => {
      if (
        selectedItemDescription.includes(item.itemDescription) &&
        selectedManager.includes(item.salesEmployeeName)
      )
        return true;
      else return false;
    });

    setSalesData(filterData || []);
  }, [selectedManager, selectedItemDescription]);

  return (
    <div className="sales-order-page">
      <h1 className="font-bold text-xl mb-5">{t("sales-order")}</h1>

      <div className={"flex gap-4 mb-5 md:w-1/2 items-center"}>
        <Dropdown
          menu={{
            items: itemDescriptionOption,
            multiple: true,
            onClick: (e) => {
              if (e.key === "all") {
                const value = selectedItemDescription.includes("all")
                  ? []
                  : [e.key, ...valuesDescription];
                setSelectedItemDescription(value);
                return;
              }

              if (!selectedItemDescription.includes(e.key)) {
                setSelectedItemDescription((prevState) => {
                  return [...prevState, e.key];
                });
              } else {
                setSelectedItemDescription((prevState) => {
                  return prevState.filter((item) => item !== e.key);
                });
              }
            },
          }}
        >
          <div>
            <Input
              placeholder={t("item description")}
              onChange={handleSortItemDescription}
            ></Input>
          </div>
        </Dropdown>

        <Dropdown
          menu={{
            items: managerOptions,
            multiple: true,
            onClick: (e) => {
              if (e.key === "all") {
                const value = selectedManager.includes("all")
                  ? []
                  : [e.key, ...valuesManager];
                setSelectedManager(value);
                return;
              }

              if (!selectedManager.includes(e.key)) {
                setSelectedManager((prevState) => {
                  return [...prevState, e.key];
                });
              } else {
                setSelectedManager((prevState) => {
                  return prevState.filter((item) => item !== e.key);
                });
              }
            },
          }}
        >
          <div>
            <Input
              placeholder={t("sales employee name")}
              onChange={handleSortManager}
            ></Input>
          </div>
        </Dropdown>

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
