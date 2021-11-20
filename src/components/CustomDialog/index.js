import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function CustomDialog({
  openDialog,
  handleCloseDialog,
  title,
  textContent,
  onSubmit,
}) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{textContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack p={1} direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onSubmit}
          >
            Agree
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="error"
            size="small"
          >
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  openDialog: false,
  handleCloseDialog: () => {},
  title: "Confirm",
  textContent: "",
  onSubmit: () => {},
};
