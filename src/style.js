import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: (theme) => ({
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderStyle: "solid",
    borderRadius: 5,
    [theme.breakpoints.up("md")]: {
      height: `calc(100vh - ${theme.spacing(8.5)})`,
      overflow: "hidden",
    },
  }),
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: (theme) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    border: 0,
    borderCollapse: "collapse",
    borderLeftWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderStyle: "solid",
    [theme.breakpoints.down("md")]: {
      borderLeftWidth: 0,
      borderTopWidth: 1,
    },
  }),
  wrapper: (theme) => ({
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${theme.spacing(20)})`,
  }),
  scrollbar: {
    flex: 1,
    overflow: "auto",
  },
  footer: {
    background: "#bbb !important",
  },
});

export default useStyles;
