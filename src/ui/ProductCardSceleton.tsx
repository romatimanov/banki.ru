import { Card, CardContent, styled } from "@mui/material";

const SceletonCard = styled(Card)(() => ({
  position: "relative",
  width: "100%",
  overflow: "visible",
  borderRadius: "15px",
  "&::before": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to right, transparent, #efefef, transparent)",
    transform: "translateX(-100%)",
    animation: "wave 2s infinite",
  },
  "@keyframes wave": {
    "100%": {
      transform: "translateX(100%)",
    },
  },
}));

const SceletonImageContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  marginBottom: "20px",
});

const SceletonAmountContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SceletonText = styled("div")({
  width: "100px",
  height: "5px",
  color: "transparent",
  "&:nth-last-child(3n)": {
    marginBottom: "25px",
  },
  "&:nth-last-child(-n + 2)": {
    width: "100px",
  },
});

const SceletonTitle = styled(SceletonText)({
  height: "10px",
});

const ImageSceleton = styled("div")({
  width: "100px",
  height: "100px",
  borderRadius: "20px",
});

export function ProductCardSceleton(): JSX.Element {
  return (
    <SceletonCard variant="outlined">
      <CardContent>
        <SceletonImageContainer>
          <ImageSceleton className="sceleton" />
          <SceletonTitle className="sceleton" />
        </SceletonImageContainer>
        <SceletonAmountContainer>
          <SceletonText className="sceleton" />
          <SceletonText className="sceleton" />
        </SceletonAmountContainer>
      </CardContent>
    </SceletonCard>
  );
}
