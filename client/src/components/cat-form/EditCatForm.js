import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCategory } from "../../helpers/axiosHelper.js";
import {
  postCategoriesAction,
  updateCategoriesAction,
} from "../../pages/categories/categoryAction.js";
import { CustomModal } from "../modal/Modal.js";

// import { CustomInputField } from "../customInputField/CustomInputField.js";

export const EditCatForm = ({ selectedCategory }) => {
  const [form, setForm] = useState({});
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(selectedCategory);
  }, [selectedCategory]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // alert(form.toString());

    const { __v, slug, createdAt, updatedAt, ...rest } = form;
    dispatch(updateCategoriesAction(rest));

    // console.log(form);
  };

  return (
    <CustomModal className="text-center" title="Edit Category">
      <Form className="py-4 mb-5" onSubmit={handleOnSubmit}>
        <h4 className="text-center mb-3">Edit Category</h4>

        <Row className="g-2">
          <Col lg="2">
            <Form.Group>
              <Form.Check
                name="status"
                label="status"
                type="switch"
                checked={form.status === "active"}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          {/* ////////// */}
          <Col lg="4">
            <Form.Group>
              <Form.Select name="parentId" onChange={handleOnChange}>
                <option value="">select parent category</option>
                {categories.length > 0 &&
                  categories.map(
                    (item) =>
                      !item.parentId && (
                        <option
                          value={item._id}
                          selected={item._id === form.parentId}
                        >
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* ////////// */}

          <Col lg="4">
            <Form.Group>
              <Form.Control
                name="name"
                type="text"
                value={form.name}
                placeholder="enter category"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>

          {/* ////////// */}

          <Col lg="2">
            <Button variant="primary" type="submit">
              Update category
            </Button>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
