import React from 'react';
import styles from './text.module.scss';
interface IText {
    value: string;
}
const Text = ({value}:IText): JSX.Element => {
    return (
    <div className={styles.text}>{value}</div>
    )
}
export default Text;