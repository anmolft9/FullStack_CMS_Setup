import React from "react";
import { AddCatForm } from "../../components/cat-form/AddCatForm.js";
import { CategoryTable } from "../../components/category-table/CategoryTable.js";

import { AdminLayout } from "../../components/layout/AdminLayout.js";

export const Category = () => {
  return (
    <AdminLayout>
      <h3 className="py-3 text-center">Category management</h3>
      <hr />

      {/* form */}
      <AddCatForm />

      {/* table */}
      <CategoryTable />
    </AdminLayout>
  );
};
