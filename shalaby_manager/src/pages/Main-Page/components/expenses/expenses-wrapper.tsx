import LocalSearchBar from "@/components/shared/loacal-search";
import TablePagiation from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { useSearchExpensesQuery } from "../../api/expenses";
import ExpensesList from "./list";

export default function PaymentsWrapper() {
  const {
    data: searchExpensesResponse,
    isLoading: isLoadingToFetchExpensesData,
  } = useSearchExpensesQuery();

  const { t } = useTranslation();

  return (
    <div className="border flex flex-col gap-4 p-4 rounded-xl">
      <div className="shadow-md bg-blue-500 rounded-md w-full p-4 flex items-center justify-center gap-2">
        <Typography element="span" as="largeText" color="white">
          {t("All time total amount")}:
        </Typography>
        <Badge size={"lg"}>
          {searchExpensesResponse?.allTimeTotalValue ?? 0}{" "}
          <sup className="text-lg">₪</sup>
        </Badge>
      </div>
      <div className=" md:w-fit w-full ">
        <LocalSearchBar
          route="/expenses"
          placeholder="Search for an expense"
          otherClasses="md:w-fit w-full"
        />
        {/* <div className="flex gap-2 items-center">
          <PaymentsFilters />
        </div> */}
      </div>
      <ExpensesList
        expenses={searchExpensesResponse?.expenses ?? []}
        isLoading={isLoadingToFetchExpensesData}
      />
      <div className="flex items-center w-full border rounded-md py-2 bg-secondary/50">
        <TablePagiation totalPages={searchExpensesResponse?.totalPages ?? 1} />
      </div>
    </div>
  );
}
