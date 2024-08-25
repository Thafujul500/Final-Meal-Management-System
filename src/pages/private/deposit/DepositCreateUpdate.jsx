import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { MenuItem } from "@mui/material";
import {
  useCreateDepositMutation,
  useUpdateDepositMutation,
} from "../../../redux/service/depositService";

const DepositCreateUpdate = ({
  handleClose,
  open,
  edit,
  setEdit,
  defaultValue,
  defaulValues,
  setDefaultValues,
  titleName,
}) => {
  // get member
  const { data } = useGetMemberQuery();
  // create deposit
  const [createDeposit, { isSuccess: isCreateSuccess }] =
    useCreateDepositMutation();
  // update deposit
  const [updateDeposit, { isSuccess: isUpdateSuccess }] =
    useUpdateDepositMutation();
  const theme = useTheme();

  const Schema = yup.object({
    member: yup.string().required("Member is required"),
    depositAmount: yup
      .number()
      .typeError("Total Price must be a number")
      .required("Total Price is required")
      .positive("Total Price must be a positive number")
      .integer("Total Price must be an integer")
      .min(1, "Total Price must be at least 1")
      .max(10000, "Total Price cannot exceed 10000"),
    depositDate: yup.date().required("Deposit Date is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaulValues,
    mode: "all",
  });

  const onSubmit = (value) => {
    if (edit) {
      const updateData = {
        member: value?.member,
        depositAmount: value?.depositAmount,
        depositDate: value?.depositDate,
      };
      updateDeposit({ postBody: updateData, id: value?._id });
      console.log(updateData);
    } else {
      const createData = {
        member: value?.member,
        depositAmount: value?.depositAmount,
        depositDate: dayjs(value?.depositDate).toISOString(),
      };
      createDeposit({ postBody: createData });
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setDefaultValues(defaultValue);
      setEdit(false);
      handleClose();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  useEffect(() => {
    reset(defaulValues);
  }, [defaulValues]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <Typography
                sx={{ marginBottom: "20px", marginLeft: "10px" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {titleName} Deposit
              </Typography>
              <Typography id="modal-modal-title">
                <CloseIcon onClick={handleClose} />
              </Typography>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel variant="outlined" htmlFor="member">
                  Name
                </InputLabel>
                <Controller
                  name="member"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Name"
                      value={field.value || ""}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setValue("member", event.target.value);
                      }}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                    >
                      {data?.data?.data?.map((name) => (
                        <MenuItem key={name._id} value={name._id}>
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                {errors?.member && (
                  <Typography color="error" sx={{ marginTop: "10px" }}>
                    {errors?.member?.message}{" "}
                  </Typography>
                )}
              </FormControl>

              <Controller
                name="depositAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-number"
                    label="Amount"
                    style={{
                      marginTop: "30px",
                      width: "90%",
                      marginLeft: "10px",
                    }}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />

              {errors?.depositAmount && (
                <Typography color="error" sx={{ marginTop: "10px" }}>
                  {errors?.depositAmount?.message}{" "}
                </Typography>
              )}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="depositDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={dayjs(field.value)}
                      onChange={(newValue) => field.onChange(newValue)}
                      views={["year", "month", "day"]}
                      sx={{
                        marginTop: "30px",
                        width: "90%",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                />
                {errors?.depositDate && (
                  <Typography color="error" sx={{ marginTop: "10px" }}>
                    {errors?.depositDate?.message}{" "}
                  </Typography>
                )}
              </LocalizationProvider>

              <Button
                type="submit"
                sx={{
                  marginTop: "30px",
                  marginLeft: "10px",
                }}
                variant="contained"
                size="small"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default DepositCreateUpdate;
