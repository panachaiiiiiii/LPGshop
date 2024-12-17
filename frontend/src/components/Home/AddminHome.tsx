import type { DatePickerProps, TableProps, TimePickerProps } from "antd";
import {
  Button,
  DatePicker,
  Modal,
  Select,
  Space,
  Table,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import PieChartExample from "./ChartExample";
import {
  data_Chart,
  data_product_table,
  data_table,
} from "../../interface/home";
import { Getdataorder, GetDetailOrder } from "../../router/home";
import {
  addDays,
  addMonths,
  addYears,
  setMonths,
  setYears,
} from "../../util/Home";
import { convertToThaiTime } from "../../util/utils";

const { Option } = Select;

type PickerType = "time" | "date";

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
}) => {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

const AddminHome = () => {
  const [type, setType] = useState<PickerType>("date");
  const [Ondate, setOndate] = useState<any>();
  const [tableData, settableData] = useState<data_table[]>([]);
  const [DetailOrder, SetDetailOrder] = useState<data_product_table[]>([]);
  const [Data_Chart, SetData_Chart] = useState<data_Chart[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const product_columns: TableProps<data_product_table>["columns"] = [
    { title: "รหัส สินค้า", dataIndex: "id", key: "id" },
    { title: "ชื่อสินค้า", dataIndex: "nameAt", key: "nameAt" },
    { title: "ต้นทุน", dataIndex: "costAt", key: "costAt" },
    { title: "ราคา", dataIndex: "priceAt", key: "priceAt" },
    { title: "จำนวน", dataIndex: "quantity", key: "quantity" },
  ];

  const columns: TableProps<data_table>["columns"] = [
    { title: "รหัส order", dataIndex: "id", key: "id" },
    { title: "วันที่ขาย", dataIndex: "dateOfsell", key: "dateOfsell" },
    { title: "ขายโดย", dataIndex: "seller", key: "seller" },
    { title: "จ่ายโดย", dataIndex: "payby", key: "payby" },
    { title: "ราคารวม", dataIndex: "total", key: "total" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record: data_table) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={async () => {
              const response: any = await GetDetailOrder(record.id);
              SetDetailOrder(response.data);
              showModal();
            }}
          >
            รายละเอียด Order
          </Button>
        </Space>
      ),
    },
  ];
  const TaketotableAndChart = async (response: any) => {
    const updatedDataChart = [...Data_Chart];
    const updatedDataTable = [...tableData];

    for (const order of response.data) {
      console.log(order);
      updatedDataTable.push({
        id: order.id,
        dateOfsell: convertToThaiTime(order.createdAt),
        payby: order.PayBy === "1" ? "เงินสด" : "โอน",
        seller: order.Users.nickName,
        total: order.total,
      });
      for (const product of order.products) {
        const existingProduct = updatedDataChart.find(
          (item) => item.name === product.nameAt
        );

        if (existingProduct) {
          existingProduct.value += product.quantity;
        } else {
          updatedDataChart.push({
            name: product.nameAt,
            value: product.quantity,
          });
        }
      }
    }
    settableData(updatedDataTable);
    SetData_Chart(updatedDataChart);
  };
  const onchangeTimepicker = async (type: string, value: dayjs.Dayjs) => {
    console.log(Ondate);
    SetData_Chart([]);
    settableData([]);
    if (type === "date") {
      const response: any = await Getdataorder(
        value.toDate(),
        addDays(value.toDate(), 1)
      );
      TaketotableAndChart(response);
    }
    if (type === "month") {
      const response: any = await Getdataorder(
        setMonths(value.toDate()),
        addMonths(value.toDate(), 1)
      );
      TaketotableAndChart(response);
    }
    if (type === "year") {
      const response: any = await Getdataorder(
        setYears(value.toDate()),
        addYears(value.toDate(), 1)
      );
      TaketotableAndChart(response);
    }
  };

  return (
    <>
      <div className="text-center">
        <Space>
          <Select value={type} onChange={setType}>
            <Option value="date">Date</Option>
            <Option value="month">Month</Option>
            <Option value="year">Year</Option>
          </Select>

          <PickerWithType
            type={type}
            onChange={(value) => {
              setOndate(value);
              onchangeTimepicker(type, value);
            }}
          />
        </Space>
      </div>
      <div className={Ondate ? "" : "hidden"}>
        <PieChartExample data={Data_Chart} />
        <div className="md:mx-auto container overflow-x-auto">
          <Table columns={columns} dataSource={tableData} rowKey="key" />
        </div>
      </div>
      <Modal
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Table
          columns={product_columns}
          dataSource={DetailOrder}
          rowKey="key"
        />
      </Modal>
    </>
  );
};

export default AddminHome;
