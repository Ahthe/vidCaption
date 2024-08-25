import { serverDomainUrl } from "./serverDomainUrl";

// Helper functions
const handleResponse = async (response: Response) => {
  if (response.ok) return response.json();

  // Status not ok
  try {
    const data = await response.json();
    return Promise.reject(data || response.status);
  } catch {
    // Could not parse the JSON
    return Promise.reject(response.status);
  }
};

// Custom fetch hook
const customFetch = () => {
  const get = async (url: string) => {
    const requestOptions: RequestInit = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const post = async (url: string, body: any, bodyType: "json" | "form") => {
    if (bodyType === "json") {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      };
      const response = await fetch(serverDomainUrl + url, requestOptions);
      return handleResponse(response);
    } else if (bodyType === "form") {
      const requestOptions: RequestInit = {
        method: "POST",
        credentials: "include",
        body: body as FormData,
      };
      const response = await fetch(serverDomainUrl + url, requestOptions);
      return handleResponse(response);
    }
  };

  const put = async (url: string, body: any) => {
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  // prefixed with underscored because delete is a reserved word in javascript
  const _delete = async (url: string) => {
    const requestOptions: RequestInit = {
      method: "DELETE",
      credentials: "include",
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const _delete_with_req_body = async (url: string, body: any) => {
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const generate_video = async (body: any, bodyType: "form") => {
    const requestOptions: RequestInit = {
      method: "POST",
      credentials: "include",
      body: body as FormData,
    };
    const response = await fetch(serverDomainUrl + "/generate", requestOptions);
    if (response.ok) {
      const generatedVideoBlob = await response.blob();
      return generatedVideoBlob;
    }

    // Status not ok
    return Promise.reject(response.status);
  };

  const retrieve_video = async (url: string) => {
    const requestOptions: RequestInit = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    if (response.ok) {
      const generatedVideoBlob = await response.blob();
      return generatedVideoBlob;
    }

    // Status not ok
    return Promise.reject(response.status);
  };

  const retrieve_image = async (file_path: string) => {
    const requestOptions: RequestInit = {
      method: "POST",
      credentials: "include",
    };
    const response = await fetch(
      serverDomainUrl + `/file/retrieve?file_path=${file_path}`,
      requestOptions
    );
    if (response.ok) {
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      return imageUrl;
    }

    // Status not ok
    return Promise.reject(response.status);
  };

  return {
    get,
    post,
    put,
    _delete,
    _delete_with_req_body,
    generate_video,
    retrieve_video,
    retrieve_image,
  };
};

export default customFetch;
