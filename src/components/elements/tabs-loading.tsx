import { Grid, Skeleton, Stack } from "@mui/material";

export const TabsLoading = () => {
  return (
    <Stack>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Skeleton variant="rounded" width="100%" height="3rem" />
        </Grid>
        {Array.from({ length: 18 }).map((_, index) => (
          <Grid size={4} key={index}>
            <Skeleton variant="rounded" width="100%" height="2.5rem" />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
