import React, { } from 'react';
import axios from 'axios';
import { Add } from './components/Add'
import { List } from './components/List'
import { Footer } from './components/Footer';
import newToDo from './data/newToDo'
import './App.css';


class App extends React.Component {
  state = {
    toDo: newToDo,
    mode: 'all',
    isAllChecked: false,
  }

  componentDidMount() {
    axios.get(`http://localhost:1234/products/all`)
      .then(res => {
        console.log('RESPONSE', res)
        this.setState({ toDo: res.data });
      }).catch(err => console.log('ERR', err))
  }

  handleDeleteAllToDo = () => {

    axios.delete(`http://localhost:1234/products/deleteAll/all`)
      .then(res => {
        const newToDo = this.state.toDo.filter(elem => elem.status !== true);
        this.setState({ toDo: newToDo });
      }).catch(err => console.log('ERR', err))
  }

  handleMode = (e) => {
    this.setState({ mode: e })
  }

  handleAddToDo = (data) => {
    axios.post(`http://localhost:1234/products/create`, { ...data })
      .then(res => {
        const newToDo = [res.data, ...this.state.toDo];
        this.setState({ toDo: newToDo });
      }).catch(err => console.log('ERR', err))
  }

  handleDeleteToDo = (id) => {
    axios.delete(`http://localhost:1234/products/delete/${id}`)
      .then(res => {
        const newToDo = this.state.toDo.filter((item) => item._id !== id);
        this.setState({ toDo: newToDo });
      }).catch(err => console.log('ERR', err))
  }

  handleEditToDo = (id, currentText) => {
    axios.put(`http://localhost:1234/products/modify/${id}`, { "text": currentText })
      .then(res => {
        const newToDo = this.state.toDo.map(item => {
          if (id === item._id) return { ...item, text: currentText }
          return item
        })
        console.log("RESPON", currentText)
        this.setState({ toDo: newToDo })
      })
  }

  handleCheckToDo = (id, status) => {
    console.log("STATUS", status)
    axios.put(`http://localhost:1234/products/update/${id}`, { "status": status })
      .then(res => {
        console.log('RES', res)
        const newToDo = this.state.toDo.map(item => {
          if (id === item._id) return { ...item, status: !item.status }
          return item
        })
        this.setState({ toDo: newToDo }, () => {
          this.setState({ isAllChecked: this.state.toDo.every(elem => elem.status) })
        })
      })
  }

  handleAllCheckToDo = () => {
    this.setState({ isAllChecked: !this.state.isAllChecked }, () => {
      this.setState({ todo: this.state.toDo.map(item => item.status = this.state.isAllChecked) })
    })
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
