export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  let target = url.searchParams.get('url');

  if (!target) {
    return new Response('Missing url parameter', { status: 400 });
  }

  target = decodeURIComponent(target);

  try {
    const headers = new Headers({
      'userid': 'oplus-ota|',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept': '*/*',
    });

    const response = await fetch(target, {
      headers,
      redirect: 'manual',
    });

    // 如果是 302/301 等重定向，返回 Location 头里的链接
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        // 如果 Location 是相对路径，转成绝对路径
        const finalUrl = new URL(location, target).toString();
        return new Response(finalUrl, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    // 没有重定向（包括 200、403、404、500 等），返回原始链接
    return new Response(target, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (err) {
    // 异常也返回原始链接 + 错误提示
    return new Response(`Error: ${err.message}\nOriginal URL: ${target}`, {
      status: 502,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
