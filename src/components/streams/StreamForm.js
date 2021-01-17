import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form";


class StreamForm extends Component {

  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error} </div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, placeholder = '', meta }) => {
    //console.log(meta);
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (

      <div className={className}>
        <label>{label}</label>
        <input
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          {...input}  // short-form of controlled value setting
          placeholder={placeholder}

          autoComplete="off"
        />

        {this.renderError(meta)}    {/*   #4 : it comes in props:'meta'    */}
      </div>

    )
  }

  onSubmit = (formValues) => {
    //event.preventDefault()  // Not required in redux-form

    //console.log(formValues);
    this.props.onFormSubmit(formValues)
  }

  render() {
    // console.log(this.props)
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui error form">      {/* semantics-ui:  'error' should be specified to error message css working */}
        <Field
          name="title"
          // value= 
          // 'value' property will be given behind the scene from either 
          // i) this.props.initialValues which is originated from paranet component
          // ii) or, user typing
          // in both cases, renderInput() will assign to it.
          component={this.renderInput}
          label="Enter title"
          placeholder="Go here" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary" type="submit"> Submit </button>
      </form>
    )
  }
}


/* 
#1 to #4 about input validation in redux-form
*/


const validate = (formValues) => {      // #1 .Defined out of Componentnt and to be wired via reduxForm()()
  //console.log(formValues);
  const errors = {}
  if (!formValues.title) {
    errors.title = 'Must enter Title'
    // #3. error message will be provided to 'Field name="title" component={this.renderInput}' 
    // via renderInput()'s 'meta' props
  }
  if (!formValues.description) {
    errors.description = 'Must enter Description'
  }

  return errors

}

// reduxForm() itself looks similar to connect() that returns a function which takes Component name as argument 
export default reduxForm({
  form: 'streamForm',
  validate: validate      // #2. To wire the valdiate function to redux-form
})(StreamForm)

