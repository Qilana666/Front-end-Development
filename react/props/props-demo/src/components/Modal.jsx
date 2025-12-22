function Modal(props) {
  // console.log(props)
  const {
    HeaderComponent,
    FooterComponent,
    children
  } = props
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <HeaderComponent />
        <div style={styles.content}>
        {
          //组件的中间部分，提升组件的定制性
          //如果要提供定制能力
          children
        }
        </div>
        <FooterComponent/>
      </div>
    </div>
  )
}
//css in js
const styles = {
  overlay: {
    backgroundColor: 'rgba(41, 96, 249, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    width: '400px'
  },
  content: {
    margin: '1rem 0'
  }
}
export default Modal