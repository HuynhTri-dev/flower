"use client";

import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { TrendingUp } from "lucide-react";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RevenueData {
    month: string;
    revenue: number;
}

interface RevenueChartProps {
    data?: RevenueData[];
    title?: string;
}

// Helper function to get last 6 months labels
const getLast6Months = (): string[] => {
    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
        "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
        "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    const result: string[] = [];
    const currentDate = new Date();

    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        result.push(months[date.getMonth()]);
    }

    return result;
};

// Mock data for demonstration
const getDefaultData = (): RevenueData[] => {
    const months = getLast6Months();
    return months.map((month, index) => ({
        month,
        revenue: Math.floor(Math.random() * 50000000) + 10000000 // Random revenue 10M - 60M VND
    }));
};

export default function RevenueChart({ data, title = "Doanh thu 6 tháng gần nhất" }: RevenueChartProps) {
    const chartData = useMemo(() => {
        const revenueData = data || getDefaultData();

        return {
            labels: revenueData.map(d => d.month),
            datasets: [
                {
                    label: "Doanh thu (VNĐ)",
                    data: revenueData.map(d => d.revenue),
                    backgroundColor: [
                        "rgba(43, 80, 170, 0.9)",   // Primary #2B50AA
                        "rgba(43, 80, 170, 0.75)",  // Primary lighter
                        "rgba(43, 80, 170, 0.6)",   // Primary even lighter
                        "rgba(255, 143, 163, 0.9)", // Accent #FF8FA3
                        "rgba(255, 143, 163, 0.75)",// Accent lighter
                        "rgba(255, 143, 163, 0.6)", // Accent even lighter
                    ],
                    borderColor: [
                        "#2B50AA", // Primary
                        "#2B50AA",
                        "#2B50AA",
                        "#FF8FA3", // Accent
                        "#FF8FA3",
                        "#FF8FA3",
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                },
            ],
        };
    }, [data]);

    const options: ChartOptions<"bar"> = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                titleColor: "#1A2C42",  // Text Dark
                bodyColor: "#1A2C42",   // Text Dark
                borderColor: "rgba(43, 80, 170, 0.3)", // Primary with opacity
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => {
                        const value = context.raw as number;
                        return `${value.toLocaleString("vi-VN")} VNĐ`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#1A2C42", // Text Dark
                    font: {
                        weight: 500,
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    color: "#1A2C42", // Text Dark
                    callback: (value) => {
                        const numValue = value as number;
                        if (numValue >= 1000000) {
                            return `${(numValue / 1000000).toFixed(0)}M`;
                        }
                        return value;
                    },
                },
            },
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
        },
    }), []);

    // Calculate total and average
    const totalRevenue = useMemo(() => {
        const revenueData = data || getDefaultData();
        return revenueData.reduce((sum, d) => sum + d.revenue, 0);
    }, [data]);

    const averageRevenue = useMemo(() => {
        return totalRevenue / 6;
    }, [totalRevenue]);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    {title}
                </h3>
                <div className="flex gap-4 text-sm">
                    <div className="text-center">
                        <p className="text-gray-500">Tổng doanh thu</p>
                        <p className="font-bold text-primary">
                            {totalRevenue.toLocaleString("vi-VN")} VNĐ
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500">Trung bình/tháng</p>
                        <p className="font-bold text-accent">
                            {averageRevenue.toLocaleString("vi-VN")} VNĐ
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px]">
                <Bar data={chartData} options={options} />
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                    <span>Doanh thu theo tháng</span>
                </div>
            </div>
        </div>
    );
}
