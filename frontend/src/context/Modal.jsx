import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';

import './Modal.css';

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const modalRef = useRef(null);
    const [modalNode, setModalNode] = useState(null);

    // sets modal node state to actual DOM element after initial render
    useEffect(() => {
        setModalNode(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={modalNode}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>

    );
};

// modal component that renders children inside of a portal and closes when the background is clicked
export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext);

    if (!modalNode) return null;

    return createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">{children}</div>
        </div>,
        modalNode
    );
};
