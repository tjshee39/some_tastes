import React from 'react';
import '../../css/button.css';

interface Props {
    children: React.ReactNode;
    type: 'button' | 'submit' | 'reset' | undefined;
    onClick: () => void;
}

const Button = (props: Props) => {
    console.log('button props', props);
    return (
        <button className={`button`} type={props.type || 'button'} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
