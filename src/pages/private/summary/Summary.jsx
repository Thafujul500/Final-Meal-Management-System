import * as React from "react";
import { useGetSummaryQuery } from "../../../redux/service/summaryService";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import Table from "../../../components/Table";
import dayjs from "dayjs";
import Loading from "../../Loading";

export const Summary = () => {
  const [pageQuery, setPageQuery] = React.useState(1);

  // get summary
  const { data, isLoading, isError } = useGetSummaryQuery(pageQuery);
  console.log(data);

  const pagination = data?.data?.pagination;

  const value = data?.data?.data;
  // get member
  const { data: memberData } = useGetMemberQuery();
  // console.log(memberData?.data?.data);

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
      Header: "Deposit Amount",
      accessor: "depositAmount",
    },
    {
      Header: "Meal Quantity",
      accessor: "mealQuantity",
    },
    {
      Header: "Meal Rate",
      accessor: "mealRate",
      Cell: ({ row }) => {
        return row?.original?.mealRate?.toFixed(2);
      },
    },
    {
      Header: "Total Cost",
      accessor: "totalCost",
      Cell: ({ row }) => {
        return row?.original?.totalCost?.toFixed(2);
      },
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
        const date = row?.original?.updatedAt;
        return date && dayjs(date).format("DD-MM-YYYY");
      },
    },
  ];
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Summary</h1>
      {isLoading && <Loading />}
      {data && (
        <Table
          column={column}
          value={value || []}
          setPageQuery={setPageQuery}
          pageQuery={pageQuery}
          pagination={pagination}
        />
      )}
      {isError && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          There is an error{" "}
        </p>
      )}
    </div>
  );
};
