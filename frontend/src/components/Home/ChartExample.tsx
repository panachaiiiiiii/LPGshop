import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { data_Chart } from "../../interface/home";

// ข้อมูลตัวอย่าง

// สีแต่ละส่วนในแผนภูมิวงกลม
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

const PieChartExample: React.FC<{ data: data_Chart[] }> = ({ data }) => {
  if (!data) {
    return (
      <>
        <div>not fond</div>
      </>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name} : ${value}`}
        >
          {/* กำหนดสีแต่ละส่วน */}
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartExample;
