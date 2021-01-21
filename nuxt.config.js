module.exports = {
    plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    router: {
        linkActiveClass: "active",
        extendRoutes(routes, resolve) {
            console.log(routes);
            routes.splice(0);
            routes.push(...[
                {
                    path: "/",
                    component: resolve(__dirname, "pages/layout"),
                    name: "layout",
                    children: [
                        {
                            path: "",
                            component: resolve(__dirname, "pages/home"),
                            name: "home"
                        },
                        {
                            path: "/login",
                            component: resolve(__dirname, "pages/login"),
                            name: "login"
                        },
                        {
                            path: "/register",
                            component : resolve(__dirname, "pages/login"),
                            name: "register"
                        },
                        {
                            path: "/profile/:username",
                            component : resolve(__dirname, "pages/profile"),
                            name: "profile"
                        },
                        {
                            path: "/settings",
                            component : resolve(__dirname, "pages/settings"),
                            name: "settings"
                        },
                        {
                            path: "/editor",
                            component : resolve(__dirname, "pages/editor"),
                            name: "editor"
                        },
                        {
                            path: "/article/:slug",
                            component : resolve(__dirname, "pages/article"),
                            name: "article"
                        }
                    ]
                }
            ]);
        }
    }
}