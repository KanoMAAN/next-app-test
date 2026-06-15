"use client";

import { useFetch } from "@/src/hooks/useFetch";
import styled from "@emotion/styled";
import { SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE } from "next/dist/next-devtools/userspace/app/segment-explorer-node";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useEffect } from "react";
import { useState } from "storybook/internal/preview-api";

const ErrorText = styled.p`
  color: #ef4444;
`;

const RefetchButton = styled.button`
  margin-bottom: 16px;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
`;

const PostListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
`;

const PostTitle = styled.h3`
  font-weight: bold;
`;

const PostBody = styled.p`
  color: #4b5563;
  margin-top: 8px;
`;

type Post = {
  id: number;
  email: string;
  name: string;
};

export const PostList = () => {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>読み込み中...</p>;
  if (error) return (
    <div>
      <ErrorText>エラー: {error}</ErrorText>
      <button onClick={refetch}>再試行</button>
    </div>
  );
  if (!posts) return null;

  return (
    <div>
      <RefetchButton onClick={refetch}>更新</RefetchButton>
      <PostListContainer>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <p>{post.name}</p>
          </PostItem>
        ))}
      </PostListContainer>
    </div>
  );
};

export const UsersView = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`,
          { signal: contoroller.signal }
        );
        
        if(!response.ok) {
          throw new Error(`HTTP${response.status} ${response.statusText}`);
        }

        const json: Post[] = await response.json();
        setPosts(json);
      } catch (e) {
        if((e as any)?.name === "Aborterror") return;
        setError(e instanceof Error ? e.message : String(e));
        
      } finally {
        setLoading(false);
      }
    }
     fetchPosts();

  return () => TaskController.abort();
  },[userID]);
}

if(Error) return <p style={{ color: "#ef4444" }}>エラー: {error}</p>;

export default PostList

function fetchPosts() {
  throw new Error("Function not implemented.");
}
