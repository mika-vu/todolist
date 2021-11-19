import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2px 20px",
  },
  container: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderStyle: "solid",
    borderRadius: 5,
  },
  action: {
    display: "flex",
    alignItems: "center",
  },
});

export default useStyles;
