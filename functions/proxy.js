export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  let encodedTarget = url.searchParams.get('url');

  if (!encodedTarget) {
    return new Response('Missing url parameter', { status: 400 });
  }

  let target;
  try {
    target = atob(encodedTarget);  // Base64 解碼
  } catch (e) {
    return new Response('Invalid Base64', { status: 400 });
  }

  try {
    const headers = new Headers({
      'userid': 'oplus-ota|',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept': '*/*',
    });

    const response = await fetch(target, {
      headers,
      redirect: 'manual',  // 手動處理重定向，以便檢測 302
    });

    // 只有真正收到 3xx 狀態碼時才返回重定向後的連結
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        const finalUrl = new URL(location, target).toString();
        return new Response(finalUrl, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    // 任何非 302 的情況（包括 200、403、500 等），都返回 404
    return new Response('No redirect occurred', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (err) {
    return new Response('Proxy error', { status: 404 });
  }
}