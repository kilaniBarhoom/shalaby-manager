import ShekelIcon from "@/components/shared/icons/shekel-icon";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ny } from "@/lib/utils";
// import ActionsDropDown from "./actions-dropdown";
import { format } from "date-fns";
import AddEditPaymentDialogDrawer from "../add-edit-dialog-drawer";
import { Button } from "@/components/ui/button";
import { useDeletePaymentMutation } from "@/pages/Main-Page/api/payments";
// import ActionsDrawer from "./actions-drawer";
const TableRows = ({ payments }: { payments: PaymentType[] }) => {
  const { mutate: deletePayment } = useDeletePaymentMutation();

  const handleDeletePayment = (paymentId: string) => {
    const isSettled = confirm("Are you sure you want to delete this payment?");
    if (isSettled) {
      deletePayment({ paymentId });
    }
  };
  return (
    <>
      {payments.map((payment) => (
        <TableRow
          key={payment.id}
          className="cursor-pointer even:bg-secondary/50"
        >
          <TableCell className="font-medium  min-w-40 overflow-x-hidden text-lg">
            {payment.user?.fullNameEnglish}
          </TableCell>
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg">
            {format(new Date(payment.date), "dd/MM/yyyy")}
          </TableCell>
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg">
            <sup>
              <ShekelIcon />
            </sup>
            &nbsp;
            {payment.amount}
          </TableCell>
          <TableCell className="font-medium  max-w-20 overflow-x-hidden text-lg">
            <Badge
              size={"sm"}
              variant={"leftBordered"}
              className={ny("text-sm", {
                "border-green-400 text-secondary-foreground":
                  payment?.type === "full",
                "border-orange-400 text-secondary-foreground":
                  payment?.type === "advance",
              })}
            >
              {payment?.type}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="justify-end flex items-center gap-2">
              <AddEditPaymentDialogDrawer payment={payment}>
                <Button
                  size={"link"}
                  variant={"none"}
                  className="text-muted-foreground hover:underline font-normal"
                >
                  Edit
                </Button>
              </AddEditPaymentDialogDrawer>
              •
              <Button
                size={"sm"}
                variant={"destructive"}
                className=" font-normal"
                onClick={() => handleDeletePayment(payment?.id)}
              >
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableRows;
