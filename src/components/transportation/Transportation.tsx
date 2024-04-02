import TransportationForm from "./TransportationForm/TransportationForm";
import TransportationList from "./TransportationList/TransportationList";
import styles from './Transportation.module.scss';

const Transportation = () => {

    return <div className={styles.wrapper}>
        <TransportationForm />
        <TransportationList />
    </div>
}

export default Transportation;