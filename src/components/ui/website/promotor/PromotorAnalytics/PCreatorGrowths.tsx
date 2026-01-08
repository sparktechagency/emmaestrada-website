"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { myFetch } from "@/utils/myFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface UserGrowthItem {
  month: string;
  value: number;
}

export default function PCreatorGrowths() {
  const currentYear = new Date().getFullYear();

  // 👉 dynamic years: current year + previous 4
  const years = useMemo(
    () => Array.from({ length: 5 }, (_, i) => currentYear - i),
    [currentYear]
  );

  const [year, setYear] = useState<number>(currentYear);
  const [data, setData] = useState<UserGrowthItem[]>([]);
  const [loading, setLoading] = useState(false);

  const generateDemoData = (selectedYear: number): UserGrowthItem[] => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const baseValue = selectedYear === currentYear ? 150 : 100;
    
    return months.map((month, index) => ({
      month,
      value: Math.floor(baseValue + Math.random() * 200 + index * 15)
    }));
  };



  const getUserGrowth = async (selectedYear: number) => {
    try {
      setLoading(true);
    //   const res = await myFetch(`/analytics/user-growth?year=${selectedYear}`);

       const demoData = generateDemoData(selectedYear);
       setData(demoData);
    //   setData(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch user growth data", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserGrowth(year);
  }, [year]);

  return (
    <Card className="bg-orange-50 rounded-2xl h-full mt-6 mb-20">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-lg sm:text-xl">User Growth Statistics</CardTitle>

        {/* Year Select (shadcn) */}
        <Select
          value={year.toString()}
          onValueChange={(val) => setYear(Number(val))}
        >
          <SelectTrigger className="w-full sm:w-[120px] bg-white">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="h-[250px] sm:h-[300px] px-2 sm:px-6">
        {loading ? (
          <p className="text-center text-gray-500 mt-20">Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ 
                top: 5, 
                right: 5, 
                left: -20, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={5}
                width={60}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value} users`, 'New Users']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#111", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}