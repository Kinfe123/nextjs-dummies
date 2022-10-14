import styles from "../styles/BlogCard.module.css"
import Link from "next/link"
const BlogCard = (props) => {
    const {title , author , key , publishedAt , coverPhoto , slug , dataPublished}  = props
    return (
        <div className={styles.card}>
            <Link href={"/posts/" + slug}>
            <div>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} />
                    
                </div>
            </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <div className={styles.detail}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} />
                        <h3>{author.name}</h3>
                    </div>
                    <div className={styles.date}>
                        <h3>{dataPublished}</h3>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default BlogCard