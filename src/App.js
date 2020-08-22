import React from 'react';
import { transletterate, isCyrillic } from './healpers';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageLength: 0,
      displayText: 'latin',
      isTranslate: false
    };
    this.dataBase= [];
  }

  countOfMessages() {
    const { displayText, messageLength } = this.state;

    if (messageLength === 0) {
      return 1;
    }

    const limit = () => {
      if ((displayText === 'latin') && (messageLength <= 160)) {
        return 160;
      }
      if ((displayText === 'cyrillic') && (messageLength <= 70)) {
        return 70;
      }
      if ((displayText === 'latin') && (messageLength > 160)) {
        return 153;
      }
      if ((displayText === 'cyrillic') && (messageLength > 70)) {
        return 67;
      }
    }

    return Math.ceil(this.state.messageLength / limit());
  }

  onCheckboxChange = () => {

    const { displayText, message, isTranslate } = this.state;
    const transliterateMessage = () => {
      if (displayText === 'cyrillic') {
        const messageToLatin = message.split('').map(letter => transletterate(letter)).join('');

        return messageToLatin;
      }
    }
    
    this.setState({
      snapshot: message,
      message: transliterateMessage(),
      isTranslate: !isTranslate
    })

    if (this.state.isTranslate) {
      this.setState({
        message: this.state.snapshot,
        isTranslate: !this.state.isTranslate
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.message !== prevState.message) && 
    !this.state.message.split('').some( letter => isCyrillic(letter) )) {
      this.setState({ displayText: 'latin' })
    }
    if ((this.state.message !== prevState.message) && this.state.message.split('').some( letter => isCyrillic(letter) )) {
      this.setState({ displayText: 'cyrillic' })
    }
    console.log(this.state, this.state.message.split('').some( letter => isCyrillic(letter) ))
  }

  onChange = (e) => {
    this.setState({
      message: e.target.value,
      messageLength: e.target.value.length
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { message } = this.state;
    
    this.dataBase = [
      ...this.dataBase,
      {
        message, countOfMessages: this.countOfMessages()
      }
    ];

    this.setState({
      message: '',
      messageLength: 0
    })
    alert('Ваше сообщение сохранено')
    console.log(this.dataBase)
  }

  render() {

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <textarea onChange={this.onChange} 
          className="textarea"
          placeholder="Начните вводить ваше сообщение"
          value={this.state.message} />
        <div className="messages__info">
          {`Сообщений: ${this.countOfMessages()}. Символов использовано ${this.state.messageLength}.`}
        </div>
        <div className="message__translate">
          <input className="checkbox"
            type="checkbox"
            onChange={this.onCheckboxChange}
            />
          <span>транслитерировать</span>
          <input className="submit" type="submit" value="Отправить" />
        </div> 
      </form>
    );
  }
}

export default App;