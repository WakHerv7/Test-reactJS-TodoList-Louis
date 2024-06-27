import CButton from '../../shared/CButton/CButton';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  
  return (
    <div className={`rounded-2xl shadow-lg ${styles.sidebar_container}`}>
      <CButton title="Add Task" icon={'add'} />
      <ul className={styles.navlist}>
        <li>
          <span className={`material-icons-outlined`}>
            people
          </span>
          <span>All</span>
        </li>
        <li>
          <span className={`material-icons-outlined`}>
            label_important
          </span>
          <span>Priority</span>
        </li>
      </ul>
      <div className={styles.labels_section}>
        <p>Labels</p>
        <ul>
          <li>
            <span className={`material-icons-outlined ${styles.icon_1}`}>
              label
            </span>
            <span>HTML</span>
          </li>
          <li>
            <span className={`material-icons-outlined ${styles.icon_2}`}>
              label
            </span>
            <span>CSS</span>
          </li>
          <li>
            <span className={`material-icons-outlined ${styles.icon_3}`}>
              label
            </span>
            <span>NODE JS</span>
          </li>
          <li>
            <span className={`material-icons-outlined ${styles.icon_4}`}>
              label
            </span>
            <span>JQUERY</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
