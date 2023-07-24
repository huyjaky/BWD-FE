import { format, parseISO, subDays } from "date-fns";
import {
  Area,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];


const PieChartDashboard = () => {
  return (
    <ResponsiveContainer width="99%" height='99%'>
      <PieChart >
        <defs>
          <linearGradient id="color0" x1="0" y1="0" x2="0" y2="1">
            {/* <stop offset="0%" stopColor="#4eb09b" stopOpacity={0.4} /> */}
            <stop offset="90%" stopColor="#4eb09b" stopOpacity={.7} />
          </linearGradient>

          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            {/* <stop offset="0%" stopColor="#f28076" stopOpacity={0.4} /> */}
            <stop offset="90%" stopColor="#f28076" stopOpacity={.7} />
          </linearGradient>
        </defs>

        <Pie data={data01} dataKey="value" nameKey="name"  outerRadius='70%' fill="url(#color0)" />
        <Pie data={data02} dataKey="value" nameKey="name"  innerRadius='70%' outerRadius='90%' fill="url(#color1)" label />

        <CartesianGrid opacity={0.1} vertical={false} />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartDashboard;
