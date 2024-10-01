import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Flex from "../Flex";

interface SearchBoxProps {
  classes?: any;
  placeholder?: string;
}

const SearchBox = (props: SearchBoxProps) => {
  const { classes, placeholder } = props;

  const internalClasses = useStyles(props);

  return (
    <Flex className={(classes || internalClasses).search}>
      <Flex className={(classes || internalClasses).searchIcon}>
        <SearchIcon />
      </Flex>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: (classes || internalClasses).inputRoot,
          input: (classes || internalClasses).inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </Flex>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

export default SearchBox;
