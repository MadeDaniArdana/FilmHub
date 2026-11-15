import { createClient } from '@/utils/supabase/server';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    'use server';
    const sb = await createClient();
    await sb.auth.signOut();
  };

  return <NavbarClient user={user} signOutAction={handleSignOut} />;
}
