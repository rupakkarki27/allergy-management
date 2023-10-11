import React from "react";
import { useQuery } from "@tanstack/react-query";
import AllergyService from "../../services/allergy";
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Link,
  Pagination,
} from "@mui/material";
import AllergyCard from "../../components/AllergyCard";
import Layout from "../../components/Layout";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HideControl from "../../components/HideControl";

const AllergyList = () => {
  const [{ page, pageSize }, setPagination] = React.useState({
    page: 1,
    pageSize: 12,
  });

  const navigate = useNavigate();

  const { data: allergies, isLoading } = useQuery({
    queryKey: ["allergies-list", page, pageSize],
    queryFn: () => AllergyService.getAllAllergies(page, pageSize),
    keepPreviousData: true,
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Layout title="Allergies">
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item sx={{ width: 200 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/allergies">
                Allergies
              </Link>
              <Link underline="hover" color="inherit"></Link>
            </Breadcrumbs>
          </Grid>
          <HideControl>
            <Grid item>
              <Button
                startIcon={<Add />}
                variant="outlined"
                onClick={() => navigate("/allergies/add")}
              >
                New Allergy
              </Button>
            </Grid>
          </HideControl>
        </Grid>
        <Grid
          container
          spacing={2}
          marginTop={2}
          justifyContent={"center"}
          sx={{ minHeight: "100vh" }}
        >
          {allergies?.items?.map((a) => (
            <Grid item key={a.id}>
              <AllergyCard allergy={a} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {allergies?.meta && (
            <Pagination
              count={allergies?.meta?.totalPages}
              color="primary"
              onChange={(_event, value: number) =>
                setPagination({ page: value, pageSize: pageSize })
              }
              sx={{ marginTop: 8 }}
            />
          )}
        </Box>
      </Layout>
    </React.Fragment>
  );
};

export default AllergyList;
