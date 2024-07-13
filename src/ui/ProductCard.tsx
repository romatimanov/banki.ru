import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  width: "100%",
  overflow: "visible",
  borderRadius: "15px",
});

const ImageContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: 12,
});

const Image = styled("img")({
  width: 100,
  height: 100,
  marginRight: 16,
  borderRadius: "15px",
});

const TextContainer = styled("div")({
  flexGrow: 1,
});

const StyledTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 12,
});

const AmountContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 12,
});

const AmountText = styled(Typography)({
  fontSize: 16,
});

const AmountNumber = styled(Typography)({
  fontSize: 18,
  fontWeight: "bold",
});

export type ProductCardProps = {
  amount: number;
  name: string;
  logo: string;
};

export function ProductCard({
  amount,
  name,
  logo,
}: ProductCardProps): JSX.Element {
  // Функция для форматирования суммы в рублях
  function formatCurrency(amount: number): string {
    return amount.toLocaleString("ru-RU") + " ₽";
  }

  return (
    <StyledCard variant="outlined">
      <CardContent>
        <ImageContainer>
          <Image src={logo} alt="Placeholder" />
          <TextContainer>
            <StyledTitle color="textSecondary" gutterBottom>
              {name}
            </StyledTitle>
          </TextContainer>
        </ImageContainer>
        <AmountContainer>
          <AmountText color="textSecondary">Сумма</AmountText>
          <AmountNumber color="textSecondary">
            {formatCurrency(amount)}
          </AmountNumber>
        </AmountContainer>
      </CardContent>
    </StyledCard>
  );
}
