import React from 'react';
import './Content.scss';
import { ReactElements } from '../../utils/types';

interface Props{
    children: ReactElements;
    useFooter: boolean;
}
const prefixCls = 'kai-content-app';

export const WrapperContent = (props: Props) => {
    return <div className={"content " + props.useFooter? prefixCls: ''}>
        {props.children}
    </div>
}
export default WrapperContent;