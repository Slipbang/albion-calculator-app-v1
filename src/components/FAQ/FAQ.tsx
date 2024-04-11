import styles from './FAQ.module.scss'

const FAQ = () => {
    
    return (
        <div className={styles.FAQStyles}>
            <p>Данный сайт не является коммерческим, разрабатывался в качестве обучающего пет проекта Front-end девелопера!
                Разработчик - <a href="https://github.com/Slipbang" target='_blank'> Slipbang</a>.</p>

            <br/>

            <p>Вся загружаемые цены берутся с баз данных сайта<a href="https://albion-profit-calculator.com" target='_blank'>https://albion-profit-calculator.com</a>!</p>

            <br/>

            <p>По вопросам можно обратиться в <a href="https://discordapp.com/users/150513063311835136" target='_blank'> discord</a>.</p>
        </div>
    )
}

export default FAQ;