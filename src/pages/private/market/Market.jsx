import * as React from "react";
// import { useGetMemberQuery } from "../../../redux/service/memberService";
import Button from "@mui/material/Button";
import {
  useDeleteMarketMutation,
  useGetMarketQuery,
  useGetMemberQuery,
} from "../../../redux/service/marketService";
import Table from "../../../components/Table";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MarketCreateUpdate from "./MarketCreateUpdate";
import Loading from "../../Loading";
import Swal from "sweetalert2";
export const defaultvalue = {
  marketDate: new Date(),
  member: "",
  totalPrice: 0,
};
export const Market = () => {
  const [pageQuery, setPageQuery] = React.useState(1);
  // get market
  const { data, isLoading, isError } = useGetMarketQuery(pageQuery);

  const value = data?.data?.data;

  const pagination = data?.data?.pagination;

  // get member
  const { data: memberData } = useGetMemberQuery(pageQuery);
  // delete market
  const [deleteMarket, { isSuccess }] = useDeleteMarketMutation();
  // handle open moda
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // local storage
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
    setDefaultvalues(data);
    setEditData(true);
    setTitleName("Update");
    handleOpen();
  };

  const handleDeleteClick = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMarket(value);
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          text: "Your file has been deleted.",
        });
      }
    });
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
          onClick={() => {
            handleDeleteClick(row?.original?._id);
          }}
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
          }}
          onClick={handleCreateMarket}
        >
          Add Market
        </Button>
      )}
      {data && (
        <Table
          value={value || []}
          column={column}
          setPageQuery={setPageQuery}
          pageQuery={pageQuery}
          pagination={pagination}
        />
      )}
      {isError && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          There is an error
        </p>
      )}

      <MarketCreateUpdate
        open={open}
        editData={editData}
        titleName={titleName}
        setEditData={setEditData}
        handleClose={handleClose}
        defaultvalue={defaultvalue}
        defaultvalues={defaultvalues}
        setDefaultvalues={setDefaultvalues}
        pageQuery={pageQuery}
      />
    </div>
  );
};
