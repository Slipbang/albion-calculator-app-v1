import TransportationForm from "./TransportationForm/TransportationForm";
import TransportationTable from "./TransportationList/TransportationTable";
import styles from './Transportation.module.scss';

const Transportation = () => {

    return (
        <div className={styles.wrapper}>
            <TransportationForm />
            <TransportationTable />
        </div>
    )
}

export default Transportation;