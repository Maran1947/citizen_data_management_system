import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, Pagination, Stack } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormModal from '../modal/FormModal';
import Loading from '../loading/Loading';
import toast, { Toaster } from 'react-hot-toast';

const GET_USERS_ENDPOINT = 'http://localhost:5000/users';

const headCells = [
    {
        id: 'firstname',
        numeric: false,
        disablePadding: true,
        label: 'First Name',
    },
    {
        id: 'lastname',
        numeric: true,
        disablePadding: false,
        label: 'Last Name',
    },
    {
        id: 'dob',
        numeric: true,
        disablePadding: false,
        label: 'Date of birth',
    },
    {
        id: 'gender',
        numeric: true,
        disablePadding: false,
        label: 'Gender',
    },
    {
        id: 'address',
        numeric: true,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'city',
        numeric: true,
        disablePadding: false,
        label: 'City',
    },
    {
        id: 'state',
        numeric: true,
        disablePadding: false,
        label: 'State',
    },
    {
        id: 'pincode',
        numeric: true,
        disablePadding: false,
        label: 'Pincode',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    return (
        <TableHead>
            <TableRow sx={{
                background: '#03ff30'
            }} >
                {
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'left'}
                        >
                            {headCell.label}
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}

function TablePaginationActions(props) {
    const {
        count,
        page,
        rowsPerPage,
        onPageChange
    } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handlePrevButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    const handleAnyPageButtonClick = (event, page) => {
        onPageChange(event, page - 1);
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'} >
                <Button
                    className="first-page"
                    onClick={handleFirstPageButtonClick}
                    sx={{
                        padding: '4px 0px',
                        fontSize: '0.8rem',
                        border: '1px solid #808080',
                        color: '#808080'
                    }} variant="outlined">First</Button>
                <Button
                    className="previous-page"
                    onClick={handlePrevButtonClick}
                    sx={{
                        padding: '4px 0px',
                        fontSize: '0.8rem',
                        border: '1px solid #808080',
                        color: '#808080'
                    }}
                    disabled={page + 1 > 1 ? false : true}
                    variant="outlined"
                >Prev</Button>
                <Pagination
                    page={page + 1}
                    count={Math.ceil(count / rowsPerPage)}
                    onChange={handleAnyPageButtonClick}
                    variant="outlined"
                    shape="rounded"
                    hideNextButton
                    hidePrevButton />
                <Button
                    className="next-page"
                    onClick={handleNextButtonClick}
                    sx={{
                        padding: '4px 0px',
                        fontSize: '0.8rem',
                        border: '1px solid #808080',
                        color: '#808080'
                    }}
                    variant="outlined"
                    disabled={page + 1 < Math.ceil(count / rowsPerPage) ? false : true} >Next</Button>
                <Button
                    className="last-page"
                    onClick={handleLastPageButtonClick}
                    sx={{
                        padding: '4px 0px',
                        fontSize: '0.8rem',
                        border: '1px solid #808080',
                        color: '#808080'
                    }} variant="outlined">Last</Button>
            </Stack>
        </Box>
    );
}

export default function UsersTable({
    searchValue,
    open,
    setOpen,
    modalType,
    setModalType
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [editUser, setEditUser] = useState({});
    const [userId, setUserId] = useState('');
    const [refresh, setRefresh] = useState(false);

    const handleOpenModal = (type, editUser) => {
        setEditUser(editUser);
        setModalType(type);
        setOpen(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUsers = async (page = 0, searchQuery = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`${GET_USERS_ENDPOINT}`, {
                params: {
                    page: page + 1,
                    search: searchQuery
                }
            });
            if (response.status === 200) {
                let allUsers = response.data.data.users;
                setTotalUsers(response.data.total)
                setUsers(allUsers);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUser = async (userId) => {
        setUserId(userId);
        try {
            setDeleteLoading(true);
            const response = await axios.delete(`http://localhost:5000/user/${userId}`);
            if (response.status === 200) {
                toast.success(`Deleted successfully`)
                getUsers()
            }
        } catch (err) {
            console.log(err)
            alert('Something went wrong')
        } finally {
            setDeleteLoading(false);
        }
    }

    useEffect(() => {
        getUsers(page);
    }, [page])

    useEffect(() => {
        if (searchValue) getUsers(0, searchValue);
    }, [searchValue]);

    useEffect(() => {
        if(refresh) {
            getUsers();
            setRefresh(false);
        }
    }, [refresh])

    return (
        <Box sx={{ width: '100%' }}>
            <FormModal 
                open={open} 
                setOpen={setOpen} 
                modalType={modalType} 
                data={editUser} 
                setRefresh={setRefresh} />
            <Toaster position="top-right" />
            <Paper sx={{ width: '100%', mb: 2, p:2 }}>
                <TableContainer  >
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            rowCount={users?.length}
                        />
                        <TableBody>
                            {
                                loading ?
                                    <TableRow>
                                        <TableCell>
                                            <Loading />
                                        </TableCell>
                                    </TableRow> :
                                        users &&
                                        users.length > 0 ?
                                        users.map((user, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={user._id}
                                                >
                                                    <TableCell>
                                                        {user.firstname}
                                                    </TableCell>
                                                    <TableCell align="left">{user.lastname}</TableCell>
                                                    <TableCell align="left">{user.dob}</TableCell>
                                                    <TableCell align="left">{user.gender}</TableCell>
                                                    <TableCell align="left">{user.address}</TableCell>
                                                    <TableCell align="left">{user.city}</TableCell>
                                                    <TableCell align="left">{user.state}</TableCell>
                                                    <TableCell align="left">{user.pincode}</TableCell>
                                                    <TableCell align="left">
                                                        <Stack direction="row" >
                                                            <Button
                                                                className="edit"
                                                                onClick={() => handleOpenModal('UPDATE_USER', user)}
                                                                sx={{
                                                                    minWidth: '48px!important',
                                                                    background: '#fff',
                                                                    padding: '6px',
                                                                    boxShadow: '0px 0px 1px #808080',
                                                                    border: '1px solid #69a5f3',
                                                                    mr: 2,
                                                                }} >
                                                                <EditOutlined className="edit_icon" sx={{
                                                                    color: '#69a5f3',
                                                                }} />
                                                            </Button>
                                                            {
                                                                deleteLoading && userId === user._id ?
                                                                    <Loading color="#fff" /> :
                                                                    <Button
                                                                        className="delete"
                                                                        onClick={() => handleDeleteUser(user._id)}
                                                                        sx={{
                                                                            minWidth: '48px!important',
                                                                            background: '#fff',
                                                                            padding: '6px',
                                                                            boxShadow: '0px 0px 1px #808080',
                                                                            border: '1px solid #f00',
                                                                            mr: 2
                                                                        }} >
                                                                        <DeleteOutlineOutlinedIcon sx={{
                                                                            color: '#f00'
                                                                        }} />
                                                                    </Button>
                                                            }
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }) :
                                        <TableRow>
                                            <TableCell id='noDataFoundId'>
                                                No data found.
                                            </TableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[rowsPerPage]}
                    component="div"
                    count={totalUsers}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </Box>
    );
}