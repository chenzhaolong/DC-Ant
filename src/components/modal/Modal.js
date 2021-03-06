import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import "./modal.scss";
import {Confirm} from './confirm';
import {_renderComponent} from '../../../libs/tool';
import {FaIcon} from "../../components/fa-icon/Fa-Icon";

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _visible: false
        }
    }

    _closeModal(e) {
        this.setState({_visible: false})
    }

    _clickHandle(e) {
        const target = e.target;
        if (target.title == 'cancel') {
            this.props.onCancel();
        } else {
            this.props.onSure();
        }
    }

    _renderHeader(title) {
        return (
            <header className="dc-modal__header">
                <div>{title}</div>
                <div className="dc-modal__icon" onClick={this._closeModal.bind(this)}>
                    <FaIcon icon="times" color='#5e5e5e' fontSize='15px'/>
                </div>
            </header>
        )
    }

    _renderLoading() {
        return (
            <div>
                <span className="dc-modal_loading">
                    <FaIcon icon="spinner" color='#fff' fontSize='12px'/>
                </span>
                请等待
            </div>
        )
    }

    _renderModal() {
        const {content, title, children, text, musk = true} = this.props;
        const modalContent = children || content;
        return (
            <div>
                {musk ? <div className="dc-modal_musk"></div> : ''}
                <div className="dc-modal__content">
                    {
                        title ? this._renderHeader(title) : ''
                    }
                    <article className="dc-modal__body">
                        {modalContent}
                    </article>
                    <footer className="dc-modal__footer" onClick={this._clickHandle.bind(this)}>
                        <span className="dc-modal-btn" title="cancel">
                            {text && text.cancel ? text.cancel : '关闭'}
                            </span>
                        <span className="dc-modal-btn dc-modal_sure" title="sure">
                            {this.props.confirmLoading ? this._renderLoading() : (text && text.sure ? text.sure : '确定')}
                        </span>
                    </footer>
                </div>
            </div>
        )
    }

    componentWillReceiveProps(newProps) {
        this.setState({_visible: newProps.visible});
    }

    render() {
        const {_visible} = this.state;
        return (
            <div>
                {
                    _visible ? this._renderModal() : ''
                }
            </div>
        )
    }

    static confirm(spec) {
        _renderComponent("div", "confirm")(Confirm, spec);
    }
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    content: function (props, propName, componentName) {
        if (!props[propName]) {
            throw new Error(
                `content is require in ${componentName}`
            );
        }
    },
    onCancel: PropTypes.func.isRequired,
    onSure: PropTypes.func.isRequired,
}