import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function PrivacyPolicy() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-logo">
          <img src={logo} alt="Anasheed Player" />
        </div>
        <Link to="/" className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Retour
        </Link>
      </header>

      <main className="privacy-page">
        <div className="privacy-content glass">
          <h1>Politique de confidentialité</h1>
          <p className="last-updated">Dernière mise à jour : 1er décembre 2025</p>

          <section>
            <h2>1. Collecte des données</h2>
            <p>
              Anasheed Player est une application de lecture de musique locale. Nous ne collectons, 
              ne stockons et ne partageons aucune donnée personnelle identifiable de nos utilisateurs.
            </p>
          </section>

          <section>
            <h2>2. Données locales</h2>
            <p>
              Toutes vos préférences (mode sombre, volume, playlist) sont stockées localement sur 
              votre appareil. Ces données ne quittent jamais votre téléphone.
            </p>
          </section>

          <section>
            <h2>3. Autorisations</h2>
            <p>L'application demande les autorisations suivantes :</p>
            <ul>
              <li><strong>Stockage</strong> : Pour lire les fichiers audio sur votre appareil</li>
              <li><strong>Notifications</strong> : Pour afficher les contrôles de lecture</li>
              <li><strong>Lecture en arrière-plan</strong> : Pour continuer la musique quand l'app est fermée</li>
            </ul>
          </section>

          <section>
            <h2>4. Fichiers audio</h2>
            <p>
              Les fichiers audio que vous écoutez restent sur votre appareil. Nous n'avons pas 
              accès à vos fichiers, ni ne les téléchargeons ou partageons.
            </p>
          </section>

          <section>
            <h2>5. Analyses et publicité</h2>
            <p>
              Anasheed Player ne contient aucun tracker, aucune publicité, et aucun outil d'analyse. 
              Votre utilisation de l'application reste entièrement privée.
            </p>
          </section>

          <section>
            <h2>6. Mises à jour</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité occasionnellement. 
              Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
            </p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, vous pouvez nous 
              contacter via la page du Play Store.
            </p>
          </section>

          <div className="privacy-footer">
            <p>
              En utilisant Anasheed Player, vous acceptez cette politique de confidentialité. 
              Cette application respecte votre vie privée et ne collecte aucune donnée.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
