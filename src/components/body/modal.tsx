import React from 'react'

const Modal = ({ opened, onClose }: { opened: boolean, onClose: (val: boolean) => void }) => {
    if (opened) {
        return (
            <div className='fixed top-0 left-0 w-full h-full z-50 bg-black opacity-50'>

            </div>
        )
    }
}

export default Modal