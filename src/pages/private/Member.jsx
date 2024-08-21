import React from "react";
import { useGetMemberQuery } from "../../redux/service/memberService";
import Table from "../../components/Table";
import dayjs from "dayjs";
import Loading from "../Loading";

function Member() {
  const { data, isLoading, isError } = useGetMemberQuery();
  const value = data?.data?.data;

  let column = [
    {
      Header: "#",
      accessor: "xl",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Member",
      accessor: "name",
    },
    {
      Header: "Mobile",
      accessor: "mobile",
    },
    {
      Header: "Room Number",
      accessor: "roomNumber",
    },

    {
      Header: "CreatedAt",
      accessor: "createdAt",
      Cell: ({ row }) => {
        const date = row?.original?.createdAt;
        return date && dayjs(date).format("DD-MM-YYYY");
      },
    },
    {
      Header: "UpdatedAt",
      accessor: "updatedAt",
      Cell: ({ row }) => {
        const data = row?.original?.updatedAt;
        return data && dayjs(data).format("DD-MM-YYYY");
      },
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Member</h1>

      {isLoading && <Loading />}

      {data && <Table value={value || []} column={column} />}

      {isError && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          There is an error
        </p>
      )}
    </div>
  );
}

export default Member;
