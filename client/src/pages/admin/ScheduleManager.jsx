import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

const ScheduleManager = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, scheduleRes] = await Promise.all([
          axios.get("http://localhost:9999/employees"),
          axios.get("http://localhost:9999/workschedule"),
        ]);

        setEmployees(empRes.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await axios.delete(
        `http://localhost:9999/workschedule/${selectedEmployee.workScheduleId._id}/slots/${slotId}`
      );

      const updatedSlots = selectedEmployee.workScheduleId.slots.filter(
        (slot) => slot._id !== slotId
      );

      setSelectedEmployee({
        ...selectedEmployee,
        workScheduleId: {
          ...selectedEmployee.workScheduleId,
          slots: updatedSlots,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>
        Employee Schedule Management
      </Typography> */}
      <Grid sx={{marginTop: "2rem"}} container spacing={3}>
        {/* Employee List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Employees</Typography>
              <List>
                {employees.map((employee) => (
                  <ListItem
                    button
                    key={employee._id}
                    selected={selectedEmployee?._id === employee._id}
                    onClick={() => handleEmployeeSelect(employee)}
                  >
                    <ListItemText
                      primary={employee.fullName}
                      secondary={employee.position}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Schedule Display */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {selectedEmployee ? (
                <>
                  <Typography variant="h6">
                    Schedule for {selectedEmployee.fullName}
                  </Typography>
                  <List>
                    {selectedEmployee.workScheduleId.slots.map((slot) => (
                      <ListItem key={slot._id} divider>
                        <ListItemText
                          primary={`${slot.day}: ${format(
                            new Date(
                              parseISO(slot.startTime).getTime() -
                                7 * 60 * 60 * 1000
                            ),
                            "HH:mm"
                          )}`}
                          secondary={slot.isBooked ? "Booked" : "Available"}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => handleDeleteSlot(slot._id)}
                        >
                          Delete
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Typography variant="body1" align="center">
                  Select an employee to view their schedule.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScheduleManager;
