export interface FetchOptions extends RequestInit {
    retries?: number;
    retryDelay?: number;
    timeout?: number;
  }
  
  export async function fetchRequest(
    url: string,
    options: FetchOptions = {}
  ): Promise<any> {
    const {
      retries = 3,
      retryDelay = 1000,
      timeout = 10000, // 10 seconds
      ...fetchOptions
    } = options;
  
    for (let attempt = 0; attempt < retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
            ...fetchOptions.headers,
          },
        });
  
        clearTimeout(timeoutId);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Handle different response types
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          return await response.json();
        } else if (contentType?.includes('text')) {
          return await response.text();
        } else {
          return await response.arrayBuffer(); // Binary data (for files, images, etc.)
        }
      } catch (error) {
        clearTimeout(timeoutId);
  
        if (attempt === retries - 1) {
          console.error(`Fetch failed after ${retries} attempts:`, (error as Error).message);
          return { error: (error as Error).message || 'Request failed' };
        }
  
        console.warn(`Retrying... (${attempt + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  export const getJson = (url: string, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'GET' });
  
  export const postJson = (url: string, data: any, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
  
  export const putJson = (url: string, data: any, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
  
  export const patchJson = (url: string, data: any, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'PATCH', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
  
  export const deleteRequest = (url: string, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'DELETE' });
  
  export const deleteJson = (url: string, data: any, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'DELETE', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
  
  export const headRequest = (url: string, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'HEAD' });
  
  export const getBuffer = (url: string, options: FetchOptions = {}) => 
    fetchRequest(url, { ...options, method: 'GET' });
  