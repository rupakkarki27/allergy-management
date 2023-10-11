import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Layout from "../../components/Layout";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch } from "../../store";
import { IApiErrorResponse } from "@allergy-management/models";
import { AxiosError } from "axios";
import { setSuccess, setError } from "../../store/Snackbar/snackbar.slice";
import HideControl from "../../components/HideControl";

const AllergyDetail = () => {
  const [showDeleteAlert, setShowDeleteModal] = useState(false);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const deleteAllergy = useMutation({
    mutationKey: ["allergy-delete"],
    mutationFn: () => AllergyService.deleteAllergy(id as string),
    onSuccess: () => {
      dispatch(setSuccess({ message: "Allergy deleted successfully" }));
      queryClient.invalidateQueries({ queryKey: ["allergies-list"] });
      navigate("/allergies");
    },
    onError: (e: AxiosError<IApiErrorResponse>) => {
      dispatch(
        setError({
          message: e.response?.data?.message || "Something went wrong",
        })
      );
    },
  });

  const handleDelete = () => {
    deleteAllergy.mutate();
  };

  const { data: allergy, isLoading } = useQuery({
    queryKey: ["allergy-detail", id],
    queryFn: () => AllergyService.getAllergy(id as string),
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Layout title="Allergy Details">
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item sx={{ width: 600 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/allergies">
                Allergies
              </Link>
              <Link underline="hover" color="inherit">
                {allergy?.name}
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid
            container
            direction={"row"}
            sx={{ width: 200 }}
            justifyContent={"space-between"}
          >
            <HideControl>
              <Grid item>
                <Button
                  startIcon={<Edit />}
                  variant="outlined"
                  onClick={() => navigate(`/allergies/${id}/edit`)}
                >
                  Edit
                </Button>
              </Grid>
            </HideControl>
            <HideControl>
              <Grid item>
                <Button
                  startIcon={<Delete />}
                  variant="outlined"
                  color="error"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              </Grid>
            </HideControl>
          </Grid>
        </Grid>
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
                container
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
                  <Typography
                    variant="body2"
                    color={"text.secondary"}
                    sx={{ textAlign: "left" }}
                  >
                    Symptoms
                  </Typography>
                </Stack>
                <List>
                  {allergy?.symptoms.map((s, idx) => (
                    <ListItemText sx={{ textAlign: "left" }} key={idx}>
                      - {s}
                    </ListItemText>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Layout>
      <Dialog
        open={showDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Allergy?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, there will be no way to recover this allergy later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button autoFocus onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AllergyDetail;
