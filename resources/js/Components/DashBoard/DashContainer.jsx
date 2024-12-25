import { Grid } from "@chakra-ui/react";

//   全体を囲うラッパー
const DashContainer = ({ children }) => {
    return (
        <Grid templateColumns="repeat(2,1fr)" gap={6} px={5} py={6}>
            {children}
        </Grid>
    );
};

export default DashContainer;
