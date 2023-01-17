import React from 'react';
import s from "./Wrapper.module.scss"

interface Props {
    children?: React.ReactNode;
    [x:string]: any,
}
const Wrapper:React.FC<Props> = ({children, ...rest}) => {
    return (
        <div className={s.wrapper} {...rest}>
            {children}
        </div>
    );
};

export default Wrapper;