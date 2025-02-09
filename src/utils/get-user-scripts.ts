import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import findByCommentMarker from './find-by-comment-marker'

const getUserScripts = (user: string) => {
  const scriptNames = readdirSync(
    path.join(process.cwd(), '/public/scripts/', user),
  )
  const scripts = scriptNames.map((file) => {
    const content = readFileSync(
      path.join(process.cwd(), '/public/scripts/', user, file),
      {encoding: 'utf8'},
    )

    const description = findByCommentMarker(content, 'Description:')
    const author = findByCommentMarker(content, 'Author:')
    const twitter = findByCommentMarker(content, 'Twitter:')
    const github = findByCommentMarker(content, 'GitHub:')

    const url = `/scripts/${user}/${file}`
    return {
      file,
      command: file.replace('.js', ''),
      content,
      url,
      description,
      author,
      twitter,
      github,
    }
  })

  return scripts
}

export default getUserScripts
