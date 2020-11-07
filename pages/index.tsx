import React from 'react'
import styles from '../app.module.scss'
import Text from '../components/Text'
export default function Page() {
  return (
    <div className={styles.index}>
      <div className={styles.indexHello}>NEXT STARTER</div>
      <Text value="Hello World"/>
    </div>
  )
}
