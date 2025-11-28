// ═══════════════════════════════════════════════════════════════════════════
// 🎓 TP MongoDB - R5.Real.10 - BUT3 Informatique
// 📝 Nom : Foucher  Prénom : Mathias
// 📅 Date : 28/11  Groupe : A1
// ═══════════════════════════════════════════════════════════════════════════

// ⚙️ CONFIGURATION - Remplacez par le nom de votre base de données
use('premiere_base');  // Exemple: use('tp_mongodb_alice_martin')

// ═══════════════════════════════════════════════════════════════════════════
// 🔨 PHASE 3 : PREMIÈRES MANIPULATIONS MONGODB
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 3.1 : Concepts fondamentaux (5 min)
// ─────────────────────────────────────────────────────────────────────────

// Pas d'exercices à rendre - Section de découverte


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 3.2 : Insertion progressive de documents (10 min)
// ─────────────────────────────────────────────────────────────────────────

// Pas d'exercices à rendre - Section de démonstration


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 3.3 : Requêtes basiques (5 min)
// ─────────────────────────────────────────────────────────────────────────

// Base de travail plus riche
db.employes.drop()  // Nettoyer si existe


db.employes.insertMany([
    {nom: "Martin", prenom: "Alice", age: 28, service: "IT", salaire: 3500},
    {nom: "Dubois", prenom: "Bob", age: 35, service: "RH", salaire: 3200},
    {nom: "Durand", prenom: "Charlie", age: 42, service: "IT", salaire: 4500, manager: true},
    {nom: "Petit", prenom: "Diana", age: 26, service: "Marketing", salaire: 2800},
    {nom: "Robert", prenom: "Eve", age: 31, service: "IT", salaire: 3800, competences: ["Python", "MongoDB"]},
    {nom: "Richard", prenom: "Frank", age: 29, service: "RH", salaire: 3000},
    {nom: "Dubois", prenom: "Grace", age: 45, service: "Direction", salaire: 6500, manager: true},
    {nom: "Martin", prenom: "Henri", age: 24, service: "Marketing", salaire: 2600, stage: true},
    {nom: "Bernard", prenom: "Iris", age: 33, service: "IT", salaire: 4000, competences: ["Java", "Spring", "MongoDB"]},
    {nom: "Thomas", prenom: "Jack", age: 27, service: "Marketing", salaire: 2900}
])

// 1. Requête simple
db.employes.find({service: "IT"})

// 2. Requête avec plusieurs critères (AND implicite)
db.employes.find({
    service: "IT",
    age: {$gte: 30}
})

// 3. Projection (sélection de champs)
db.employes.find(
    {service: "IT"},
    {nom: 1, prenom: 1, salaire: 1, _id: 0}
)

// 4. Tri et limite
db.employes.find()
    .sort({salaire: -1})    // Décroissant
    .limit(3)               // Top 3

// 5. Compter
db.employes.countDocuments({service: "IT"})

// 6. Distinct
db.employes.distinct("service")

// 7. Requête sur champ optionnel
db.employes.find({manager: {$exists: true}})

// 8. Requête sur tableau
db.employes.find({competences: "MongoDB"})



// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 3.4 : Exercices d'interrogation de données (10 min)
// ─────────────────────────────────────────────────────────────────────────

// ────────────── Exercice 1 ──────────────
db.employes.find({service: "Marketing"})


// ────────────── Exercice 2 ──────────────
db.employes.find({age: {$lt: 30}})


// ────────────── Exercice 3 ──────────────
db.employes.find({service: "IT", salaire: {$gt: 3500}})

// ────────────── Exercice 4 ──────────────

db.employes.find({},
    {nom: 1, prenom: 1, salaire: 1, _id: 0}  // Projection
)

// ────────────── Exercice 5 ──────────────
db.employes.find().sort({age: 1})


// ────────────── Exercice 6 ──────────────
db.employes.find().sort({age: -1}).limit(3)


// ────────────── Exercice 7 ──────────────
db.employes.countDocuments({service: "RH"})

// ────────────── Exercice 8 ──────────────
db.employes.distinct("service")


// ────────────── Exercice 9 ──────────────
db.employes.find({manager: true})

// ────────────── Exercice 10 ──────────────
// Votre réponse :

db.employes.find({competences: "MongoDB"})

//Bonnus :

db.employes.find({service: "IT"},{nom: 1, prenom: 1, age: 1, _id: 0}).sort({age: 1}).limit(2)


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 3.5 : Exercices de modification de données (10 min)
// ─────────────────────────────────────────────────────────────────────────

// ────────────── Exercice 11 ──────────────
// Votre réponse :

db.employes.updateOne(
    {nom: "Martin", prenom: "Alice"},{$set: {email: "alice.martin@company.com"}}
)

// ────────────── Exercice 12 ──────────────
// Votre réponse :

db.employes.updateOne(
    {nom: "Petit"},
    {$inc: {salaire: 200}}  // Ajoute 200 au salaire actuel
)

db.employes.findOne({nom: "Petit"}, {nom: 1, prenom: 1, salaire: 1})

// ────────────── Exercice 13 ──────────────
// Votre réponse :

db.employes.updateOne(
    {nom: "Eve", prenom: "Robert"},{$push: {competences: "Docker"}}
)

db.employes.find()

// ────────────── Exercice 14 ──────────────
db.employes.updateOne(
    {nom: "Robert", prenom: "Eve"},{$pull: {competences: "Python"}}
)

// Vérifier
db.employes.findOne({nom: "Robert"}, {nom: 1, competences: 1})




// ────────────── Exercice 15 ──────────────
// Votre réponse :

db.employes.updateMany(
    {service: "IT"},  
    {$set: {budget_formation: 1000}}     
)
db.employes.countDocuments({budget_formation: {$exists: true}})
db.employes.find({service: "IT"})

// ────────────── Exercice 16 ──────────────
// Votre réponse :

db.employes.updateOne(
    {nom: "Nouveau", prenom: "Kevin"},   // Critère de recherche
    {$set: {
        age: 30,
        service: "IT",
        salaire: 3300
    }},
    {upsert: true}  // IMPORTANT : créer si n'existe pas
)

// Vérifier
db.employes.findOne({nom: "Nouveau"})

// ────────────── Exercice 17 ──────────────
// Votre réponse :

db.employes.updateMany(
    {},{$unset: {stage: ""}} 
)
db.employes.find()

// ────────────── Exercice 18 ──────────────
db.employes.updateOne(
    {nom: "Durand", prenom: "Charlie"},
    {
        $inc: {salaire: 500},
        $set: {derniere_promotion: new Date()}
    }
)

db.employes.findOne(
    {nom: "Durand"},
    {nom: 1, prenom: 1, salaire: 1, derniere_promotion: 1}
)

// BONNUS

db.employes.updateMany(
    {service: "IT", salaire: {$lt : 4000}},  
    {$mul: {salaire: 1.1}}     
)

db.employes.find(
    {service: "IT"},
    {nom: 1, service: 1, salaire: 1}
).sort({salaire: 1})

// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 3.6 : Exercices de suppression de données (5 min)
// ─────────────────────────────────────────────────────────────────────────

// ────────────── Exercice 19 ──────────────
// Votre réponse :

db.employes.deleteOne({nom: "Martin", prenom: "Henri"})
db.employes.find({nom: "Martin", prenom: "Henri"})
db.employes.countDocuments({nom: "Martin"})

// ────────────── Exercice 20 ──────────────
// Votre réponse :

db.employes.countDocuments({service: "Marketing"})
db.employes.deleteMany({service: "Marketing"})
db.employes.distinct("service")

//Ici on a undefined car le service existe plus 
// ────────────── Exercice 21 ──────────────

db.employes.deleteMany({salaire: {$lt: 2700}})

// Vérifier le salaire minimum restant
db.employes.find().sort({salaire: 1}).limit(1)


// ────────────── Exercice 22 ──────────────
// Votre réponse :

db.employes.countDocuments({competences: {$exists: false}})


db.employes.find(
    {competences: {$exists: false}},
    {nom: 1, prenom: 1, service: 1}
)

// Supprimer
db.employes.deleteMany({competences: {$exists: false}})

db.employes.find()


// ────────────── Exercice 23 ──────────────
// Votre réponse :

// Méthode 1 : Supprimer tous les documents (la collection reste)
db.employes.deleteMany({})

// Vérifier : la collection existe toujours mais est vide
db.employes.countDocuments()  // 0
// Méthode 2 : Supprimer la collection entière (recommandé)
//db.employes.drop()

// Vérifier : la collection n'existe plus
//show collections  // employes n'apparaît plus

db.employes.updateOne(
    {nom: "Dubois", prenom: "Bob"},
    {
        $set: {
            actif: false,
            date_desactivation: new Date(),
            raison: "Démission"
        }
    }
)

// Requêtes normales : exclure les inactifs
db.employes.find({actif: {$ne: false}})
// Ou plus explicite :
db.employes.find({$or: [{actif: true}, {actif: {$exists: false}}]})

// Voir les employés désactivés (pour audit/historique)
db.employes.find({actif: false})

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 PHASE 4 : CRUD COMPLET SUR CAS CONCRET
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 4.1 : Contexte et modélisation guidée (10 min)
// ─────────────────────────────────────────────────────────────────────────

use("mediatheque_but3")
db.livres.insertMany([
    {
        isbn: "978-2-07-036822-8",
        titre: "Le Petit Prince",
        auteur: {
            nom: "de Saint-Exupéry",
            prenom: "Antoine",
            nationalite: "Française"
        },
        publication: {
            editeur: "Gallimard",
            annee: 1943,
            langue: "Français"
        },
        exemplaires: [
            {
                code: "LPP-001",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon A3"
            },
            {
                code: "LPP-002",
                etat: "Usé",
                disponible: false,
                emprunt_actuel: {
                    membre_id: "M001",
                    date_emprunt: new Date("2024-01-10"),
                    date_retour_prevue: new Date("2024-01-24")
                },
                emplacement: "Emprunté"
            },
            {
                code: "LPP-003",
                etat: "Neuf",
                disponible: true,
                emplacement: "Rayon A3"
            }
        ],
        categories: ["Fiction", "Jeunesse", "Philosophique"],
        mots_cles: ["aviateur", "desert", "rose", "planète"],
        note_moyenne: 4.8,
        nombre_emprunts_total: 127
    },
    {
        isbn: "978-2-253-00334-0",
        titre: "1984",
        auteur: {
            nom: "Orwell",
            prenom: "George",
            nationalite: "Britannique"
        },
        publication: {
            editeur: "Livre de Poche",
            annee: 1949,
            langue: "Français"
        },
        exemplaires: [
            {
                code: "1984-001",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon B5"
            },
            {
                code: "1984-002",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon B5"
            }
        ],
        categories: ["Science-Fiction", "Dystopie", "Politique"],
        mots_cles: ["totalitarisme", "surveillance", "Big Brother"],
        note_moyenne: 4.6,
        nombre_emprunts_total: 89
    },
    {
        isbn: "978-2-07-041999-0",
        titre: "Harry Potter à l'école des sorciers",
        auteur: {
            nom: "Rowling",
            prenom: "J.K.",
            nationalite: "Britannique"
        },
        publication: {
            editeur: "Gallimard Jeunesse",
            annee: 1997,
            langue: "Français"
        },
        exemplaires: [
            {
                code: "HP1-001",
                etat: "Usé",
                disponible: false,
                emprunt_actuel: {
                    membre_id: "M002",
                    date_emprunt: new Date("2024-01-12"),
                    date_retour_prevue: new Date("2024-01-26")
                }
            },
            {
                code: "HP1-002",
                etat: "Bon",
                disponible: false,
                emprunt_actuel: {
                    membre_id: "M003",
                    date_emprunt: new Date("2024-01-08"),
                    date_retour_prevue: new Date("2024-01-22")
                }
            },
            {
                code: "HP1-003",
                etat: "Neuf",
                disponible: true,
                emplacement: "Rayon C1"
            },
            {
                code: "HP1-004",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon C1"
            }
        ],
        serie: {
            nom: "Harry Potter",
            numero: 1,
            total: 7
        },
        categories: ["Fantasy", "Jeunesse", "Magie"],
        mots_cles: ["sorcier", "Poudlard", "magie", "école"],
        note_moyenne: 4.9,
        nombre_emprunts_total: 234
    }
])

db.membres.drop()

// Collection membres
db.membres.insertMany([
    {
        _id: "M001",
        nom: "Dupont",
        prenom: "Marie",
        date_naissance: new Date("1995-03-15"),
        inscription: {
            date: new Date("2023-09-01"),
            type: "Etudiant",
            valide_jusqu: new Date("2024-08-31")
        },
        contact: {
            email: "marie.dupont@etu.univ-amu.fr",
            telephone: "0612345678",
            adresse: "10 rue de la République, 13100 Aix"
        },
        emprunts_en_cours: [
            {
                livre_isbn: "978-2-07-036822-8",
                exemplaire_code: "LPP-002",
                date_emprunt: new Date("2024-01-10"),
                date_retour_prevue: new Date("2024-01-24")
            }
        ],
        historique_emprunts: 23,
        penalites: 0,
        preferences: ["Fiction", "Science-Fiction"]
    },
    {
        _id: "M002",
        nom: "Martin",
        prenom: "Lucas",
        date_naissance: new Date("2001-07-22"),
        inscription: {
            date: new Date("2023-10-15"),
            type: "Etudiant",
            valide_jusqu: new Date("2024-08-31")
        },
        contact: {
            email: "lucas.martin@etu.univ-amu.fr",
            telephone: "0623456789"
        },
        emprunts_en_cours: [
            {
                livre_isbn: "978-2-07-041999-0",
                exemplaire_code: "HP1-001",
                date_emprunt: new Date("2024-01-12"),
                date_retour_prevue: new Date("2024-01-26")
            }
        ],
        historique_emprunts: 45,
        penalites: 0,
        preferences: ["Fantasy", "Jeunesse"]
    }
])

db.livres.find()


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 4.2 : Exercices d'interrogation sur documents imbriqués (15 min)
// ─────────────────────────────────────────────────────────────────────────

// ────────────── Exercice 24 ──────────────
// Votre réponse :

db.livres.find({"auteur.nationalite": "Britannique"})


// ────────────── Exercice 25 ──────────────
// Votre réponse :

db.livres.find({"exemplaires.disponible": true})

// ────────────── Exercice 26 ──────────────
// Votre réponse :

db.livres.find(
    {"exemplaires.disponible": true},
    {titre: 1, "exemplaires.$": 1}
)

// ────────────── Exercice 27 ──────────────
// Votre réponse :

db.livres.find({"exemplaires.emprunt_actuel.membre_id": "M001"})

// ────────────── Exercice 28 ──────────────
// Votre réponse :

db.livres.find({categories: {$in: ["Jeunesse", "Fantasy"]}})

// ────────────── Exercice 29 ──────────────
// Votre réponse :

// Méthode 1 : Récupérer et compter manuellement
let livre = db.livres.findOne({titre: "Harry Potter à l'école des sorciers"})
print(`Nombre d'exemplaires : ${livre.exemplaires.length}`)

// Méthode 2 : Avec agrégation (plus avancé)
db.livres.aggregate([
    {$match: {titre: "Harry Potter à l'école des sorciers"}},
    {$project: {
        titre: 1,
        nombre_exemplaires: {$size: "$exemplaires"}
    }}
])



// ────────────── Exercice 30 ──────────────
// Votre réponse :
let aujourd_hui = new Date()

db.livres.find({
    "exemplaires.emprunt_actuel.date_retour_prevue": {$lt: aujourd_hui}
})

db.livres.find(
    {"exemplaires.emprunt_actuel.date_retour_prevue": {$lt: new Date()}},
    {
        titre: 1,
        "exemplaires.emprunt_actuel": 1
    }
)
// ────────────── Exercice 31 ──────────────
// Votre réponse :

db.livres.find(
    {
        categories: "Fantasy",
        note_moyenne: {$gt: 4.5},
        "publication.annee": {$gt: 1990}
    },
    {
        titre: 1,
        auteur: 1,
        note_moyenne: 1,
        nombre_emprunts_total: 1,
        _id: 0
    }
).sort({nombre_emprunts_total: -1})

// ────────────── Exercice 32 ──────────────
// Votre réponse :


// ────────────── Exercice 33 ──────────────
// Votre réponse :


// ────────────── Exercice 34 ──────────────
// Votre réponse :



// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 4.3 : Exercices de modification sur documents complexes (20 min)
// ─────────────────────────────────────────────────────────────────────────

// ────────────── Exercice 35 ──────────────
// Votre réponse :


// ────────────── Exercice 36 ──────────────
// Votre réponse :


// ────────────── Exercice 37 ──────────────
// Votre réponse :


// ────────────── Exercice 38 ──────────────
// Votre réponse :


// ────────────── Exercice 39 ──────────────
// Votre réponse :


// ────────────── Exercice 40 ──────────────
// Votre réponse :


// ────────────── Exercice 41 ──────────────
// Votre réponse :


// ────────────── Exercice 42 ──────────────
// Votre réponse :


// ────────────── Exercice 43 ──────────────
// Votre réponse :



// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 4.4 : Introduction à l'agrégation avec exercices (15 min)
// ─────────────────────────────────────────────────────────────────────────

// ────────────── Exercice 44 ──────────────
// Votre réponse :


// ────────────── Exercice 45 ──────────────
// Votre réponse :


// ────────────── Exercice 46 ──────────────
// Votre réponse :


// ────────────── Exercice 47 ──────────────
// Votre réponse :


// ────────────── Exercice 48 ──────────────
// Votre réponse :


// ────────────── Exercice 49 ──────────────
// Votre réponse :



// ═══════════════════════════════════════════════════════════════════════════
// 🚀 PHASE 5 : MINI-PROJET GUIDÉ
// ═══════════════════════════════════════════════════════════════════════════

// Cette phase sera réalisée librement selon les instructions du README
// Vous pouvez utiliser l'espace ci-dessous pour vos requêtes du mini-projet

// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 5.1 : Mise en place du projet
// ─────────────────────────────────────────────────────────────────────────

// TODO: Vos requêtes ici


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 5.2 : Interrogation et statistiques
// ─────────────────────────────────────────────────────────────────────────

// TODO: Vos requêtes ici


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 5.3 : Gestion des emprunts et retours
// ─────────────────────────────────────────────────────────────────────────

// TODO: Vos requêtes ici


// ─────────────────────────────────────────────────────────────────────────
// 📍 Section 5.4 : Analyses avancées
// ─────────────────────────────────────────────────────────────────────────

// TODO: Vos requêtes ici



// ═══════════════════════════════════════════════════════════════════════════
// 📝 NOTES ET REMARQUES
// ═══════════════════════════════════════════════════════════════════════════

/*
Utilisez cet espace pour noter vos observations, difficultés rencontrées,
ou questions à poser à l'enseignant :




*/

// ═══════════════════════════════════════════════════════════════════════════
// ✅ CHECKLIST FINALE
// ═══════════════════════════════════════════════════════════════════════════

/*
Avant de rendre votre travail, vérifiez que :

[ ] J'ai rempli mes informations (nom, prénom, groupe) en haut du fichier
[ ] J'ai remplacé le nom de la base de données par tp_mongodb_prenom_nom
[ ] J'ai testé toutes mes requêtes et elles fonctionnent
[ ] J'ai ajouté des commentaires pour expliquer mes requêtes complexes
[ ] J'ai complété tous les exercices obligatoires (1-49)
[ ] J'ai vérifié qu'il n'y a pas d'erreurs de syntaxe
[ ] Mon code est proprement indenté et lisible

📤 Méthode de rendu : Sur le repo github créé en acceptant le devoir.
📅 Date limite : voir date du devoir sur github.
*/
