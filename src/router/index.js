import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import Users from "../components/user/Users";
import Rights from "../components/power/Rights";
import Roles from "../components/power/Roles";
import Cate from "../components/goods/Cate";
import Params from "../components/goods/Params";
import GoodsList from "../components/goods/List";
import GoodsAdd from "../components/goods/Add";
import GoodsEdit from "../components/goods/Edit";
import Order from "../components/order/Order";
import Report from "../components/report/Report";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		redirect: '/welcome',
		children: [
			{
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/users',
				component: Users
			},
			{
				path: '/rights',
				component: Rights
			},
			{
				path: '/roles',
				component: Roles
			},
			{
				path: '/categories',
				component: Cate
			},
			{
				path: '/params',
				component: Params
			},
			{
				path: '/goods',
				component: GoodsList
			},
			{
				path: '/goods/add',
				component: GoodsAdd
			},
			{
				path: '/goods/edit/:id',
				component: GoodsEdit
			},
			{
				path: '/orders',
				component: Order
			},
			{
				path: '/reports',
				component: Report
			}
		]
	}
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
	return originalPush.call(this, location).catch(err => err)
}

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
	// to将要访问的路径
	// from代表从哪个路径跳转而来
	// next是一个函数，表示放行
	// next()放行  next('/login')强制跳转
	if (to.path === '/login') return next()
	//获取token
	const tokenStr = window.sessionStorage.getItem('token')
	if (!tokenStr) return next("/login")
	next()
})


export default router
