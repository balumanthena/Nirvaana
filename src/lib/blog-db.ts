import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    serverTimestamp,
    onSnapshot,
    increment
} from "firebase/firestore";
import { db } from "./firebase";

const calculateReadingTime = (content: string): number => {
    try {
        // Check if it's Editor.js JSON
        const parsed = JSON.parse(content);
        if (parsed.blocks && Array.isArray(parsed.blocks)) {
            let text = "";
            parsed.blocks.forEach((block: any) => {
                if (block.data && block.data.text) text += block.data.text + " ";
                if (block.data && block.data.items) text += block.data.items.join(" ") + " ";
                if (block.data && block.data.content) {
                    // Table data
                    if (Array.isArray(block.data.content)) {
                        block.data.content.forEach((row: any) => {
                            if (Array.isArray(row)) text += row.join(" ") + " ";
                        });
                    }
                }
            });
            return Math.ceil(text.split(/\s+/).length / 200) || 1;
        }
    } catch (e) {
        // Fallback to HTML/Text parsing
    }

    // Strip HTML tags for accurate word count
    const stripped = content.replace(/<[^>]*>?/gm, '');
    const words = stripped.trim().split(/\s+/).length;
    return Math.ceil(words / 200) || 1;
};

export interface BlogFAQ {
    question: string;
    answer: string;
}

export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string;
    tags: string[];
    author: string;
    readingTime: number;
    views: number;
    status: 'draft' | 'published';
    createdAt: Timestamp;
    publishedAt: Timestamp | null;
    seoTitle: string;
    metaDescription: string;
    featured: boolean;
    faqs: BlogFAQ[];
    // Topical Authority Engine Fields
    isPillar?: boolean;
    pillarSlug?: string;
}

const BLOGS_COLLECTION = "blogs";

export const createBlog = async (blog: Omit<BlogPost, 'id' | 'createdAt' | 'publishedAt'>) => {
    const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
        ...blog,
        createdAt: serverTimestamp(),
        publishedAt: blog.status === 'published' ? serverTimestamp() : null,
        views: 0,
        readingTime: calculateReadingTime(blog.content)
    });
    return docRef.id;
};

export const updateBlog = async (id: string, blog: Partial<BlogPost>) => {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const updates: any = { ...blog };
    if (blog.status === 'published' && !blog.publishedAt) {
        updates.publishedAt = serverTimestamp();
    }
    if (blog.content) {
        updates.readingTime = calculateReadingTime(blog.content);
    }
    await updateDoc(docRef, updates);
};

export const deleteBlog = async (id: string) => {
    await deleteDoc(doc(db, BLOGS_COLLECTION, id));
};

export const incrementViews = async (id: string) => {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await updateDoc(docRef, {
        views: increment(1)
    });
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
    const q = query(collection(db, BLOGS_COLLECTION), where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as BlogPost;
    }
    return null;
};

export const getBlogById = async (id: string): Promise<BlogPost | null> => {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    return null;
};

export const getRelatedBlogs = async (category: string, currentId: string, tags: string[] = []): Promise<BlogPost[]> => {
    const q = query(
        collection(db, BLOGS_COLLECTION),
        where("status", "==", "published"),
        where("category", "==", category),
        limit(10)
    );
    const querySnapshot = await getDocs(q);
    const blogs = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
        .filter(blog => blog.id !== currentId);

    // Score by tags if available
    if (tags.length > 0) {
        blogs.sort((a, b) => {
            const aMatch = (a.tags || []).filter(t => tags.includes(t)).length;
            const bMatch = (b.tags || []).filter(t => tags.includes(t)).length;
            return bMatch - aMatch;
        });
    }

    return blogs.slice(0, 3);
};

export const getClusterBlogs = async (pillarSlug: string): Promise<BlogPost[]> => {
    const q = query(
        collection(db, BLOGS_COLLECTION),
        where("status", "==", "published"),
        where("pillarSlug", "==", pillarSlug),
        orderBy("publishedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
};

export const getAllBlogs = async (onlyPublished = true) => {
    let q;
    if (onlyPublished) {
        q = query(
            collection(db, BLOGS_COLLECTION),
            where("status", "==", "published"),
            orderBy("publishedAt", "desc")
        );
    } else {
        q = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
};

export const subscribeToBlogs = (callback: (blogs: BlogPost[]) => void, onlyPublished = true, errorCallback?: (error: any) => void) => {
    let q;
    if (onlyPublished) {
        q = query(
            collection(db, BLOGS_COLLECTION),
            where("status", "==", "published"),
            orderBy("publishedAt", "desc")
        );
    } else {
        q = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
    }

    return onSnapshot(q, (snapshot) => {
        const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        callback(blogs);
    }, (error) => {
        console.error("Firestore Subscription Error:", error);
        if (errorCallback) errorCallback(error);
    });
};
