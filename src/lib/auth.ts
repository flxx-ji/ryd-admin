export async function loginAdmin(email: string, password: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    let message = 'Échec de la connexion';
    try {
      const error = await res.json();
      message = error.message || message;
    } catch {
      message = 'Erreur serveur ou réponse invalide';
    }
    throw new Error(message);
  }

  const data = await res.json();
  return data.token;
}

export function logoutAdmin() {
  localStorage.removeItem('adminToken');
  window.location.href = '/login'; // Redirige proprement
}

export function isAdminLoggedIn(): boolean {
  const token = localStorage.getItem('adminToken');
  return !!token;
}

export function getAdminToken(): string | null {
  return localStorage.getItem('adminToken');
}
