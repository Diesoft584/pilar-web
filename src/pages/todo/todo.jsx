import React, { useEffect } from "react";
import {
    Grid,
    Paper,
    Box,
    Button
} from "@mui/material";

const Todo = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Box p={8}>
                        Todo  <Button variant="contained">Contained</Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default Todo;
