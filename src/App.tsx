import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { FilterCompanent } from "./FilterCompanent/FilterCompanent";

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  padding: "20px",
});

const App = () => {
  return (
    <CenteredContainer maxWidth="lg">
      <FilterCompanent />
    </CenteredContainer>
  );
};

export default App;
