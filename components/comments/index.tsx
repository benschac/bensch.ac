import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'
import { PostFrontMatter } from 'types/PostFrontMatter'

interface Props {
  frontMatter: PostFrontMatter
}

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/comments/Utterances')
  },
  { ssr: false }
)
const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)
const DisqusComponent = dynamic(
  () => {
    return import('@/components/comments/Disqus')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }: Props) => {
  let term
  let commentComponent
  const { comment } = siteMetadata
  switch (
    (comment.giscusConfig.mapping as 'pathname' | 'url' | 'title') ||
    (comment.utterancesConfig.issueTerm as 'pathname' | 'url' | 'title')
  ) {
    case 'pathname':
      term = frontMatter.slug
      break
    case 'url':
      term = window.location.href
      break
    case 'title':
      term = frontMatter.title
      break
  }

  switch (comment.provider as 'giscus' | 'utterances' | 'disqus') {
    case 'giscus':
      commentComponent = <GiscusComponent mapping={term} />
      break
    case 'utterances':
      commentComponent = <UtterancesComponent issueTerm={term} />
      break
    case 'disqus':
      commentComponent = <DisqusComponent frontMatter={frontMatter} />
      break
    default:
      commentComponent = <></>
  }

  return <div id="comment">{commentComponent}</div>
}

export default Comments
