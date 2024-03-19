"use client";
import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchInput from "./_components/search/SearchInput";
import UsersTable from "./_components/table/UsersTable";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 5, height: '100vh', background: '#1d1930' }}>
      <Stack direction={"column"} spacing={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Button
            sx={{
              width: window?.innerWidth < 475 ? "20px" : 100,
              height: 50,
              borderRadius: '15px',
              border: '2px solid #03ff30',
              background: 'transparent',
              color: '#03ff30',
              transition: 'all 0.3s linear',
              '&:hover': {
                background: '#03ff30',
                color: '#000',
              }
            }}
            onClick={() => handleOpenModal("ADD_USER")}
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            {window?.innerWidth < 475 ? "" : "Add"}
          </Button>
        </Stack>
        <UsersTable
          modalType={modalType}
          setModalType={setModalType}
          open={open}
          setOpen={setOpen}
          searchValue={searchValue}
        />
      </Stack>
    </Box>
  );
}
