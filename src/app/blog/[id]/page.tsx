import BlogPostDetail from './BlogPostDetail';
import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';


interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
