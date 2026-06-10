import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = data.slug ?? fileName.replace('.md', '');
    return {
      slug,
      data,
      content
    };
  });
}

export async function getPostContent(slug: string) {
	const posts = getPosts();
	const post = posts.find(p => p.slug === slug);
	if(!post){
		throw new Error(`Post not found for slug: ${slug}`);
	}
	const contentHtml = (await remark().use(html).process(post.content)).toString();
	return { data: post.data, contentHtml };
}

 // const fullPath = path.join(postsDirectory, slug + '.md');
 // const fileContents = fs.readFileSync(fullPath, 'utf8');
 // const { data, content } = matter(fileContents);
 // const contentHtml = (await remark().use(html).process(content)).toString();
 // return { data, contentHtml };
//}
