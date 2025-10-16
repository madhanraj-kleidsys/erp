 
const cardStyle = {
  p: 2,
  borderRadius: 1,
  border: "1px solid #e0e0e0",
  minWidth: 240,
  maxWidth: 240,
  minHeight: 200,
  maxHeight: 300,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  bgcolor: "white",
  transition: "box-shadow 0.18s",
  cursor: "pointer",
  "&:hover": { boxShadow: 6, bgcolor: "#f3f6fb" },
};
export default cardStyle;
