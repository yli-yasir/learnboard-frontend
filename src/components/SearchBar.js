import React, { useState } from "react";
import { InputBase} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  buildQueryString
} from "../utils/URLUtils";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Autosuggest from "react-autosuggest";
import { searchPosts } from "../utils/DBUtils";

const useStyles = makeStyles(theme => ({
  autoSuggestRoot: {
    width: "100%",
    position: "relative"
  },
  link: {
    width: "100%",
    textDecoration: "none",
    color: theme.palette.grey[700]
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: theme.spacing(3),
    right: theme.spacing(3)
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  searchInputContainer: {
    display: "flex",
    borderRadius: theme.spacing(2),
    width: "100%",
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: fade(theme.palette.grey[300], 0.6)
    }
  },
  inputRoot: {
    width: "100%",
    paddingLeft: theme.spacing(2)
  },
  searchButton:{
    borderRadius: theme.spacing(2)
  },
  suggestionItem:{
    width:'100%',
    display:'block',
    whiteSpace:'nowrap',
    overflow:'hidden',
    textOverflow:'ellipsis'
  }
}));

//Render the input component contained in the autosuggest root
function renderInputComponent(props) {

  const { classes, queryString, ...other } = props;

  return (
    <Box className={classes.searchInputContainer}>
      <InputBase
        placeholder='LearnBoard'
        classes={{
          root: classes.inputRoot,
          input: classes.input
        }}
        inputProps={{ "aria-label": "search" }}
        {...other}
      />
      <Link
        to={{
          pathname: "/search",
          search: buildQueryString(queryString, { q: props.value })
        }}
      >
        <Button className={classes.searchButton}>
          <SearchIcon color="primary" />
        </Button>
      </Link>
    </Box>
  );
}

function renderSuggestionsContainer(options) {
  return <Paper {...options.containerProps}>{options.children}</Paper>;
}

//Render a suggestion item
function renderSuggestion(suggestionItem, queryString, classes) {
  return (
    <Link
      className={classes.link}
      to={{
        pathname: "/search",
        search: buildQueryString(queryString, { q: suggestionItem.topic })
      }}
    >
      <MenuItem component="div" >
        <SearchIcon color="primary" />
        <div className={classes.suggestionItem}>
        &nbsp;&nbsp;&nbsp;{suggestionItem.topic}
        </div>
      </MenuItem>
    </Link>
  );
}

function getSuggestionValue(suggestionItem) {
  return suggestionItem.topic;
}
function SearchBar(props) {

  const queryString = props.queryString;

  const [suggestions, setSuggestions] = useState([]);

  const classes = useStyles();

  const handleSuggestionsFetchRequested = async ({ value }) => {
    try{
    const mSuggestions = await searchPosts(queryString, value, {
      limit: 5,
      projection:{
      topic: 1
      },
      sort:{
        _id:-1
      }
    }
    );
    console.log('suggestions:')
    console.log(suggestions);
    setSuggestions(mSuggestions);
  }
  catch(e){
    console.log(e)
  }

  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      getSuggestionValue={getSuggestionValue}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      inputProps={{
        classes,
        value: props.text,
        onChange: props.onTextChange,
        queryString
      }}
      theme={{
        container: classes.autoSuggestRoot,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={renderSuggestionsContainer}
      renderInputComponent={renderInputComponent}
      renderSuggestion={suggestion =>
        renderSuggestion(suggestion, queryString, classes)
      }
    />
  );
}

export default SearchBar;
