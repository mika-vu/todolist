import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ItemInfo from "./components/ItemInfo";
import TodoItem from "./components/TodoItem";
import useStyles from "./style";
import { useTheme } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import CustomSnackbar from "./components/CustomSnackbar";
import CustomDialog from "./components/CustomDialog";
import _ from "lodash";

function App() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [keyword, setKeyword] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  const handleAddNew = (newItem) => {
    const newList = _.sortBy([...todoList, newItem], [(i) => i.date.getTime()]);
    setTodoList(newList);
    setOpenSnackbar(true);
    setMessage("New addition successful!");
  };
  const handleUpdate = (data) => {
    const newList = todoList.slice();
    const index = newList.findIndex((i) => i.id === data.id);
    newList.splice(index, 1, data);
    setTodoList(_.sortBy(newList, [(i) => i.date.getTime()]));
    setOpenSnackbar(true);
    setMessage("Update successful!");
  };

  const handleRemove = (_id) => {
    const newList = todoList.slice();
    const index = newList.findIndex((i) => i.id === _id);
    newList.splice(index, 1);
    setTodoList(newList);
    const newSelected = selectedItem.slice();
    const indexSelected = newSelected.findIndex((i) => i === _id);
    newSelected.splice(indexSelected, 1);
    setSelectedItem(newSelected);
    setOpenDialog(false);
    setOpenSnackbar(true);
    setMessage("Delete successfully!");
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleRemoveAll = () => {
    const newList = todoList.slice();
    selectedItem.forEach((i) => {
      const index = newList.findIndex((j) => j.id === i);
      newList.splice(index, 1);
      setSelectedItem([]);
    });
    setTodoList(newList);
    setOpenDialog(false);
    setOpenSnackbar(true);
    setMessage("Delete successfully!");
  };
  const handleAddSelected = (_id) => {
    const newList = [...selectedItem, _id];
    setSelectedItem(newList);
  };
  const handleRemoveSelected = (_id) => {
    const newList = selectedItem.slice();
    const index = newList.findIndex((i) => i.id === _id);
    newList.splice(index, 1);
    setSelectedItem(newList);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const todoListFilter = _.filter(todoList, (i) =>
    _.includes(i.titleName.toLowerCase(), keyword.toLowerCase())
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomSnackbar
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          message={message}
        />
        <CustomDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          onSubmit={handleRemoveAll}
        />
        <Container maxWidth="xl">
          <Box p={0.5} />
          <Paper elevation={20} sx={{ borderRadius: 2 }}>
            <Box p={3}>
              <div className={classes.root}>
                <Grid container sx={{ height: "100%" }}>
                  <Grid item xs={12} md={5}>
                    <Box px={4} py={2}>
                      <div className={classes.title}>New Task</div>
                      <Box mt={4} />
                      <ItemInfo onSubmit={handleAddNew} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={7} container>
                    <div className={classes.container}>
                      <div className={classes.wrapper}>
                        <div className={classes.title}>To Do List</div>
                        <Box mt={4} mb={2} px={1}>
                          <TextField
                            placeholder="Search ..."
                            size="small"
                            fullWidth
                            type="search"
                            value={keyword}
                            onChange={handleSearch}
                          />
                        </Box>
                        <Stack className={classes.scrollbar} spacing={1} px={1}>
                          {todoListFilter.map((i) => (
                            <TodoItem
                              key={i.id}
                              info={i}
                              onUpdate={handleUpdate}
                              onRemove={handleRemove}
                              onAddSelected={handleAddSelected}
                              onRemoveSelected={handleRemoveSelected}
                            />
                          ))}
                        </Stack>
                      </div>
                      <Fade in={selectedItem.length > 0}>
                        <AppBar position="relative" className={classes.footer}>
                          <Toolbar>
                            <Typography variant="caption" color="black">
                              Bulk Action:
                            </Typography>
                            <Box ml="auto" />
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              Done
                            </Button>
                            <Box m={1} />
                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                              onClick={handleOpenDialog}
                            >
                              Remove
                            </Button>
                          </Toolbar>
                        </AppBar>
                      </Fade>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Paper>
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default App;
