export async function onRequestGet({ request }) {
  const urlParam = new URL(request.url).searchParams.get('url');
  if (!urlParam) {
    return new Response('Missing url parameter', { status: 400 });
  }

  try {
    const res = await fetch(urlParam, {
      headers: { 'userid': 'oplus-ota|' },
      redirect: 'follow' // 跟随 302 等重定向
    });

    // 只返回最终的重定向后可下载 URL（不返回文件内容，只显示链接）
    return new Response(res.url, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
