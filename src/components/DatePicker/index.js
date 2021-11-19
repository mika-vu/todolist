import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Hidden from "@mui/material/Hidden";

export default function DatePicker(props) {
  return (
    <>
      <Hidden smUp>
        <MobileDatePicker
          {...props}
          renderInput={(params) => (
            <TextField size="small" fullWidth {...params} />
          )}
        />
      </Hidden>
      <Hidden only="xs">
        <DesktopDatePicker
          {...props}
          renderInput={(params) => (
            <TextField size="small" fullWidth {...params} />
          )}
        />
      </Hidden>
    </>
  );
}
