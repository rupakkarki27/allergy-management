import { IAllergy } from "@allergy-management/models";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IAllergyCard {
  allergy: IAllergy;
}

const AllergyCard: React.FC<IAllergyCard> = ({ allergy }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 220 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar src={allergy.image} sx={{ width: 100, height: 100 }} />
        <Typography sx={{ paddingY: 2 }} variant="h5" fontWeight={"bold"}>
          {allergy.name}
        </Typography>
        <Grid
          direction={"row"}
          container
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Grid item>
            <Chip
              label={allergy.severity}
              color={"warning"}
              sx={{
                borderRadius: 2,
                fontSize: 12,
              }}
            />
          </Grid>
          <Grid item>
            {allergy?.isHighRisk && (
              <Chip
                label={"HIGH RISK"}
                color={"error"}
                sx={{
                  borderRadius: 2,
                  fontSize: 12,
                }}
              />
            )}
          </Grid>
        </Grid>

        <Typography sx={{ paddingY: 2 }} variant="body2" color="text.secondary">
          <Typography
            sx={{ paddingY: 2 }}
            variant="body2"
            color="text.secondary"
          >
            Symptoms:
            {allergy.symptoms.join(", ").slice(0, 20)}...
          </Typography>
        </Typography>
        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(`/allergies/${allergy.id}`)}
          >
            Learn More
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default AllergyCard;
