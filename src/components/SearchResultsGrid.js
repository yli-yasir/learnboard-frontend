import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import ResultCard from './SearchResultCard'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { LanguageRounded } from "@material-ui/icons";


function ResultsGrid(props){

  let dataset=[];

  if (props.dataset){
   dataset =  props.dataset.map(item => (
        <ResultCard 
        key={item._id}
        id={item._id}
        topic={item.topic}
        languages={item.languages}
        shortDescription={item.shortDescription}
        likes={item.likes}
        by={item.by}
        postType={item.postType} />
      ))
  }


    return (
        <Grid container spacing={2}>
          <Grid key="leftSide" sm item></Grid>
          <Grid key="middle" xs={12} sm={10} md={6} item>{dataset}</Grid>
          <Grid key="rightSide" sm item></Grid>
        </Grid>
    );
}

export default ResultsGrid;