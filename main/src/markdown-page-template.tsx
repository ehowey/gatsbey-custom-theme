import React from 'react';
import { graphql } from 'gatsby';
import Img from "gatsby-image"

export default function MarkdownPageTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid

  return (
    <div className='blog-post-container'>
      <div className='blog-post'>
        <h1>{frontmatter.title} </h1>
        <h2> {frontmatter.date} </h2>
        <Img fluid={featuredImgFluid} />
        <div className='blog-post-content' dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;