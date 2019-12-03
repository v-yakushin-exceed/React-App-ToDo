import React, { } from 'react';
import { Add } from './components/Add'
import { List } from './components/List'
// import { Footer } from './components/Footer' 
import newToDo from './data/newToDo'
import './App.css';
import { Footer } from './components/Footer';

class App extends React.Component {
  state = {
    toDo: newToDo,
    mode: 'all',
    isAllChecked: false
  }



  handleDeleteAllToDo = () => {
    const nextTodo = this.state.toDo.filter(elem => elem.status !== true);
    this.setState({ toDo: nextTodo })
  }


  // ONE FUCNTION INSTEAD OF 3
  handleMode = (e) => {
    this.setState({ mode: e })
  }

  handleAddToDo = (data) => {
    const newToDo = [data, ...this.state.toDo]
    this.setState({ toDo: newToDo })
  }

  handleDeleteToDo = (id) => {
    const newToDo = this.state.toDo.filter((item) => item.id !== id);
    this.setState({ toDo: newToDo })
  }

  handleEditToDo = (id) => {
    const text = prompt("edit", "")
    const newToDo = this.state.toDo.map(item => {
      if (id === item.id) return { ...item, text: text }
      return item
    })
    this.setState({ toDo: newToDo })
  }

  handleCheckToDo = (id) => {
    const newToDo = this.state.toDo.map(item => {
      if (id === item.id) return { ...item, status: !item.status }
      return item
    })
    this.setState({ toDo: newToDo }, () => {
      const allCheck = this.state.toDo.every(elem => elem.status)
      this.setState({ isAllChecked: allCheck })
    })
  }

  handleAllCheckToDo = () => {
    this.setState({ isAllChecked: !this.state.isAllChecked }, () => {
      const newToDo = this.state.toDo.map(item => item.status = this.state.isAllChecked)
      this.setState({ todo: newToDo })
    }
    )
  }


  render() {
    return (
      <div className="root__items">
        <h1>todos</h1>
        <Add
          isAllChecked={this.state.isAllChecked}
          data={this.state.toDo}
          onAddNews={this.handleAddToDo}
          onCheckAllBox={this.handleAllCheckToDo}
        />
        <List
          onCheckBox={this.handleCheckToDo}
          onDeleteToDo={this.handleDeleteToDo}
          onEditToDo={this.handleEditToDo}
          data={this.state.toDo}
          onActiveTab={this.activeCheck}
          mode={this.state.mode} />
        <Footer
          data={this.state.toDo}
          onDeleteAllToDo={this.handleDeleteAllToDo}
          onMode={this.handleMode}
        />
      </div>
    )
  }
}

export default App;
