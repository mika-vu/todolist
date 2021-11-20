import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomSnackbar({
  openSnackbar,
  handleCloseSnackbar,
  message,
  ...rest
}) {
  return (
    <Snackbar
      {...rest}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbar}
      onClose={handleCloseSnackbar}
    >
      <Alert
        elevation={10}
        variant="filled"
        onClose={handleCloseSnackbar}
        severity="success"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

CustomSnackbar.defaultProps = {
  openSnackbar: false,
  handleCloseSnackbar: () => {},
  message: "",
};
