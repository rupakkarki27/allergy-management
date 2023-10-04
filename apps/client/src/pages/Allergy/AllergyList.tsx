import React from "react";
import { useQuery } from "@tanstack/react-query";
import AllergyService from "../../services/allergy";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Grid,
  Link,
  Pagination,
} from "@mui/material";
import AllergyCard from "../../components/AllergyCard";
import Layout from "../../components/Layout";

const AllergyList = () => {
  const [{ page, pageSize }, setPagination] = React.useState({
    page: 1,
    pageSize: 12,
  });

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
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/allergies">
            Allergies
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          ></Link>
        </Breadcrumbs>
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
