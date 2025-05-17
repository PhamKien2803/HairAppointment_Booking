import React from "react";
import { Row } from "react-bootstrap";
import CreateVoucher from "./CreateVoucher";

function VoucherManager() {
  return (
    <>
      <Row>
        <CreateVoucher />
      </Row>
    </>
  );
}

export default VoucherManager;
