import Layout from '@/layout'
function getAllPath() {
  let result = [];
  function allPath(route, pre) {
    if (Array.isArray(routes)) {
      routes.forEach(it => {
        if (it.children) {
          allPath(it.children, it.path);
        } else {
          let url = it.path ? (pre ? `${pre}/${it.path}` : `${it.path}`) : `${pre}`
          result.push(url);
        }
      })
    }
  }
  allPath(routes, '');
  return result;
}
const paths = getAllPath();
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/test'
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'upload',
    children: [
      {
        path: 'upload',
	      component: () => import('@/views/test/upload')
      }
    ]
  }
];
export {routes, paths} 
