import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { MenuItem } from "@mui/material";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import {
  useCreteMarketMutation,
  useUpdateMarketMutation,
} from "../../../redux/service/marketService";
import SmallLoading from "../../SmallLoading";
import { defaultvalue } from "./Market";

function MarketCreateUpdate({
  handleClose,
  open,
  setDefaultvalues,
  defaultvalues,
  setEditData,
  editData,
  titleName,
}) {
  console.log(defaultvalues);
  // get member
  const { data } = useGetMemberQuery();
  // create market
  const [
    crateMarket,
    { isSuccess: createMarketSuuccess, isLoading: createMarketIsLoading },
  ] = useCreteMarketMutation();
  // update market
  const [
    updateMarket,
    { isSuccess: updateMarketSuuccess, isLoading: updateMarketIsLoading },
  ] = useUpdateMarketMutation();

  // mui style
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

  // react hook form
  const Schema = yup.object({
    member: yup.string().required("Member is required"),
    totalPrice: yup
      .number()
      .typeError("Total Price must be a number")
      .required("Total Price is required")
      .positive("Total Price must be a positive number")
      .integer("Total Price must be an integer")
      .min(1, "Total Price must be at least 1")
      .max(10000, "Total Price cannot exceed 10000"),
    marketDate: yup.date().required("Market date is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultvalues,
    mode: "all",
  });

  const onSubmit = (data) => {
    // console.log(data);

    if (editData) {
      const editedData = {
        member: data?.member,
        totalPrice: data?.totalPrice,
        marketDate: data?.marketDate,
      };
      updateMarket({ id: data?._id, postBody: editedData });
    } else {
      const cretedData = {
        member: data?.member,
        totalPrice: data?.totalPrice,
        marketDate: dayjs(data?.marketDate).toISOString(),
      };
      crateMarket({ postBody: cretedData });
    }
  };

  useEffect(() => {
    if (createMarketSuuccess || updateMarketSuuccess) {
      setDefaultvalues(defaultvalue);
      setEditData(false);
      handleClose();
    }
  }, [createMarketSuuccess, updateMarketSuuccess]);

  useEffect(() => {
    reset(defaultvalues);
  }, [defaultvalues]);

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
                {titleName} Market
              </Typography>
              <Typography id="modal-modal-title">
                <CloseIcon onClick={handleClose} />
              </Typography>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel variant="outlined" htmlFor="member">
                  Member
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
                        <MenuItem key={name?._id} value={name?._id}>
                          {name?.name}
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
                name="totalPrice"
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

              {errors?.totalPrice && (
                <Typography color="error" sx={{ marginTop: "10px" }}>
                  {errors?.totalPrice?.message}{" "}
                </Typography>
              )}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="marketDate"
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
                {errors?.marketDate && (
                  <Typography color="error" sx={{ marginTop: "10px" }}>
                    {errors?.marketDate?.message}{" "}
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
                Submit{" "}
                {(updateMarketIsLoading && <SmallLoading />) ||
                  (createMarketIsLoading && <SmallLoading />)}
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default MarketCreateUpdate;
