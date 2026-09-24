import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABSE_URL as string,
  process.env.SUPABAE_KEY as string,
);
