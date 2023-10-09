import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Layout from "../../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AllergyService from "../../services/allergy";
import { useAppDispatch } from "../../store";
import { setError, setSuccess } from "../../store/Snackbar/snackbar.slice";
import { useNavigate, useParams } from "react-router-dom";
import { IAllergy, IApiErrorResponse } from "@allergy-management/models";
import { AxiosError } from "axios";

interface IEditAllergy {
  name: string;
  symptoms: string[] | string;
  severity: string;
  isHighRisk: boolean;
  notes?: string;
}

const severityList = [
  {
    label: "Mild",
    value: "MILD",
  },
  {
    label: "Moderate",
    value: "MODERATE",
  },
  {
    label: "Severe",
    value: "SEVERE",
  },
  {
    label: "Life Threatening",
    value: "LIFE THREATENING",
  },
  {
    label: "Death",
    value: "DEATH",
  },
];

const EditAllergySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  symptoms: Yup.string()
    .required("Symptoms are required")
    .matches(/\w+(,\s*\w+)*/, {
      message: "Symptoms must be separated by commas",
    }),
  notes: Yup.string().optional(),
  isHighRisk: Yup.boolean(),
  severity: Yup.string().required("Please select a severity"),
});

const EditAllergy = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams<{ id: string }>();

  const editAllergy = useMutation({
    mutationKey: ["edit-allergy"],
    mutationFn: (body: Partial<IAllergy>) =>
      AllergyService.updateAllergy(id as string, body),
    onSuccess: () => {
      dispatch(setSuccess({ message: "Allergy edited successfully" }));
      queryClient.invalidateQueries({ queryKey: ["allergy-detail"] });
      navigate(`/allergies/${id}`);
    },
    onError: (e: AxiosError<IApiErrorResponse>) => {
      dispatch(
        setError({
          message: e.response?.data?.message || "Something went wrong",
        })
      );
    },
  });

  const { data: existingAllergy } = useQuery({
    queryKey: ["allergy-detail", id],
    queryFn: () => AllergyService.getAllergy(id as string),
  });

  const onSubmit = (values: IEditAllergy) => {
    values = {
      ...values,
      symptoms:
        typeof values.symptoms === "string"
          ? values.symptoms.split(",")
          : values.symptoms,
    };

    editAllergy.mutate(values as Partial<IAllergy>);
  };

  const formik = useFormik<IEditAllergy>({
    initialValues: {
      isHighRisk: existingAllergy?.isHighRisk || false,
      name: existingAllergy?.name || "",
      severity: existingAllergy?.severity || "",
      symptoms: existingAllergy?.symptoms.join(",") || "",
      notes: existingAllergy?.notes || "",
    },
    validationSchema: EditAllergySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <React.Fragment>
      <Layout title="New Allergy">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/allergies">
            Allergies
          </Link>
          <Link underline="hover" color="inherit">
            Edit
          </Link>
        </Breadcrumbs>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Card
              sx={{
                width: 400,
                padding: 4,
                marginTop: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ marginBottom: 2 }}
                >
                  Fill in the allergy details
                </Typography>
                <Stack gap={2}>
                  <Box sx={{ alignSelf: "center" }}>
                    <Avatar
                      src={existingAllergy?.image}
                      sx={{ height: 200, width: 200, alignSelf: "center" }}
                    />
                  </Box>
                  <TextField
                    label="Allergy Name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    error={formik.errors.name ? true : false}
                    helperText={formik.errors.name}
                  />
                  <TextField
                    label="Symptoms"
                    fullWidth
                    placeholder="headache, vomiting (comma separated)"
                    value={formik.values.symptoms}
                    onChange={formik.handleChange("symptoms")}
                    error={formik.errors.symptoms ? true : false}
                    helperText={formik.errors.symptoms}
                  />
                  <TextField
                    label="Notes"
                    fullWidth
                    value={formik.values.notes}
                    onChange={formik.handleChange("notes")}
                    error={formik.errors.notes ? true : false}
                    helperText={formik.errors.notes}
                    multiline
                    rows={4}
                  />
                  <FormControl
                    fullWidth
                    error={formik.errors.severity ? true : false}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Severity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Severity"
                      sx={{ textAlign: "left" }}
                      value={formik.values.severity}
                      onChange={(e) =>
                        formik.setFieldValue("severity", e.target.value)
                      }
                      error={formik.errors.notes ? true : false}
                    >
                      {severityList.map((s) => (
                        <MenuItem value={s.value} key={s.value}>
                          {s.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!formik.errors.severity && (
                      <FormHelperText error id="accountId-error">
                        {formik.errors.severity}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.isHighRisk}
                        onChange={(e) =>
                          formik.setFieldValue("isHighRisk", e.target.checked)
                        }
                      />
                    }
                    label="This allergy is high risk"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={formik.submitForm}
                    disabled={editAllergy.isLoading}
                  >
                    {editAllergy.isLoading ? "Loading..." : "Save"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

export default EditAllergy;
