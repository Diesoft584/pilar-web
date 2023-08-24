import React, { useEffect } from "react";
import {
    Grid,
    Paper,
    Box,
    Button
} from "@mui/material";

const Fetchlist = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Box p={8}>
                        Fetchlist  <Button variant="contained">Contained</Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Fetchlist;
