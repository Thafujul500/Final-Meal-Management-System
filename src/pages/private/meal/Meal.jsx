import React, { useState } from "react";
import Button from "@mui/material/Button";

import {
  useDeleteMealMutation,
  useGetMealQuery,
} from "../../../redux/service/mealService";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import dayjs from "dayjs";
import Table from "../../../components/Table";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MealCreateUpdate from "./MealCreateUpdate";
import Loading from "../../Loading";

function Meal() {
  // get meal
  const { data, isLoading, isError } = useGetMealQuery();
  const value = data?.data?.data;
  // console.log(value);
  const member = value?.map((x) => {
    return x?.member;
  });

  // delete meal
  const [deleteMeal] = useDeleteMealMutation();

  // get deposit
  const { data: memberData } = useGetMemberQuery();

  // local storage
  const defaultValue = {
    mealDate: new Date(),
    meals: [],
  };

  //states
  const [defaultValues, setDefaultValues] = useState(defaultValue);
  const [titleName, setTitleName] = useState("");
  const [editData, setEditData] = useState(false);

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handleCreteclick
  const handleCreteclick = () => {
    setDefaultValues(defaultValue);
    setTitleName("Create");
    setEditData(false);
    handleOpen();
  };

  // handleEditClick
  const handleEditClick = (data) => {
    console.log(data);
    setDefaultValues(data);
    setTitleName("Update");
    setEditData(true);
    handleOpen();
  };

  //actionColumn
  const actionColumn = ({ row }) => {
    return (
      <div>
        <EditIcon
          sx={{ marginRight: "5px" }}
          onClick={() => {
            handleEditClick(row?.original);
          }}
        />
        <DeleteIcon
          sx={{ marginLeft: "5px" }}
          onClick={() => {
            deleteMeal(row?.original?._id);
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
      Cell: ({ row }) => {
        return row?.index + 1;
      },
    },
    {
      Header: "Member",
      accessor: "name",
      Cell: ({ row }) => {
        const fullName = memberData?.data?.data?.find((item) => {
          return item?._id === row?.original?.member;
        });
        return fullName?.name;
      },
    },
    {
      Header: "Meal Date",
      accessor: "mealDate",
      Cell: ({ row }) => {
        return (
          row?.original?.mealDate &&
          dayjs(row?.original?.mealDate).format("DD-MM-YYYY")
        );
      },
    },
    {
      Header: "Meal Quantity",
      accessor: "mealQuantity",
    },
    {
      Header: "Created Date",
      accessor: "createdAt",
      Cell: ({ row }) => {
        return (
          row?.original?.createdAt &&
          dayjs(row?.original?.createdAt).format("DD-MM-YYYY")
        );
      },
    },
    {
      Header: "Updated Date",
      accessor: "updatedAt",
      Cell: ({ row }) => {
        return (
          row?.original?.updatedAt &&
          dayjs(row?.original?.updatedAt).format("DD-MM-YYYY")
        );
      },
    },
    {
      Header: "Actiomn",
      accessor: "action",
      Cell: actionColumn,
    },
  ];
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Meal</h1>
      {isLoading && <Loading />}
      {data && (
        <Button
          variant="contained"
          style={{
            width: "200px",
            marginLeft: "55px",
          }}
          onClick={handleCreteclick}
        >
          Add Meal
        </Button>
      )}
      {data && <Table column={column} value={value || []} />}
      {isError && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          There is an error{" "}
        </p>
      )}
      <MealCreateUpdate
        {...{
          open,
          handleOpen,
          handleClose,
          titleName,
          defaultValue,
          setDefaultValues,
          defaultValues,
          editData,
          setEditData,
          member,
        }}
      />
    </div>
  );
}

export default Meal;
