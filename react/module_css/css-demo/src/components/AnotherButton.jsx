import styles from './AnotherButton.module.css'
console.log(styles)


export default function AnotherButton() {
  return <button className={styles.button}>My Another Button</button>
}