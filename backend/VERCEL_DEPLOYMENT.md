# 🚀 Guide Déploiement Backend sur Vercel

## ✅ Statut : **95% PRÊT**

Le backend est maintenant prêt pour Vercel après la modification du server.js pour supporter le mode serverless.

## 📋 Avant de déployer

### Étape 1: Vérifier les variables d'environnement requises

Vous avez besoin de ces 3 variables dans **Vercel Dashboard**:

```
PORT=5000 (optionnel, déterminé par Vercel)
MONGO_URI=mongodb+srv://entreprenariat:entreprenariat@dbcmr.ndjctdd.mongodb.net/?appName=DBCMR
JWT_SECRET=9f3a2c8b5d7e4f1c0a9d3b6e8f2a7c4d1e5f9b0a3c7d8e2f6a1b9c4d7e3f2a9b
```

### Étape 2: Vérifier la connexion MongoDB

Assurez-vous que:
- [ ] MongoDB accepte les connexions depuis n'importe quelle IP (ou depuis les serveurs Vercel)
- [ ] Votre cluster MongoDB n'a pas de restrictions de whitelist

Si problème: Allez sur MongoDB Atlas → Network Access → Allow all IPs

### Étape 3: Frontend URL CORS

Mettez à jour les origins CORS dans `server.js` avec l'URL réelle de votre frontend Vercel.

## 🎯 Étapes de déploiement

### 1. Installer Vercel CLI
```bash
npm install -g vercel
```

### 2. Déployer le backend
```bash
cd backend
vercel
```

Vous serez invité à:
- Créer un projet ou utiliser un existant
- Choisir `./` comme racine du projet
- Configurer les variables d'environnement

### 3. Configurer les variables d'environnement dans Vercel
Via le dashboard Vercel ou la CLI:
```bash
vercel env add MONGO_URI
vercel env add JWT_SECRET
```

### 4. Redéployer après ajout des variables
```bash
vercel --prod
```

## ✨ Après déploiement

### Testez votre API
```bash
# Route de santé
curl https://your-backend.vercel.app/health

# Accueil
curl https://your-backend.vercel.app/
```

### Mettez à jour le frontend
1. Récupérez l'URL de déploiement (ex: `https://coffeeart-backend.vercel.app`)
2. Mettez à jour `.env.production` du frontend:
   ```
   REACT_APP_API_URL=https://coffeeart-backend.vercel.app/api
   ```
3. Mettez à jour CORS dans `server.js`
4. Redéployez le backend

## 🔧 Fichiers modifiés

- `server.js`: Exporté et compatible serverless
- `vercel.json`: Configuration de déploiement

## ⚠️ Dépannage courant

### Erreur: "Cannot find module"
→ Vérifiez que tous les require() pointent vers les bons chemins

### Erreur: "ECONNREFUSED MongoDB"
→ MongoDB URI ne fonctionne pas ou IP non whitelistée

### Erreur: "CORS error"
→ L'URL du frontend n'est pas dans la liste CORS de server.js

### API répond mais données vides
→ Vérifiez que les données existent dans MongoDB

## 💡 Tips

- Gardez vos secrets (JWT_SECRET) secrets - ne commitez pas le `.env`
- Testez localement avant de déployer: `npm start`
- Utilisez logs Vercel pour déboguer: `vercel logs`
- Gardez vos endpoints API privés/protégés côté backend

## ✅ Checklist finale

- [ ] Vercel CLI installée
- [ ] Variables d'environnement configurées dans Vercel
- [ ] MongoDB accessible depuis l'internet
- [ ] CORS configuré correctement
- [ ] Frontend URL mise à jour après déploiement backend
