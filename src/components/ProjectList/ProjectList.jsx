import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./ProjectList.scss";
import FigmaIcon from "../../icons/Figma";
import GitHubIcon from "../../icons/GitHub";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function ProjectList(data) {
  return data.projects.map(({ node: project }) => (
    <article
      className="project"
      id={project.frontmatter.title}
      key={project.id}
    >
      <div className="project__thumbnail">
        <GatsbyImage
          style={{
            width: "100%",
          }}
          image={getImage(project.frontmatter.thumbnail)}
          alt="alt"
        />
      </div>

      <div className="project__details">
        <div className="project__header">
          <h3 className="project__header__title">
            {project.frontmatter.title}
          </h3>
          <p className="project__header__date">{project.frontmatter.date}</p>
        </div>

        <p className="project__about">{project.excerpt}</p>
        <ul className="project__stack">
          {project.frontmatter.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <ul className="project__links">
          {(function generateLinks() {
            const rawLinks = project.frontmatter.links;
            const links = JSON.parse(rawLinks.replace(/'/g, `"`));
            return links.map((link, id) => (
              <li key={id}>
                <a target="_blank" rel="noopener noreferrer" href={link[1]}>
                  <IconForLink link={link[0]} />
                  {link[0]}
                </a>
              </li>
            ));
          })()}
        </ul>
      </div>
    </article>
  ));
}

function IconForLink({ link }) {
  switch (link) {
    case "GitHub":
      return <GitHubIcon />;
    case "Figma":
      return <FigmaIcon />;
    default:
      return <ExternalLinkIcon />;
  }
}

export const query = graphql`
  fragment ProjectInfo on MdxEdge {
    node {
      id
      excerpt(pruneLength: 2000)
      frontmatter {
        title
        date(formatString: "MMMM YYYY", locale: "de")
        path
        stack
        links
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 560
              quality: 90
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`;
