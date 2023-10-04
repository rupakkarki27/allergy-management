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

  console.log(image);

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
                  <TextField label="Allergy Name" fullWidth />
                  <TextField
                    label="Symptoms"
                    fullWidth
                    placeholder="headache, vomiting (comma separated)"
                  />
                  <TextField label="Notes" fullWidth />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Severity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Severity"
                      sx={{ textAlign: "left" }}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      {severityList.map((s) => (
                        <MenuItem value={s.value} key={s.value}>
                          {s.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        onChange={(e) => console.log(e.target.checked)}
                      />
                    }
                    label="This allergy is high risk"
                  />
                  <Button fullWidth variant="contained">
                    Save
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
