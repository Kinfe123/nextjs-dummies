
import Image from 'next/image'
import styles from "../../styles/Slug.module.css"
import {GraphQLClient , gql} from "graphql-request"

import moment from "moment"
const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl98qjaqj1z6c01ue4arb2j33/master"
  
)
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      dataPublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
{
    posts {
        slug
    }
}

`
export const getStaticPaths = async () => {
    const {posts} = await graphcms.request(SLUGLIST)
    const paths = posts.map((post)=>{
        return {
            params: {slug: post.slug}
        }
    })
   return {
       paths,
       fallback:false
   }
}

export const getStaticProps = async(context) => {
    console.log(context)
    const slug = context.params.slug
     const data = await graphcms.request(QUERY , {slug})
     const post = data.post
  return {
    props: {
      post,
    },
    revalidate: 10,
    
  }
}
const BlogPost = (props) => {
    const {post} = props
    return (
        <main className={styles.blog}>
      <img
        className={styles.cover}
        src={post.coverPhoto.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <img src={post.author.avatar.url} alt={post.author.name} />
          <div className={styles.authtext}>
            <h6>By {post.author.name} </h6>
            <h6 className={styles.date}>
              {moment(post.datePublished).format("MMMM d, YYYY")}
            </h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
    )
}
export default BlogPost