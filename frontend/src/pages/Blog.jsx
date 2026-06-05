import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const API = process.env.REACT_APP_API_URL;

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric", month: "long", year: "numeric"
    }).toUpperCase();
  };

  return (
    <div className="blog-page">

      {/* ── HERO ── */}
      <div className="blog-hero">
        <h1 className="blog-hero-title">Le <em>blog</em></h1>
        <p className="blog-hero-sub">
          Réflexions, inspirations et savoir-faire autour de la céramique,<br />
          du café et de l'art de vivre.
        </p>
      </div>

      {/* ── GRID ── */}
      <div className="blog-container">
        {loading ? (
          <div className="blog-loading">Chargement des articles...</div>
        ) : blogs.length === 0 ? (
          <div className="blog-empty">Aucun article publié pour le moment.</div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog._id}>
                {/* Image */}
                <div className="blog-card-img-wrap">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="blog-card-img" />
                  ) : (
                    <div className="blog-card-placeholder">
                      <span>☕</span>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="blog-card-body">
                  <span className="blog-card-date">{formatDate(blog.createdAt)}</span>
                  <h2 className="blog-card-title">
                    {blog.emoji && <span className="blog-card-emoji">{blog.emoji} </span>}
                    {blog.title}
                  </h2>
                  <p className="blog-card-excerpt">
                    {blog.excerpt || blog.content?.slice(0, 180)}...
                  </p>
                  <Link to={`/blog/${blog._id}`} className="blog-card-link">
                    Lire la suite →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}