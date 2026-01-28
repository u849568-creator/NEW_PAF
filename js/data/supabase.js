import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/**
 * IMPORTANT:
 * Remplace avec tes valeurs (ou mieux: fichier non versionné).
 */
const SUPABASE_URL = "https://XXXX.supabase.co";
const SUPABASE_ANON_KEY = "XXXX";

export const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
