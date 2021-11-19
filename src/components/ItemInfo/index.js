import { useState, useEffect } from "react";
import DatePicker from "../DatePicker";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ItemInfo(props) {
  const { role, id, onSubmit, onCallback } = props;
  const [titleName, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [piority, setPiority] = useState(1);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (role === "update") {
      setTitleName(props.titleName);
      setDescription(props.description);
      setDate(props.date);
      setPiority(props.piority);
    }
  }, [role, props.titleName, props.description, props.date, props.piority]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    switch (e.target.name) {
      case "piority":
        setPiority(newValue);
        break;
      case "titleName":
        setTitleName(newValue);
        if (newValue.trim().length > 0) {
          setError(false);
          setHelperText("");
        } else {
          setError(true);
          setHelperText("Please fill in this field.");
        }
        break;
      case "description":
        setDescription(newValue);
        break;
      default:
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRequest = {
      id: id || Date.now(),
      titleName,
      description,
      date,
      piority,
    };
    if (titleName.trim().length > 0) {
      onSubmit(dataRequest);
      onCallback();
      handleReset();
    } else {
      setError(true);
      setHelperText("Please fill in this field.");
    }
  };
  const handleReset = () => {
    if (role !== "update") {
      setTitleName("");
      setDescription("");
      setDate(new Date());
      setPiority(1);
      setError(false);
      setHelperText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={titleName}
        onChange={handleChange}
        name="titleName"
        placeholder="Add new task ..."
        fullWidth
        size="small"
        error={error}
        helperText={helperText}
      />
      <Box m={2} />
      <TextField
        label="Description"
        value={description}
        onChange={handleChange}
        name="description"
        multiline
        rows={4}
        fullWidth
      />
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Due Date"
            minDate={new Date()}
            inputFormat="dd/MM/yyyy"
            reduceAnimations
            value={date}
            onChange={setDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Piority"
            size="small"
            fullWidth
            select
            name="piority"
            value={piority}
            onChange={handleChange}
          >
            <MenuItem value={0}>low</MenuItem>
            <MenuItem value={1}>normal</MenuItem>
            <MenuItem value={2}>high</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box mt={4} />
      <Button variant="contained" color="success" fullWidth type="submit">
        {role === "update" ? "Update" : "Add"}
      </Button>
    </form>
  );
}

ItemInfo.defaultProps = {
  titleName: "",
  description: "",
  date: new Date(),
  piority: 1,
  onSubmit: () => {},
  onCallback: () => {},
};
