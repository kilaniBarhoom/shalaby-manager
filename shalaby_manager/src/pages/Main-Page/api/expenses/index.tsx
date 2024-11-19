// import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { ExpenseFormSchemaType } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

type SearchExpensesResponseType = {
  expenses: ExpenseType[];
  startDate: Date;
  endDate: Date;
  allTimeTotalValue: number;
  rageTotalValue: number;
  totalPages: number;
  pageNumber: number;
};

export const useSearchExpensesQuery = () => {
  const axios = useAxios();

  // get employee id from query params
  const [searchParams] = useSearchParams();
  const PageSize = searchParams.get("PageSize") || "30";
  const PageNumber = searchParams.get("PageNumber") || "1";
  // const hasOverTime = searchParams.get("hasOverTime") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const search = searchParams.get("q") || "";

  return useQuery({
    queryKey: [
      "expenses",
      {
        PageSize,
        PageNumber,
        from,
        to,
        search,
      },
    ],
    queryFn: async () => {
      const dataToSend: any = {
        pageSize: +PageSize,
        pageNumber: +PageNumber,
        from: from,
        to: to,
        search: search,
        // hasOverTime: hasOverTime === "true" && true,
      };
      if (from) {
        dataToSend["from"] = from;
      }
      if (to) {
        dataToSend["to"] = to;
      }
      if (search) {
        dataToSend["search"] = search;
      }
      const { data: response } = await axios.get(`expense`, {
        params: dataToSend,
      });
      const { data } = response;
      return data as SearchExpensesResponseType;
    },
  });
};

export const useExpenseFormMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: ({
      data,
      expenseId,
    }: {
      data: ExpenseFormSchemaType;
      expenseId?: string;
    }) => {
      if (!expenseId) {
        const dataToSend = {
          ...data,
          amount: data.amount ? +data.amount : 0,
        };
        return axios.post(`expense`, dataToSend);
      } else {
        return axios.put(`expense/${expenseId}`, {
          ...data,
          amount: data.amount ? +data.amount : 0,
          id: expenseId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: (error: any) => {
      toast(t("Error"), {
        description:
          t(error.response.data?.message) || t("Something went wrong"),
      });
    },
  });
};

export const useDeleteExpenseMutation = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: ({ expenseId }: { expenseId: string }) =>
      axios.delete(`expense/${expenseId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};

// using the following route: /Report/GetTotalCostsByTypeAndDateRange