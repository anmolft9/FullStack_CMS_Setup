import React, { useEffect } from "react";
import { getCategoriesAction } from "../../pages/categories/categoryAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Table } from "react-bootstrap";

export const CategoryTable = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const parentCats = categories.filter(({ parentId }) => !parentId);
  const childCats = categories.filter(({ parentId }) => parentId);

  return (
    <Row className="m-5">
      <Table>
        <thead>
          <th>Status</th>
          <th>Name</th>
          <th>label</th>
          <th>Action</th>
        </thead>
        <tbody>
          {parentCats.length > 0 &&
            parentCats.map((item, index) => (
              <>
                <tr key={item._id} className="bg-secondary">
                  <td>{item.status}</td>
                  <td>{item.name}</td>

                  <td>{item.parentId ? "Children" : "Parent"}</td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>

                {childCats.map(
                  (cat) =>
                    cat.parentId === item._id && (
                      <tr key={cat._id}>
                        <td>{cat.status}</td>
                        <td>{cat.name}</td>

                        <td>{cat.parentId ? "Children" : "Parent"}</td>
                        <td>
                          <Button variant="danger">Delete</Button>
                        </td>
                      </tr>
                    )
                )}
              </>
            ))}
        </tbody>
      </Table>
    </Row>
  );
};
