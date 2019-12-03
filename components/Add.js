import React from 'react' // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from 'prop-types' // у Article это react и prop-types

class Add extends React.Component {
  state = {
    text: '',
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { text } = this.state
      this.props.onAddNews({
        id: +new Date(),
        text,
        status: false,
      })

      this.setState({text:''})
    }
  }

  handleChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]: value })
  }
  validate = () => {
    const { text } = this.state
    if (text.trim()) {
      return true
    }
    return false
  }

  render() {

    const { text } = this.state
    return (
      <React.Fragment>
        <input
          id='text'
          type='text'
          className='Add__todo'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder='What needs to be done?'
          value={text} />
      </React.Fragment>
    )
  }
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired, // func используется для проверки передачи function
}

export { Add } // именованный экспорт