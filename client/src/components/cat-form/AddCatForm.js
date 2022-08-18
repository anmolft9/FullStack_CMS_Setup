import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCategory } from "../../helpers/axiosHelper.js";
import { postCategoriesAction } from "../../pages/categories/categoryAction.js";

// import { CustomInputField } from "../customInputField/CustomInputField.js";

export const AddCatForm = () => {
  const [form, setForm] = useState({});
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

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
    dispatch(postCategoriesAction(form));

    // console.log(form);
  };

  return (
    <Form className="border py-4 mb-5" onSubmit={handleOnSubmit}>
      <h4 className="text-center mb-3">Add New Category</h4>

      <Row className="g-2">
        <Col md="2">
          <Form.Group>
            <Form.Check
              name="status"
              label="status"
              type="switch"
              onChange={handleOnChange}
            />
          </Form.Group>
        </Col>
        {/* ////////// */}
        <Col md="4">
          <Form.Group>
            <Form.Select name="parentId" onChange={handleOnChange}>
              <option value="">select parent category</option>
              {categories.length > 0 &&
                categories.map(
                  (item) =>
                    !item.parentId && (
                      <option value={item._id}>{item.name}</option>
                    )
                )}
            </Form.Select>
          </Form.Group>
        </Col>
        {/* ////////// */}

        <Col md="4">
          <Form.Group>
            <Form.Control
              name="name"
              type="text"
              placeholder="enter category"
              onChange={handleOnChange}
            />
          </Form.Group>
        </Col>

        {/* ////////// */}

        <Col md="2">
          <Button variant="primary" type="submit">
            Add{" "}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
