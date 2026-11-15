import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // If "next" param is provided, redirect there after login
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirect to origin + next (safe redirect)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return error page if exchange fails
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
