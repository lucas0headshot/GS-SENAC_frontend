import styles from './footer.module.css';

export default function Footer() {
    return (
        <>
            <footer className={styles.rodape}>
                <p>© Portal GS {new Date().getFullYear()}.</p>
            </footer>
        </>
    )
}