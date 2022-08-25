import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPmsAction } from "../pages/payment-method/pmAction";

export const PaymentMethodTable = () => {
  const dispatch = useDispatch();

  const { paymentMethod } = useSelector((state) => state.paymentMethod);
  console.log(paymentMethod);

  useEffect(() => {
    dispatch(getPmsAction());
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethod.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <Button variant="primary">Edit</Button>
              <Button variant="danger">Delete</Button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
