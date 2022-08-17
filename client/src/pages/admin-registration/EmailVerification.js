import React, { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { emailVerifyAdminUser } from "../../helpers/axiosHelper";

///show the spinner first and then
///grab the c and e from the query string parameters
///create an axios function to call the server

//create api endpoint to recieve this code

//check if the combination of the email and code exist in the user table,if so activate the user and send email notification

export const EmailVerification = () => {
  const [queryParams] = useSearchParams();
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState({});

  console.log(queryParams.get("e"));

  useEffect(() => {
    const obj = {
      emailValidationCode: queryParams.get("c"),
      email: queryParams.get("e"),
    };
    ///call axios to call the user
    (async () => {
      const result = await emailVerifyAdminUser(obj);
      setResponse(result);
      setIsPending(false);
    })(); ///// Immediate Invoking Function
  }, []);

  return (
    <div>
      <Header />
      <Container className="page-main">
        {isPending && (
          <Card className="mt-5 p-2 m-auto" style={{ width: "20rem" }}>
            <Spinner className="m-auto" animation="grow" />
            <h3>EMail Verification process has began please wait..</h3>
          </Card>
        )}
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
      </Container>
      <Footer />
    </div>
  );
};
