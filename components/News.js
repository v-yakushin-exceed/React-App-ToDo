import React from 'react' // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from 'prop-types' // у Article это react и prop-types
import { Article } from './Article' // далее мы идем в директорию components и в нужный компонент

// List items

class News extends React.Component {

  buttonDelete = () => {
    this.props.onDeleteAllNews(this.props.data)
  }
  buttonModeAll = (e) => {
    this.props.onAllMode(e.currentTarget.name)
  }

  buttonModeActive = (e) => {
    this.props.onActiveMode(e.currentTarget.name)
  }

  buttonModeCompleted = (e) => {
    this.props.onCompletedMode(e.currentTarget.name)
  }
  

  renderNews = (onCheckBox, onDeleteNews, onEditNews) => {
    const { data, mode } = this.props
    let filteredArray = data;

    if (mode === 'active') {
      filteredArray = data.filter(elem => elem.status === false)
    }

    if (mode === 'completed') {
      filteredArray = data.filter(elem => elem.status === true)
    }

    const todos = filteredArray.map(function (item) {
      return <Article onEditNews={onEditNews} onDeleteNews={onDeleteNews} onCheckBox={onCheckBox} key={item.id} data={item} />
    })
    return todos
  }


  render() {
    const { data, onCheckBox, onDeleteNews, onEditNews, onActiveTab, onDeleteAllNews, onActiveMode, onCompletedMode } = this.props
    const counter = data.filter(elem => elem.status === false)
    const complete = data.filter(elem => elem.status === true)
    return (
      <div className="list">
        {this.renderNews(onCheckBox, onDeleteNews, onEditNews, onActiveTab, onDeleteAllNews, onActiveMode, onCompletedMode)}
        {
          data.length ?

            <div className="list__nav">
              <div className="nav__left">
                <p>{counter.length} items left</p>
              </div>
              <div className="nav__tab">
                <button name='all' onClick={this.buttonModeAll}>All</button>
                <button name='active' onClick={this.buttonModeActive}>Active</button>
                <button name='completed' onClick={this.buttonModeCompleted}>Completed</button>
              </div>
              <div className="nav__right">
                {
                complete.length ? 
                <button onClick={this.buttonDelete}>Clear Completed</button> 
                : null}
              </div>
            </div>
            : null}
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired // PropTypes (с большой буквы) = библиотека prop-types
}

export { News }