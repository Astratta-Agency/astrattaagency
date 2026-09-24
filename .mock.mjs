import http from 'node:http'
http.createServer((req,res)=>{let b='';req.on('data',c=>b+=c);req.on('end',()=>{
  if (req.method==='HEAD'){res.statusCode=200;return res.end()}
  const j=JSON.parse(b);console.error('MOCK got mode',j.mode, j.post_slug??'', j.images?`images=${j.images.length}`:'');res.setHeader('content-type','application/json');res.end(JSON.stringify(j.mode==='status'?{success:true,slugs:['meta-creator-hub-dallas']}:{success:true,recipients:2}))})}).listen(8123)
