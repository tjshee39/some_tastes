import React from 'react';
import ReactDom from 'react-dom';
import '../../css/modal.css';
import Card from './Card';
import Button from './Button';

interface ModalInfo {
    title: string;
    message: string;
    onConfirm: () => void;
}

// modal 분리
const Backdrop = () => {
    return <div className="backdrop"/>;
};

const ModalOverLay = (props: ModalInfo) => {
    return (
        <Card className="modal">
            <header className="modal-title">
                <p>{props.title}</p>
            </header>
            <div className="content">
                <p>{props.message}</p>
            </div>
            <footer className="actions">
                <Button type="button" onClick={props.onConfirm}>
                    확인
                </Button>
            </footer>
        </Card>
    );
};

const Modal = (props: ModalInfo) => {
    const modalRoot = document.getElementById('backdrop-root') as HTMLElement;
    const overlayRoot = document.getElementById('overlay-root') as HTMLElement;

    return (
        <>
            {ReactDom.createPortal(
                <Backdrop/>,
                modalRoot,
            )}
            {ReactDom.createPortal(
                <ModalOverLay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                overlayRoot,
            )}
        </>
    );
};

export default Modal;
