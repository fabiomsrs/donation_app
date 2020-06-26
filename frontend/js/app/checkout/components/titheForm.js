import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Input } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as titheActions from '../../../actions/tithe'

function TitheForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Valor do Dízimo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            required
            id="value"
            name="value"            
            fullWidth
            type="number"
            autoFocus={true}
            onBlur={e => props.addValueTithe(e.target.value)}
          />
        </Grid>        
      </Grid>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(titheActions, dispatch)

export default connect(null, mapDispatchToProps)(TitheForm);