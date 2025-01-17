"use client";

import ShekelIcon from "@/components/shared/icons/shekel-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ExternalLink } from "lucide-react";
import { Pie, PieChart } from "recharts";
import CategoriesDialog from "./CategoriesDialog";

// Chart colors array for dynamic category assignment
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

export default function CategoryExpensesCard({
  analytics,
}: {
  analytics: {
    expensesGroupedByCategory: Array<{
      amount: number;
      category: {
        id: string;
        name: string;
      };
    }>;
  };
}) {
  // Transform categories data into chart format
  const categories = analytics.expensesGroupedByCategory;
  const chartData = categories.map((item, index) => ({
    name: item.category.name,
    amount: item.amount,
    fill: chartColors[index % chartColors.length],
  }));

  // Calculate total amount for footer
  const totalAmount = categories.reduce((sum, item) => sum + item.amount, 0);

  // Generate dynamic chart config based on categories
  const chartConfig: ChartConfig = {
    amount: {
      label: "Amount",
    },
    ...categories.reduce(
      (config, item, index) => ({
        ...config,
        [item.category.name.toLowerCase()]: {
          label: item.category.name,
          color: chartColors[index % chartColors.length],
        },
      }),
      {}
    ),
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex items-center justify-between flex-row gap-4">
        <CardTitle className="text-lg">Category Expenses</CardTitle>
        <CategoriesDialog
          categories={categories.map((item) => ({
            name: item.category.name,
            amount: item.amount,
          }))}
        >
          <Button variant="outline" size="sm">
            See all
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CategoriesDialog>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              label
              labelLine={false}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span className="text-muted-foreground">Total Expenses:</span>
          <ShekelIcon />
          {totalAmount.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}
