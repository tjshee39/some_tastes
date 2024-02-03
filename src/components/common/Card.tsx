import React from 'react';
import { ReactNode } from 'react';
import '../../css/card.css';

interface Props {
    children: ReactNode;
    className: string;
}

const Card = (props: Props) => {
    return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
