import React from "react";
import Header from "../components/SearchHeader";
import Box from "@material-ui/core/Box";
import ResultsGrid from "../components/SearchResultsGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getSearchParams} from "../utils";
import db from "../stitch";


function SearchPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);

  //Grab the query parameters in order to perform search according to them.
  let {q,postType} = getSearchParams(location.search);

  //This effect will be triggered if the params change.
  React.useEffect(() => {
    //set the state to loading.
    setIsLoading(true);

    async function fetchResults() {
      // //Build a filter accordingly, and use it to execute the query.
      // let filter = {};

      // //If there is a specified query i.e. search term
      // if (q) {
      //   filter.topic = q;
      // }

      // //If there is a postType,and that type isn't 'all' we consider it.
      // //( no need to consider postType if we are looking for everything)
      // if (postType && postType !== POST_TYPE.ALL) {
      //   filter.type = postType;
      // }

      // const queryResults = await db
      //   .collection("posts")
      //   .find(filter)
      //   .asArray();

      // setResults(queryResults);

      setResults([{
        _id:'cx',
        postType: 'request',
        topic: 'Machine learning and AI with Python full mastery course cool',
        shortDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
        description: 'I have been teaching machine learning and AI in general for the last 10 years',
        City:'Girne',
        Languages:['Arabic','English','French'],
        likes: 429,
        by:{_id: 'chaos29@yahoo.com',name:'yasir basil abood al-baldawiol'}
      }]);

      setIsLoading(false);
    }

    fetchResults();
  }, [q, postType]);

  //Either a loading bar, if we are loading, or a grid with the results.
  const content = isLoading ? (
    <CircularProgress size={50} color="primary" />
  ) : (
    <ResultsGrid dataset={results} />
  );

  return (
    <div>
      <Header/>
      <Box
        pt={15}
      >
        {/*this is either the loading spinner, or the results grid */}
        {content}
      </Box>
    </div>
  );
}

export default SearchPage;
