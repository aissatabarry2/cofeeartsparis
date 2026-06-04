import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2c1810 50%, #3d2314 100%)',
        color: '#fff', textAlign: 'center', padding: '6rem 2rem', minHeight: '70vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', color: '#d4a96a', marginBottom: '1rem', fontWeight: '300', letterSpacing: '2px' }}>
          ☕ Coffee Art Paris
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#ccc', maxWidth: '600px', lineHeight: '1.8', marginBottom: '2.5rem' }}>
          Un espace hybride autour du café de spécialité, de la céramique et des ateliers créatifs au cœur de Paris.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/boutique" style={{ background: '#d4a96a', color: '#1a0f0a', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem' }}>
            Découvrir la boutique
          </Link>
          <Link to="/ateliers" style={{ background: 'transparent', color: '#d4a96a', border: '2px solid #d4a96a', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem' }}>
            Voir les ateliers
          </Link>
        </div>
      </div>

      {/* Cards section */}
      <div style={{ padding: '4rem 2rem', background: '#faf9f7' }}>
        <h2 style={{ textAlign: 'center', color: '#2c1810', marginBottom: '3rem', fontSize: '2rem', fontWeight: '300' }}>
          Nos univers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { emoji: '☕', title: 'Café de Spécialité', desc: 'Des grains soigneusement sélectionnés du monde entier', link: '/boutique' },
            { emoji: '🏺', title: 'Céramique Artisanale', desc: 'Des pièces uniques façonnées à la main dans notre atelier', link: '/boutique' },
            { emoji: '🎨', title: 'Ateliers Créatifs', desc: 'Apprenez le latte art, le tournage, la dégustation', link: '/ateliers' },
          ].map(card => (
            <Link to={card.link} key={card.title} style={{
              background: '#fff', borderRadius: '16px', padding: '2.5rem',
              textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s', color: 'inherit', display: 'block'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{card.emoji}</div>
              <h3 style={{ color: '#2c1810', marginBottom: '0.8rem' }}>{card.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.95rem' }}>{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}