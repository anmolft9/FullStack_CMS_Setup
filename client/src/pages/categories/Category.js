import React from "react";
import { CategoryTable } from "../../components/category-table/categoryTable.js";
import { AdminLayout } from "../../components/layout/AdminLayout.js";

export const Category = () => {
  return (
    <AdminLayout>
      <h2 className="py-3">Category management</h2>

      {/* form */}

      {/* table */}
      <CategoryTable />
    </AdminLayout>
  );
};
