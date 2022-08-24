import React, { useEffect, useState } from "react";
import {
  deleteCategoryAction,
  getCategoriesAction,
} from "../../pages/categories/categoryAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Table } from "react-bootstrap";
import { EditCatForm } from "../cat-form/EditCatForm.js";
import { setModalShow } from "../../pages/systemState/SystemSlice.js";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState({});

  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const parentCats = categories.filter(({ parentId }) => !parentId);
  const childCats = categories.filter(({ parentId }) => parentId);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      console.log("clicked");
      dispatch(deleteCategoryAction(_id));
    }
  };
  const handleOnEdit = (cat) => {
    setSelectedCategory(cat);
    dispatch(setModalShow());
  };

  console.log(selectedCategory);

  return (
    <Row className="m-5">
      <EditCatForm selectedCategory={selectedCategory} />
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
                <tr key={item._id} style={{ backgroundColor: "#9ED2C6" }}>
                  <td
                    className={
                      item.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.name}</td>

                  <td>{item.parentId ? "Children" : "Parent"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="warning"
                      onClick={() => handleOnEdit(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>

                {childCats.map(
                  (cat) =>
                    cat.parentId === item._id && (
                      <tr key={cat._id}>
                        <td
                          className={
                            cat.status === "active"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {cat.status}
                        </td>
                        <td>{cat.name}</td>

                        <td>{cat.parentId ? "Children" : "Parent"}</td>
                        <td>
                          <Button
                            onClick={() => handleOnDelete(cat._id)}
                            variant="danger"
                          >
                            Delete
                          </Button>{" "}
                          <Button
                            onClick={() => handleOnEdit(cat)}
                            variant="warning"
                          >
                            edit
                          </Button>
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
