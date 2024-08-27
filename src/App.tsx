import { Button, ConfigProvider, Space, Table, Card, Form, Input } from "antd";
const { Column, ColumnGroup } = Table;
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  title: string;
  num2top: number;
  num2bot: number;
  num3top: number;
  num3bot: number;
  num3tod: number;
}
interface DataCard {
  name: string;
  Totals: number;
}

const items = [
  {
    key: String("sell"),
    label: "ปล่อยเลข",
  },
  {
    key: String("setting"),
    label: "ตั้งค่า",
  },
  {
    key: String("list"),
    label: "บันทึกรายการ",
  },
];

const numinput = [
  { key: "num", message: "Missing Number", text: "ตัวเลข" },
  { key: "top", message: "Missing Number", text: "บน" },
  { key: "bot", message: "Missing Number", text: "ล่าง" },
  { key: "tod", message: "Missing Number", text: "โต๊ด" },
];
const data: DataType[] = [
  {
    key: "1",
    title: "ยอดปกติ",
    num2top: 244,
    num2bot: 244,
    num3top: 22,
    num3bot: 244,
    num3tod: 244,
  },
  {
    key: "2",
    title: "ตัดตัวกัก",
    num2top: 244,
    num2bot: 244,
    num3top: 22,
    num3bot: 244,
    num3tod: 244,
  },
  {
    key: "3",
    title: "ตัดตัวกักเเละตัวเเถม",
    num2top: 244,
    num2bot: 244,
    num3top: 22,
    num3bot: 244,
    num3tod: 244,
  },
];
const infocard: DataCard[] = [
  { name: "ผลรวมยอดขาย", Totals: 20000 },
  { name: "ผลรวมยอดขายตัดตัวเเถม", Totals: 20000 },
  { name: "ผลรวมยอดขายตัดตัวเเถมเเละตัวกั๊ก", Totals: 20000 },
];
function App() {
  const fomatnum = (values: number) => {
    return String(values).replace(/(.)(?=(\d{3})+$)/g, "$1,");
  };
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemPaddingInline: 20,
            },
          },
        }}
      >
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            className="justify-center text-sm md:text-lg"
          />
        </Header>
      </ConfigProvider>

      <div className="hidden md:flex lg:mx-56 md:mx-auto h-36 mt-4 justify-around">
        {infocard.map((infocard) => {
          return (
            <Card
              title={infocard.name}
              bordered={false}
              className="flex-grow md:mx-4"
            >
              <p className="text-2xl">{fomatnum(infocard.Totals)}</p>
            </Card>
          );
        })}
      </div>
      <div className="mt-4 w-4/6 m-2 md:mx-auto hidden md:block">
        <Table dataSource={data} pagination={false}>
          <ColumnGroup title="ยอดรวม" className="md:text-2xl">
            <Column title="หัวข้อ" dataIndex="title" key="title" />

            <Column title="เลข2บน" dataIndex="num2top" key="num2top" />
            <Column title="เลข2ล่าง" dataIndex="num2bot" key="num2bot" />

            <Column title="เลข3บน" dataIndex="num3top" key="num3top" />
            <Column title="เลข3ล่าง" dataIndex="num3bot" key="num3bot" />
            <Column title="เลข3โต๊ด" dataIndex="num3tod" key="num3tod" />
          </ColumnGroup>
        </Table>
      </div>
      <div className="mx-auto w-2/3 justify-center mt-8">
        <p className="mb-5 text-lg md:text-3xl font-bold">ปล่อยตัวเลข</p>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.List name="num_user">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <p className="w-10 text-sm block">ช่อง {[name + 1]}</p>
                    <div className="md:flex grid grid-cols-2">
                      {numinput.map((numinput) => {
                        return (
                          <Form.Item
                            {...restField}
                            className="mx-4"
                            name={[name, numinput.key]}
                            rules={[
                              { required: true, message: numinput.message },
                            ]}
                          >
                            <Input placeholder={numinput.text} />
                          </Form.Item>
                        );
                      })}
                    </div>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item className="w-36">
                  {/* Add BUTTUN */}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    เพิ่มช่องปล่อยเลข
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ยืนยันการส่งเลข
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default App;
