// supabaseClient.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/**
 * IMPORTANT:
 * Remplace avec tes valeurs (ou mieux: fichier non versionné).
 */
const SUPABASE_URL = "https://cmwpwpiougayrizofnru.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtd3B3cGlvdWdheXJpem9mbnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODQxMTUsImV4cCI6MjA4MzM2MDExNX0.wik4VvmF8oAasCZ6YZMbcrzaRKKYPMrYkZgb4en4E2A";

export const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
