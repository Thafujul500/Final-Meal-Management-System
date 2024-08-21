import * as React from "react";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import Button from "@mui/material/Button";
import {
  useDeleteMarketMutation,
  useGetMarketQuery,
} from "../../../redux/service/marketService";
import Table from "../../../components/Table";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MarketCreateUpdate from "./MarketCreateUpdate";
import { Typography } from "@mui/material";
import Loading from "../../Loading";

export const Market = () => {
  // get market
  const { data, isLoading, isError } = useGetMarketQuery();
  const value = data?.data?.data;
  // console.log(value);
  // get member
  const { data: memberData } = useGetMemberQuery();
  // delete market
  const [deleteMarket] = useDeleteMarketMutation();
  // handle open moda
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // local storage
  const defaultvalue = {
    marketDate: new Date(),
    member: "",
    totalPrice: 0,
  };

  const [defaultvalues, setDefaultvalues] = React.useState(defaultvalue);
  const [editData, setEditData] = React.useState(false);
  const [titleName, setTitleName] = React.useState("");

  // handleCreateMarket
  const handleCreateMarket = () => {
    setDefaultvalues(defaultvalue);
    setEditData(false);
    setTitleName("Create");
    handleOpen();
  };
  // handleUpdateMarket
  const handleUpdateMarket = (data) => {
    console.log(data);
    setDefaultvalues(data);
    setEditData(true);
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
            handleUpdateMarket(row?.original);
          }}
        />
        <DeleteIcon
          sx={{ marginLeft: "5px" }}
          onClick={() => deleteMarket(row?.original?._id)}
        />
      </div>
    );
  };

  // column
  const column = [
    {
      Header: "#",
      accessor: "xl",
      Cell: ({ row }) => row.index + 1,
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
      Header: "Total Price",
      accessor: "totalPrice",
    },
    {
      Header: "Market Data",
      accessor: "marketDate",
      Cell: ({ row }) => {
        return (
          row?.original?.createdAt &&
          dayjs(row?.original?.createdAt).format("DD-MM-YYYY")
        );
      },
    },
    {
      Header: "Created Data",
      accessor: "createdAt",
      Cell: ({ row }) => {
        return (
          row?.original?.createdAt &&
          dayjs(row?.original?.createdAt).format("DD-MM-YYYY")
        );
      },
    },
    {
      Header: "Updated Data",
      accessor: "updatedAt",
      Cell: ({ row }) => {
        const date = row?.original?.updatedAt;
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
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Market</h1>
      {isLoading && <Loading />}
      {data && (
        <Button
          variant="contained"
          style={{
            width: "200px",
            marginLeft: "55px",
            // position: "absolute",
            // right: "70px",
            // marginTop: "10px",
          }}
          onClick={handleCreateMarket}
        >
          Add Market
        </Button>
      )}
      {data && <Table value={value || []} column={column} />}
      {isError && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Thate is an error
        </p>
      )}

      <MarketCreateUpdate
        open={open}
        handleClose={handleClose}
        defaultvalue={defaultvalue}
        defaultvalues={defaultvalues}
        setDefaultvalues={setDefaultvalues}
        titleName={titleName}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
};
