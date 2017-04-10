import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    return (
      <div>
        <div className='modal'>
          <div className='close-button-box'>
            <div></div>
            <button className='close' onClick={this.close}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          {this.props.children}
        </div>
        <div className= 'backdrop' onClick={this.close} />
      </div>
    );
  }

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default Modal;
