import React, { } from 'react';
import { Add } from './components/Add' // ./ = текущая директория,
import { News } from './components/News' // далее мы идем в директорию components и в нужный компонент
import newsData from './data/newsData' // импорт по дефолту
import './App.css';

class App extends React.Component {
  state = {
    news: newsData,
    mode: 'all',
  }

  handleDeleteAllNews = () => {
    const nextNews = this.state.news.filter(elem => elem.status !== true);
    this.setState({ news: nextNews })
  }

  handleModeAllNews = (e) => {
    this.setState({ mode: e})
  }

  handleModeActiveNews = (e) => {
    this.setState({ mode: e })
  }

  handleModeCompletedNews = (e) => {
    this.setState({ mode: e })
  }

  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }

  handleDeleteNews = (id) => {
    const nextNews = this.state.news.filter((item) => item.id !== id);
    this.setState({ news: nextNews })
  }

  handleEditNews = (id) => {
    const text = prompt("edit", "")
    const newText = this.state.news.map(item => {
      if (id === item.id) return { ...item, text: text }
      return item
    })
    this.setState({ news: newText })
  }

  handleCheckNews = (id) => {
    const nextNews = this.state.news.map(item => {
      if (id === item.id) return { ...item, status: !item.status }
      return item
    })
    this.setState({ news: nextNews })
  }


  render() {
    console.log('NEWS', this.state.news)
    return (
      <div className="root__items">
        <h1>todos</h1>
        <Add
          onAddNews={this.handleAddNews}

        />
        <News
          onCheckBox={this.handleCheckNews}
          onDeleteNews={this.handleDeleteNews}
          onEditNews={this.handleEditNews}
          data={this.state.news}
          onActiveTab={this.activeCheck}
          mode={this.state.mode}
          onDeleteAllNews={this.handleDeleteAllNews}
          onActiveMode={this.handleModeActiveNews}
          onCompletedMode={this.handleModeCompletedNews}
          onAllMode={this.handleModeAllNews} />
      </div>
    )
  }
}

export default App;
