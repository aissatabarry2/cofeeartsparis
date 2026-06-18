import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const API = process.env.REACT_APP_API_URL;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

/* ══════════════════════════════════
   PAGE ARTICLE — /blog/:id
══════════════════════════════════ */
export function BlogArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blogs/${id}`)
      .then(r => setBlog(r.data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="blog-loading">Chargement...</div>;
  if (!blog)   return <div className="blog-loading">Article introuvable.</div>;

  return (
    <div className="blog-article-page">

      {/* Retour */}
      <button className="blog-back" onClick={() => navigate("/blog")}>
        ← Retour au blog
      </button>

      {/* Image */}
      {blog.image && (
        <div className="blog-article-img-wrap">
          <img src={blog.image} alt={blog.title} className="blog-article-img" />
        </div>
      )}

      {/* Contenu */}
      <div className="blog-article-body">
        <h1 className="blog-article-title">
          {blog.emoji && <span>{blog.emoji} </span>}
          {blog.title}
        </h1>
        <p className="blog-article-date">{formatDate(blog.createdAt)}</p>
        <div
          className="blog-article-content"
          dangerouslySetInnerHTML={
            blog.contentHtml
              ? { __html: blog.contentHtml }
              : undefined
          }
        >
          {!blog.contentHtml && blog.content}
        </div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════
   PAGE LISTE — /blog
══════════════════════════════════ */
export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/blogs`)
      .then(r => setBlogs(r.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-page">

      {/* Hero */}
      <div className="blog-hero">
        <h1 className="blog-hero-title">Le <em>blog</em></h1>
        <p className="blog-hero-sub">
          Réflexions, inspirations et savoir-faire autour de la céramique,<br />
          du café et de l'art de vivre.
        </p>
      </div>

      {/* Grid */}
      <div className="blog-container">
        {loading ? (
          <div className="blog-loading">Chargement des articles...</div>
        ) : blogs.length === 0 ? (
          <div className="blog-empty">Aucun article publié pour le moment.</div>
        ) : (
          <div className="blog-grid">
            {blogs.map(blog => (
              <article className="blog-card" key={blog._id}>

                {/* Image cliquable */}
                <div
                  className="blog-card-img-wrap"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  {blog.image
                    ? <img src={blog.image} alt={blog.title} className="blog-card-img" />
                    : <div className="blog-card-placeholder"><span>☕</span></div>
                  }
                </div>

                {/* Body */}
                <div className="blog-card-body">
                  <span className="blog-card-date">
                    {formatDate(blog.createdAt)}
                  </span>
                  <h2
                    className="blog-card-title"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    {blog.emoji && <span className="blog-card-emoji">{blog.emoji} </span>}
                    {blog.title}
                  </h2>
                  <p className="blog-card-excerpt">
                    {blog.excerpt || blog.content?.slice(0, 200)}...
                  </p>

                  {/* Séparateur + lien */}
                  <div className="blog-card-sep" />
                  <button
                    className="blog-card-read"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    LIRE
                  </button>
                </div>

              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}