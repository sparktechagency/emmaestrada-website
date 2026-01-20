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

interface RevenueItem {
  month: string;
  value: number;
}

export default function AnalyticsRevenueStatistics() {
  const currentYear = new Date().getFullYear();

  // 👉 dynamic years: current year + previous 4
  const years = useMemo(
    () => Array.from({ length: 5 }, (_, i) => currentYear - i),
    [currentYear]
  );

  const [year, setYear] = useState<number>(currentYear);
  const [data, setData] = useState<RevenueItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getRevenue = async (selectedYear: number) => {
    try {
      setLoading(true);
      const res = await myFetch(`/analytics/revenue?year=${selectedYear}`);

      setData(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch revenue", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRevenue(year);
  }, [year]);

  return (
    <Card className="bg-orange-50 rounded-2xl h-full">
      <CardHeader className="flex sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-lg sm:text-xl">Revenue Statistics</CardTitle>

        {/* Year Select (shadcn) */}
        <Select
          value={year.toString()}
          onValueChange={(val) => setYear(Number(val))}
        >
          <SelectTrigger className="w-[120px] bg-white">
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

      <CardContent className="h-[250px] sm:h-[300px]  px-2 sm:px-6">
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
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