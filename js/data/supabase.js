// supabaseClient.js

const supabaseUrl = "https://cmwpwpiougayrizofnru.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtd3B3cGlvdWdheXJpem9mbnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODQxMTUsImV4cCI6MjA4MzM2MDExNX0.wik4VvmF8oAasCZ6YZMbcrzaRKKYPMrYkZgb4en4E2A";

const db = supabase.createClient(supabaseUrl, supabaseKey);

// Fonction utilitaire pour vérifier si l'utilisateur est connecté
async function checkAuth(redirectTo = "index.html") {
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    window.location.href = redirectTo;
    return null;
  }

  return session.user;
}

// Fonction utilitaire pour se déconnecter
async function logout(redirectTo = "index.html") {
  await db.auth.signOut();
  window.location.href = redirectTo;
}
