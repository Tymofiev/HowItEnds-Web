import React from 'react'
import { Grid, Typography, Button, Select, MenuItem, Slider, TextField, withStyles } from '@material-ui/core'

const styles = (theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  btn: {
    marginTop: theme.spacing(3),
  },
})

class EditGenotype extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.creature.name,
      genotype: { ...this.props.creature.genotype },
      gen: 0,
    }
  }

  valuetext = (value) => {
    return `${value} genes`
  }

  changeGenotype = (value) => {
    const { genotype, gen } = this.state

    const newGenotype = genotype
    newGenotype[gen] = value
    this.setState({ genotype: newGenotype })
  }

  render() {
    const { genotype, gen, name } = this.state
    const {
      saveCreature,
      classes,
      creature: { _id },
    } = this.props

    return (
      <Grid className={classes.root}>
        <Typography>Current genotype: {JSON.stringify(Object.values(genotype))}</Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Choose gen to change:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Select value={gen} onChange={(event) => this.setState({ gen: event.target.value })}>
              {Object.entries(genotype).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Slider
              defaultValue={0}
              min={0}
              max={23}
              step={1}
              marks
              valueLabelDisplay='auto'
              onChange={(event, value) => this.changeGenotype(value)}
              getAriaValueText={(value) => this.valuetext(value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>New name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField value={name} onChange={(event) => this.setState({ name: event.target.value })} />
          </Grid>
        </Grid>
        <Button
          className={classes.btn}
          fullWidth
          variant='outlined'
          onClick={() => saveCreature({ name, genotype: Object.values(genotype), id: _id })}
        >
          Save
        </Button>
      </Grid>
    )
  }
}

export default withStyles(styles)(EditGenotype)
