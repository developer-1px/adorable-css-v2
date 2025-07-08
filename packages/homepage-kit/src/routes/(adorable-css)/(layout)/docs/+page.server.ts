import { redirect } from '@sveltejs/kit';
import { getFirstDocItem } from '@docs/config';

export async function load() {
  // Get the first documentation item
  const firstDoc = getFirstDocItem();
  
  if (firstDoc?.href && firstDoc.href !== '/docs') {
    // Perform server-side redirect to avoid client-side loops
    throw redirect(302, firstDoc.href);
  }
  
  // Fallback if no valid first doc found
  throw redirect(302, '/');
}