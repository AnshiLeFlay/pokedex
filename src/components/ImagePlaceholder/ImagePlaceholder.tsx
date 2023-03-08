import React from "react";

import styles from './imageplaceholder.module.css';

const ImagePlaceholder: React.FC = () => {
    return (
        <div className={styles.placeholder}>
            <p>Avatar</p>
            <p>NOT FOUND</p>
        </div>
    )
}

export default ImagePlaceholder;