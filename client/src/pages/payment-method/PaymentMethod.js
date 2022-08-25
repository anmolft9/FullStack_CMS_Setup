import React from "react";
import { Button } from "react-bootstrap";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { PaymentMethodTable } from "../../payment-method-table/PaymentMethodTable";

export const PaymentMethod = () => {
  return (
    <AdminLayout>
      <h4 className="py-4 text-center">Payment Method</h4>
      <hr />
      <div className="text-end p-5">
        <Button variant="info ">
          <i class="fa-solid fa-plus"></i> Add a New Payment Method
        </Button>
      </div>
      <PaymentMethodTable />
    </AdminLayout>
  );
};
