import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { useGetMemberQuery } from "../../../redux/service/memberService";
import {
  useActiveMealQuery,
  useCreateMealMutation,
  useUpdateMealMutation,
} from "../../../redux/service/mealService";

function MealCreateUpdate({
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
}) {
  // get member
  const { data } = useGetMemberQuery();

  // activeMeal
  const { data: activeMeal } = useActiveMealQuery();
  // create meal
  const [createMeal, { isSuccess: isCreateMealSuccess }] =
    useCreateMealMutation();
  // update meal
  const [updateMeal, { isSuccess: isUpdateMealSuccess }] =
    useUpdateMealMutation();

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

  // react hook form
  const Schema = yup.object({
    mealDate: yup.date().required("Meal Date is required"),
    meal: yup.array().of(
      yup.object({
        mealQuantity: yup
          .number()
          .positive()
          .integer()
          .required("Meal Quantity is required"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
    mode: "all",
  });
  // console.log(watch());

  // onSubmit
  const onSubmit = (data) => {
    console.log(data);

    if (editData) {
      updateMeal();
    } else {
      const createdData = {
        mealDate: dayjs(data?.mealDate).toISOString(),
        meals: data?.meals,
      };
      createMeal({ postBody: createdData });
    }
  };

  useEffect(() => {
    reset({ ...defaultValues, meals: activeMeal?.data });
  }, [defaultValues, reset]);

  useEffect(() => {
    if (isUpdateMealSuccess || isCreateMealSuccess) {
      setDefaultValues(defaultValue);
      setEditData(false);
      handleClose();
    }
  }, [
    isCreateMealSuccess,
    isUpdateMealSuccess,
    defaultValue,
    setDefaultValues,
    setEditData,
  ]);

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
                {titleName} Meal
              </Typography>
              <CloseIcon onClick={handleClose} />
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="mealDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date"
                      value={dayjs(field.value)}
                      onChange={(newValue) => field.onChange(newValue)}
                      views={["year", "month", "day"]}
                      sx={{
                        marginTop: "10px",
                        width: "90%",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                />
                {errors.mealDate && (
                  <Typography color="error" sx={{ marginLeft: "10px" }}>
                    {errors.mealDate.message}
                  </Typography>
                )}
              </LocalizationProvider>
              {data?.data?.data?.map((item, index) => (
                <Typography
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    sx={{ marginLeft: "15px", marginTop: "30px" }}
                    variant="body1"
                  >
                    {item?.name}
                  </Typography>
                  <Controller
                    name={`meals[${index}].mealQuantity`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        id="outlined-number"
                        label="Meal Quantity"
                        style={{
                          marginTop: "30px",
                          width: "50%",
                          marginLeft: "10px",
                        }}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />

                  {errors?.meals && (
                    <Typography color="error" sx={{ marginLeft: "10px" }}>
                      {errors?.meals?.message}{" "}
                    </Typography>
                  )}
                </Typography>
              ))}
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
}

export default MealCreateUpdate;
