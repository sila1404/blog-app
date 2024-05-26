import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "",
			component: () => import("../views/auth/AuthPage.vue"),
			children: [
				{
					path: "/",
					name: "login",
					component: () => import("../views/auth/LoginPage.vue"),
				},
				{
					path: "/register",
					name: "register",
					component: () => import("../views/auth/RegisterPage.vue"),
				},
			],
		},
		{
		  path: '/admin',
		  name: 'admin',
		  component: () => import('../views/admin/AdminPage.vue'),
			children: [
				{
					path: "/admin",
					name: "dashboard",
					component: () => import("../views/admin/DashboardPage.vue"),
				},
				{
					path: "/create-post",
					name: "create-post",
					component: () => import("../views/admin/CreatePostsPage.vue"),
				},
				{
					path: "/post-lists",
					name: "post-lists",
					component: () => import("../views/admin/PostListsPage.vue"),
				},

			]
		}
	],
});

export default router;
