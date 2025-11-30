const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:4000';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
}

export interface ICar {
  _id?: string;
  make: string;
  model: string;
  year: Date | string;
  user_id: string;
}

export interface ILoginResponse {
  token: string;
  user?: IUser;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  token?: string;
  requiresAuth?: boolean;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, token, requiresAuth = false } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${GATEWAY_URL}${endpoint}`, config);

  if (!response.ok) {
    const responseText = await response.text().catch(() => 'Request failed');
    
    try {
      const errorData = JSON.parse(responseText);
      if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        throw new Error(errorData.errors[0].message);
      }
    } catch (parseError) {
      if (parseError instanceof Error && parseError.message !== responseText) {
        throw parseError;
      }
    }
    
    throw new Error(responseText || `${method} request failed`);
  }

  return response.json();
}

export const authAPI = {
  login: (email: string, password: string): Promise<ILoginResponse> =>
    apiRequest<ILoginResponse>('/users/public/login', {
      method: 'POST',
      body: { email, password },
    }),

  register: (name: string, email: string, password: string): Promise<IUser> =>
    apiRequest<IUser>('/users/public/create', {
      method: 'POST',
      body: { name, email, password },
    }),
};

export const usersAPI = {
  getAll: (): Promise<IUser[]> =>
    apiRequest<IUser[]>('/users/public'),

  getById: (id: string): Promise<IUser> =>
    apiRequest<IUser>(`/users/public/${id}`),

  update: (
    data: { name?: string; email?: string },
    token: string
  ): Promise<IUser> =>
    apiRequest<IUser>('/users/private/update', {
      method: 'PUT',
      body: data,
      token,
      requiresAuth: true,
    }),

  delete: (token: string): Promise<void> =>
    apiRequest<void>('/users/private/delete/', {
      method: 'DELETE',
      token,
      requiresAuth: true,
    }),
};

export const carsAPI = {
  getAll: (token?: string): Promise<ICar[]> =>
    apiRequest<ICar[]>('/cars/public/', {
      token,
      requiresAuth: !!token,
    }),

  getById: (id: string, token?: string): Promise<ICar> =>
    apiRequest<ICar>(`/cars/public/${id}`, {
      token,
      requiresAuth: !!token,
    }),

  create: (data: Omit<ICar, '_id' | 'user_id'>, token: string): Promise<ICar> =>
    apiRequest<ICar>('/cars/private/create', {
      method: 'POST',
      body: data,
      token,
      requiresAuth: true,
    }),

  update: (
    id: string,
    data: { make?: string; model?: string },
    token: string
  ): Promise<ICar> =>
    apiRequest<ICar>(`/cars/private/update/${id}`, {
      method: 'PUT',
      body: data,
      token,
      requiresAuth: true,
    }),

  delete: (id: string, token: string): Promise<void> =>
    apiRequest<void>(`/cars/private/delete/${id}`, {
      method: 'DELETE',
      token,
      requiresAuth: true,
    }),
};

export function decodeToken(token: string): { userId: string; email: string } | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return {
      userId: payload.userId,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
