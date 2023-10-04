import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import AllergyService from "../../services/allergy";
import {
  CircularProgress,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
  Typography,
  Divider,
  List,
  ListItemText,
} from "@mui/material";
import Layout from "../../components/Layout";

const AllergyDetail = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  const { data: allergy, isLoading } = useQuery({
    queryKey: ["allergy-detail", id],
    queryFn: () => AllergyService.getAllergy(id as string),
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Layout title="Allergy Details">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/allergies">
            Allergies
          </Link>
          <Link underline="hover" color="inherit">
            {allergy?.name}
          </Link>
        </Breadcrumbs>
        <Card sx={{ minHeight: 300, marginTop: 2, padding: 4 }}>
          <CardContent>
            <Grid container direction={"row"} spacing={2}>
              <Grid
                item
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                <Stack>
                  <Avatar
                    src={allergy?.image}
                    sx={{ height: 150, width: 150 }}
                  />
                  <Typography fontWeight={"bold"} sx={{ marginTop: 2 }}>
                    {allergy?.name}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ marginLeft: 8 }}>
                <Divider orientation="vertical" sx={{ minHeight: 300 }} />
              </Grid>
              <Grid
                sx={{ padding: 4, textAlign: "left", width: 500 }}
                direction={"column"}
              >
                <Grid item>
                  <Stack>
                    <Typography variant="body2" color={"text.secondary"}>
                      Severity
                    </Typography>
                    <Typography variant="body2" fontWeight={"bold"}>
                      {allergy?.severity}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item sx={{ marginTop: 2 }}>
                  <Stack>
                    <Typography variant="body2" color={"text.secondary"}>
                      Risk
                    </Typography>
                    {allergy?.isHighRisk ? (
                      <Typography variant="body2" fontWeight={"bold"}>
                        HIGH RISK
                      </Typography>
                    ) : (
                      <Typography variant="body2" fontWeight={"bold"}>
                        NO HIGH RISK
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item sx={{ marginTop: 2 }}>
                  <Stack sx={{ minWidth: 120 }}>
                    <Typography variant="body2" color={"text.secondary"}>
                      Notes
                    </Typography>
                    <Typography variant="body2" fontWeight={"bold"}>
                      {allergy?.notes || "N/A"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item sx={{ marginLeft: 8 }}>
                <Divider orientation="vertical" sx={{ minHeight: 300 }} />
              </Grid>
              <Grid item>
                <Stack>
                  <Typography variant="body2" color={"text.secondary"}>
                    Symptoms
                  </Typography>
                </Stack>
                <List>
                  {allergy?.symptoms.map((s) => (
                    <ListItemText sx={{ textAlign: "left" }}>
                      - {s}
                    </ListItemText>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Layout>
    </React.Fragment>
  );
};

export default AllergyDetail;
