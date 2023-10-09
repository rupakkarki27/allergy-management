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
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { styled } from "@mui/material/styles";
import { Image } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AllergyService from "../../services/allergy";
import { useAppDispatch } from "../../store";
import { setError, setSuccess } from "../../store/Snackbar/snackbar.slice";
import { useNavigate } from "react-router-dom";
import { IApiErrorResponse } from "@allergy-management/models";
import { AxiosError } from "axios";

interface IAddAllergy {
  name: string;
  symptoms: string;
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

const AddNewAllergySchema = Yup.object().shape({
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const NewAllergy = () => {
  const [image, setImage] = useState<File>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addAllergy = useMutation({
    mutationKey: ["add-allergy"],
    mutationFn: (body: FormData) => AllergyService.createAllergy(body),
    onSuccess: (data) => {
      dispatch(setSuccess({ message: "Allergy added successfully" }));
      queryClient.invalidateQueries({ queryKey: ["allergies-list"] });
      navigate(`/allergies/${data.id}`);
    },
    onError: (e: AxiosError<IApiErrorResponse>) => {
      dispatch(
        setError({
          message: e.response?.data?.message || "Something went wrong",
        })
      );
    },
  });

  const onSubmit = (values: IAddAllergy) => {
    const formData = new FormData();

    const symptoms = values.symptoms.split(",");

    formData.append("name", values.name);
    values.notes && formData.append("notes", values.notes);
    formData.append("symptoms", symptoms.toString());
    formData.append("isHighRisk", String(values.isHighRisk));
    formData.append("severity", values.severity);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.append("file", image as any);

    addAllergy.mutate(formData);
  };

  const formik = useFormik<IAddAllergy>({
    initialValues: {
      isHighRisk: false,
      name: "",
      severity: "",
      symptoms: "",
      notes: "",
    },
    validationSchema: AddNewAllergySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <React.Fragment>
      <Layout title="New Allergy">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/allergies">
            Allergies
          </Link>
          <Link underline="hover" color="inherit">
            New Allergy
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
                      src={image && URL.createObjectURL(image as Blob)}
                      sx={{ height: 200, width: 200, alignSelf: "center" }}
                    />
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<Image />}
                      fullWidth
                      sx={{ marginTop: 2 }}
                    >
                      Image
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target?.files![0])}
                      />
                    </Button>
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
                    disabled={addAllergy.isLoading}
                  >
                    {addAllergy.isLoading ? "Loading..." : "Save"}
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

export default NewAllergy;
