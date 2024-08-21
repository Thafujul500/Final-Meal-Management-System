import * as React from "react";
import {
  useDeleteDepositMutation,
  useGetDepositQuery,
} from "../../../redux/service/depositService";
import Table from "../../../components/Table";
import dayjs from "dayjs";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DepositCreateUpdate from "./DepositCreateUpdate";
import Button from "@mui/material/Button";
import Loading from "../../Loading";

export const Deposit = () => {
  // get deposit
  const { data, isLoading, isError } = useGetDepositQuery();
  const value = data?.data?.data;
  console.log(value);

  // get member
  const { data: memberData } = useGetMemberQuery();
  // delete deposit
  const [deleteDeposit] = useDeleteDepositMutation();

  // defaultValue
  const defaultValue = {
    member: "",
    depositAmount: 0,
    depositDate: new Date(),
  };

  // locak storage
  const [defaulValues, setDefaultValues] = React.useState(defaultValue);
  const [edit, setEdit] = React.useState(false);
  const [titleName, setTitleName] = React.useState("");
  // handle Open
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handleCreateHandeler
  const handleCreateHandeler = () => {
    console.log("Hellow");

    setDefaultValues(defaultValue);
    setEdit(false);
    setTitleName("Create");
    handleOpen();
  };
  //handleEditHandeler
  const handleEditHandeler = (data) => {
    setDefaultValues(data);
    setEdit(true);
    setTitleName("Update");
    handleOpen();
  };

  // action column
  const actionColumn = ({ row }) => {
    return (
      <div>
        <EditIcon
          sx={{ marginRight: "5px" }}
          onClick={() => {
            handleEditHandeler(row?.original);
          }}
        />
        <DeleteIcon
          sx={{ marginLeft: "5px" }}
          onClick={() => deleteDeposit(row?.original?._id)}
        />
      </div>
    );
  };

  const column = [
    {
      Header: "#",
      accessor: "xl",
      Cell: ({ row }) => row?.index + 1,
    },
    {
      Header: "Member",
      accessor: "member",
      Cell: ({ row }) => {
        const fullName = memberData?.data?.data?.find((item) => {
          return item?._id === row?.original?.member;
        });
        return fullName?.name;
      },
    },
    {
      Header: "Deposit Amount",
      accessor: "depositAmount",
    },
    {
      Header: "Deposit Date",
      accessor: "depositDate",
      Cell: ({ row }) => {
        const data = row?.original?.depositDate;
        return data && dayjs(data).format("DD-MM-YYYY");
      },
    },
    {
      Header: "Created Date",
      accessor: "createdAt",
      Cell: ({ row }) => {
        const date = row?.original?.createdAt;
        return date && dayjs(date).format("DD-MM-YYYY");
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: actionColumn,
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Deposit</h1>

      {isLoading && <Loading />}
      {data && (
        <Button
          variant="contained"
          sx={{
            width: "200px",
            marginLeft: "55px",
            // position: "absolute",
            // right: "70px",
            // marginTop: "10px",
          }}
          onClick={handleCreateHandeler}
        >
          Add Deposit
        </Button>
      )}
      {data && <Table value={value || []} column={column} />}

      {isError && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          There is an error
        </p>
      )}

      <DepositCreateUpdate
        handleClose={handleClose}
        open={open}
        defaultValue={defaultValue}
        defaulValues={defaulValues}
        setDefaultValues={setDefaultValues}
        edit={edit}
        setEdit={setEdit}
        titleName={titleName}
      />
    </div>
  );
};
