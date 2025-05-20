import React from "react";
import AddSlotsToWorkSchedule from "./CreateWorkSchedule";
import { Row } from "react-bootstrap";
import ScheduleManager from "./ScheduleManager";

function WorkScheduleManagement() {
  return (
    <>
      <Row>
        <AddSlotsToWorkSchedule />{" "}
      </Row>
      <Row>
        <ScheduleManager />
      </Row>
    </>
  );
}

export default WorkScheduleManagement;
