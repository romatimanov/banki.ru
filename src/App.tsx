import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { FilterCompanent } from "./FilterCompanent/FilterCompanent";

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});

const App = () => {
  return (
    <CenteredContainer maxWidth="lg" sx={{ overflow: "hidden" }}>
      <FilterCompanent />
    </CenteredContainer>
  );
};

export default App;
