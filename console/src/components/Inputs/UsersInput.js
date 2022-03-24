import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { fetchJson, fetch } from '../../fetch'
import { Labeled, addField } from 'react-admin'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

class UsersInput extends React.Component {
    componentWillMount() {
        const { hasEdit, basePath, record } = this.props

        if(record.userId) {
          if(basePath === '/patientcontacts') {
            this.props.input.onChange(this.props.record.userId)
            fetchJson(`${process.env.API_URL}/users/${record.userId}`, { method: 'GET' }).then(
              response => {
  
                this.setState({ single: response.json.username })
              }
            )
          }
  
          console.log(hasEdit,"basePath")
          if (basePath == '/patientsheets') {
            fetchJson(`${process.env.API_URL}/users/${record.userId}`, { method: 'GET' }).then(
              response => {
  
                this.setState({ single: response.json.username })
              }
            )
          }
        }
        
      }
    
  state = {
    single: '',
    suggestions: [],
  }
  renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node)
            inputRef(node)
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    )
  }

  renderSuggestion(suggestion) {
    return (
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={suggestion.picture} />
          </ListItemAvatar>
          <ListItemText secondary={suggestion.username} primary={suggestion.username} />
        </ListItem>
      </List>
    )
  }

  getSuggestionValue = suggestion => {
    this.props.input.onChange(suggestion.id)
    return `${suggestion.username}`
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    fetchJson(
      `${
        process.env.API_URL
      }/users?filter[where][or][0][username][regexp]=/^${value}/i`,
      { method: 'GET' }
    ).then(({ json }) => {
      this.setState({
        suggestions: json,
      })
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    })
  }

  render() {
    const { classes, basePath, record } = this.props
    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
    }

    if((basePath === '/patientcontacts' || basePath == '/patientsheets') && record.userId) {
      return (
        <Labeled label="userId">
          <TextField
            fullWidth
            InputProps={{
              value:this.state.single,
              classes: {
                input: classes.input,
              },
            }}

          />
        </Labeled>
      )
    }
    return (
      <Labeled label="userId">
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </Labeled>
    )
  }
}

UsersInput.propTypes = {
  classes: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
}

export default addField(withStyles(styles)(UsersInput))
