import { useState } from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ItemInfo from "../ItemInfo";
import Collapse from "@mui/material/Collapse";
import useStyles from "./style";
import CustomDialog from "../CustomDialog";

export default function TodoItem({
  info,
  onRemove,
  onAddSelected,
  onRemoveSelected,
  onUpdate,
}) {
  const { id, titleName, description, date, piority } = info;
  const classes = useStyles();
  const [openDetail, setOpenDetail] = useState(false);
  const [textDecoration, setTextDecoration] = useState("none");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleToggle = () => {
    setOpenDetail(!openDetail);
  };
  const handleRemove = () => {
    onRemove(id);
  };
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setTextDecoration(isChecked ? "line-through" : "none");
    if (isChecked) {
      onAddSelected(id);
    } else {
      onRemoveSelected(id);
    }
  };

  return (
    <>
      <CustomDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onSubmit={handleRemove}
      />
      <div className={classes.container}>
        <div className={classes.root}>
          <FormControlLabel
            sx={{ textDecoration }}
            label={titleName}
            control={<Checkbox onChange={handleChange} color="secondary" />}
          />
          <div className={classes.action}>
            <Button
              variant="contained"
              name="detail"
              size="small"
              color="primary"
              onClick={handleToggle}
            >
              Detail
            </Button>
            <Box m={1} />
            <Button
              variant="contained"
              name="remove"
              size="small"
              color="error"
              onClick={handleOpenDialog}
            >
              Remove
            </Button>
          </div>
        </div>
        <Collapse in={openDetail} timeout="auto" unmountOnExit>
          <Divider sx={{ backgroundColor: "rgba(0,0,0,0.3)" }} />
          <Box p={3}>
            <ItemInfo
              role="update"
              id={id}
              titleName={titleName}
              description={description}
              date={date}
              piority={piority}
              onSubmit={onUpdate}
              onCallback={handleToggle}
            />
          </Box>
        </Collapse>
      </div>
    </>
  );
}

TodoItem.defaultProps = {
  onAddSelected: () => {},
  onRemoveSelected: () => {},
  info: { titleName: "" },
};
