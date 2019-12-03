import React from 'react' // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from 'prop-types' // у Article это react и prop-types

class ToDo extends React.Component {


  handleCheckboxChange = (e) => {
    this.props.onCheckBox(this.props.data.id)
    console.log(this.props.data.status)
  }
  clickFunction = (e) => {
    this.props.onDeleteToDo(this.props.data.id)
  }
  onDoubleClick = (e) => {
    this.props.onEditToDo(this.props.data.id)

  }


  render() {
    const { text, status } = this.props.data
    const check = this.props.data.status
    return (
      <React.Fragment>
        <div className="list__items" >
          
            <input type="checkbox" id="checkbox" checked={status} onChange={this.handleCheckboxChange} />
            <label forhtml="check"></label>
          {/* {
            (check === true) ?
              <p className="list__text active" onDoubleClick={this.onDoubleClick}>{text}</p>
              : <p className="list__text" onDoubleClick={this.onDoubleClick}>{text}</p>
          } */}
          <p className={`list__text ${check ? 'active' : ''}`} onDoubleClick={this.onDoubleClick}>{text}</p>
          <button onClick={this.clickFunction}></button>
        </div>

      </React.Fragment>

    )
  }
}

ToDo.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })
}

export { ToDo } // именованный экспорт