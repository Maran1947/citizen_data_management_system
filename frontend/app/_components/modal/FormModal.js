import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Loading from "../loading/Loading";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const notifications = {
  ADD_USER: `Data saved successfully`,
  UPDATE_USER: `Data updated successfully`,
};

export default function FormModal({
  open,
  setOpen,
  modalType,
  setRefresh,
  data,
}) {
  const date = new Date();
  const [dob, setDob] = useState(
    `${date.getFullYear()}-${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }-${date.getDate()}`
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClose = () => {
    setOpen(false);
    handleResetInput();
  };

  const handleResetInput = () => {
    setFirstName("");
    setLastName("");
    const date = new Date();
    setDob(
      `${date.getFullYear()}-${
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      }-${date.getDate()}`
    );
    setAddress("");
    setState("");
    setCity("");
    setPincode("");
    setGender("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        state,
        pincode,
      };
      const url =
        modalType === "ADD_USER"
          ? `http://localhost:5000/user`
          : `http://localhost:5000/user/${userId}`;
      const response =
        modalType === "ADD_USER"
          ? await axios.post(url, data)
          : await axios.put(url, data);
      if (response.status === 201 || response.status === 200) {
        handleClose();
        toast.success(notifications[modalType]);
        handleResetInput();
        setRefresh(true);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalType === 'UPDATE_USER') {
      const {
        _id,
        firstname,
        lastname,
        dob,
        gender,
        address,
        city,
        state,
        pincode,
      } = data;
      

      setUserId(_id);
      setFirstName(firstname);
      setLastName(lastname);
      setDob(dob);
      setAddress(address);
      setState(state);
      setCity(city);
      setPincode(pincode);
      setGender(gender);
    }
  }, [modalType]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form method="post" onSubmit={handleFormSubmit}>
            <Typography component="h2" sx={{ mb: 2, fontSize: "1.2rem" }}>
              {modalType === "ADD_USER" ? "Add Citizen" : "Update Citizen"}
            </Typography>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  text="text"
                  id="firstnameId"
                  placeholder="Enter your first name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  text="text"
                  id="lastnameId"
                  placeholder="Enter your last name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  id="dobId"
                  label="Date of birth"
                  variant="outlined"
                  fullWidth
                  required
                />
                <FormControl fullWidth>
                  <InputLabel id="genderLabelId">Gender</InputLabel>
                  <Select
                    labelId="genderSelectLabelId"
                    id="genderId"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <MenuItem value={""}>Select your gender</MenuItem>
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  id="addressId"
                  placeholder="Enter your address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  id="cityId"
                  placeholder="Enter your city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  id="stateId"
                  placeholder="Enter your state"
                  label="State"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  type="text"
                  id="pincodeId"
                  placeholder="Enter your pincode"
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Stack>
              {loading ? (
                <Button variant="contained">
                  <Loading />
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              )}
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
