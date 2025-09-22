import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  FormControl,
  FormLabel,
  Select,
  Option,
  Radio,
  RadioGroup,
  Textarea,
  Table,
  Sheet,
  Button,
  Stack,
} from "@mui/joy";

export default function EPFNominationForm() {
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  
  return (
    <Sheet sx={{ maxWidth: 800, mx: "auto", p: 4, my: 3, boxShadow: "lg" }}>
      <Typography level="h4" mb={2}>
        FORM 2 (Revised) – EPF Nomination/Declaration
      </Typography>
      
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Name (In Block Letters)</FormLabel>
          <Input placeholder="Enter full name" required />
        </FormControl>
        <FormControl>
          <FormLabel>Father's / Husband's Name</FormLabel>
          <Input placeholder="Father/Husband Name" />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            value={gender}
            onChange={(e, val) => setGender(val)}
            placeholder="Select gender"
            required
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Marital Status</FormLabel>
          <RadioGroup
            orientation="horizontal"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <Radio value="married" label="Married" />
            <Radio value="unmarried" label="Unmarried" />
            <Radio value="widow" label="Widow/Widower" />
            <Radio value="divorcee" label="Divorcee" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Permanent Address</FormLabel>
          <Textarea minRows={2} placeholder="Permanent Address" />
        </FormControl>
        <FormControl>
          <FormLabel>Temporary Address (if any)</FormLabel>
          <Textarea minRows={2} placeholder="Temporary Address" />
        </FormControl>
        
        <Typography level="title-lg" mt={2}>
          Part-A: Nominee Details
        </Typography>
        <Table>
          <thead>
            <tr>
              <th>Name of Nominee</th>
              <th>Address</th>
              <th>Relationship</th>
              <th>Date of Birth</th>
              <th>Total amount of accumulated PF (Share %)</th>
              <th>Guardian (For minors)</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeat table row as needed for nominees */}
            <tr>
              <td><Input size="sm" placeholder="Nominee Name" /></td>
              <td><Input size="sm" placeholder="Address" /></td>
              <td>
                <Input size="sm" placeholder="Relationship" />
              </td>
              <td><Input size="sm" type="date" /></td>
              <td><Input size="sm" placeholder="100%" /></td>
              <td>
                <Input size="sm" placeholder="Guardian Name" />
              </td>
            </tr>
          </tbody>
        </Table>
        
        <FormControl>
          <FormLabel>Declaration</FormLabel>
          <Textarea minRows={2} placeholder="Declaration (custom text optional)" />
        </FormControl>

        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" size="lg" color="primary">
            Submit Form
          </Button>
        </Box>
      </Stack>
    </Sheet>
  );
}
