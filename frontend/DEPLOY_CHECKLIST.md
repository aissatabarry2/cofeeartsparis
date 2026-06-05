# 📋 Checklist Déploiement Vercel - Frontend CoffeeArt

## ✅ Modifications effectuées
- [x] Création de `vercel.json` pour gérer le routage client-side
- [x] Création de `.env.production` pour les variables de production
- [x] Vérification du `.gitignore` (build/ déjà inclus)

## 🚀 Avant le déploiement sur Vercel

### Étape 1: Vérifier le backend
**CRITIQUE**: Assurez-vous que votre backend est déployé sur Vercel et accessible
- [ ] URL du backend: `https://coffeeart-backend.vercel.app/api`
- [ ] Testez les endpoints en accès direct

### Étape 2: Configurer les variables d'environnement dans Vercel
1. Allez sur votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez:
   ```
   REACT_APP_API_URL = https://coffeeart-backend.vercel.app/api
   REACT_APP_CLOUDINARY_CLOUD = dx4frr3ak
   REACT_APP_CLOUDINARY_PRESET = coffeeart
   ```

### Étape 3: Points importants
- [ ] **CORS sur backend**: Assurez-vous que l'URL Vercel frontend est autorisée dans CORS du backend
- [ ] **Certificat SSL**: Vercel fournit HTTPS automatiquement
- [ ] **Cloudinary**: Les uploads fonctionnent avec vos clés (vérifiez les permissions)

### Étape 4: Build local
```bash
npm run build
```
Vérifiez qu'il n'y a pas d'erreurs et que le dossier `build/` est créé.

### Étape 5: Commandes pour le déploiement
```bash
# Si ce n'est pas fait
npm install -g vercel

# Déployer
vercel
```

## 🔧 Fichiers configurés

### vercel.json
- Définit le répertoire de sortie du build
- Configure le routage pour le client-side routing React

### .env.production
- URL API pour la production
- Clés Cloudinary publiques (OK d'être exposées)

## ⚠️ Choses à vérifier

1. **Backend**: Votre backend doit être déployé et fonctionnel
2. **CORS**: Le backend doit accepter les requêtes du domaine Vercel
3. **Env variables**: Vérifiez que REACT_APP_API_URL pointe vers le bon backend
4. **Build errors**: Aucune erreur ESLint ni de build

## 📝 Commandes utiles
```bash
# Développement local
npm start

# Construire pour production
npm run build

# Servir le build localement (pour tester)
npx serve -s build
```

## ✨ Statut actuel
**Prêt à 90%** - Il manque juste la confirmation que le backend est déployé.
