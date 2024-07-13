import { Card, CardContent } from "@mui/material";

export function ProductCardSceleton(): JSX.Element {
  return (
    <Card
      className="sceleton-card"
      variant="outlined"
      sx={{ overflow: "visible", borderRadius: "15px" }}
    >
      <CardContent>
        <div className="sceleton-image-container">
          <div className="sceleton image-sceleton"></div>
          <div className="sceleton sceleton-text sceleton-title"></div>
        </div>
        <div className="sceleton-amount-container">
          <div className="sceleton sceleton-text"></div>
          <div className="sceleton sceleton-text"></div>
        </div>
      </CardContent>
    </Card>
  );
}
